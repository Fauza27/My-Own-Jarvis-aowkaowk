"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { verifyToken } from "@/features/auth/api/authApi";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const hasHandledCallbackRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasHandledCallbackRef.current) {
        return;
      }
      hasHandledCallbackRef.current = true;

      const runWithTimeout = async <T,>(promise: Promise<T>, ms: number, label: string): Promise<T> => {
        return Promise.race([
          promise,
          new Promise<T>((_, reject) => {
            setTimeout(() => reject(new Error(`${label} timeout`)), ms);
          }),
        ]);
      };

      const getJwtExpiry = (token: string): number | null => {
        try {
          const payloadSegment = token.split(".")[1];
          if (!payloadSegment) {
            return null;
          }

          const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
          const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
          const payload = JSON.parse(window.atob(padded));

          return typeof payload.exp === "number" ? payload.exp : null;
        } catch {
          return null;
        }
      };

      const watchdog = setTimeout(() => {
        setError("Authentication is taking too long. Please try again.");
        setTimeout(() => router.replace("/login"), 2000);
      }, 12000);

      try {
        // Check for errors in URL
        const errorParam = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const hashError = hashParams.get("error");
        const hashErrorDescription = hashParams.get("error_description");

        if (errorParam || hashError) {
          setError(errorDescription || hashErrorDescription || "Authentication failed");
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }

        // Import Supabase client dynamically
        const { supabase } = await import("@/lib/supabase");

        const getSessionFromHash = () => {
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          const expiresAtRaw = hashParams.get("expires_at");
          const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : null;

          if (!accessToken || !refreshToken) {
            return null;
          }

          return {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: Number.isFinite(expiresAt) ? expiresAt : null,
          };
        };

        const verifyAndPersistSession = async (session: { access_token: string; refresh_token: string; expires_at?: number | null }) => {
          const { access_token, refresh_token, expires_at } = session;
          const userData = await runWithTimeout(verifyToken(access_token), 8000, "Token verification");
          const resolvedExpiresAt = typeof expires_at === "number" ? expires_at : getJwtExpiry(access_token);

          if (!resolvedExpiresAt) {
            throw new Error("Session expiration is missing or invalid");
          }

          const user = {
            id: userData.user_id,
            email: userData.email,
            created_at: new Date().toISOString(),
            email_confirmed: true,
          };

          setAuth(access_token, refresh_token, resolvedExpiresAt, user);
          router.replace("/dashboard");
        };

        const hashSession = getSessionFromHash();
        if (hashSession) {
          console.log("Handling implicit flow from URL hash tokens");

          // Clean sensitive fragments first to avoid racing with router navigation
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);

          void supabase.auth
            .setSession({
              access_token: hashSession.access_token,
              refresh_token: hashSession.refresh_token,
            })
            .catch((setSessionError) => {
              console.warn("Failed to sync Supabase session from hash:", setSessionError);
            });

          await verifyAndPersistSession(hashSession);
          return;
        }

        // Check if we have a code parameter (PKCE flow from OAuth)
        const code = searchParams.get("code");

        if (code) {
          // PKCE flow - exchange code for session
          // code_verifier should be in localStorage (created when OAuth was initiated)
          console.log("Handling PKCE flow with code");
          const { data, error: exchangeError } = await runWithTimeout(supabase.auth.exchangeCodeForSession(code), 8000, "Code exchange");

          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            setError(exchangeError.message || "Failed to complete authentication");
            setTimeout(() => router.replace("/login"), 3000);
            return;
          }

          if (!data.session) {
            setError("No session received after code exchange");
            setTimeout(() => router.replace("/login"), 3000);
            return;
          }

          try {
            await verifyAndPersistSession(data.session);
          } catch (verifyError) {
            console.error("Token verification failed:", verifyError);
            setError("Failed to verify authentication with server");
            setTimeout(() => router.replace("/login"), 3000);
          }
        } else {
          // Implicit flow - check for tokens in hash or localStorage
          console.log("Handling implicit flow");
          const {
            data: { session },
            error: sessionError,
          } = await runWithTimeout(supabase.auth.getSession(), 5000, "Session retrieval");

          if (sessionError) {
            console.error("Session error:", sessionError);
            setError(sessionError.message || "Failed to retrieve session");
            setTimeout(() => router.replace("/login"), 3000);
            return;
          }

          if (!session) {
            setError("No session found. Please try logging in again.");
            setTimeout(() => router.replace("/login"), 3000);
            return;
          }

          try {
            await verifyAndPersistSession(session);
          } catch (verifyError) {
            console.error("Token verification failed:", verifyError);
            setError("Failed to verify authentication with server");
            setTimeout(() => router.replace("/login"), 3000);
          }
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        setTimeout(() => router.replace("/login"), 3000);
      } finally {
        clearTimeout(watchdog);
      }
    };

    handleCallback();
  }, [router, setAuth, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <Image src="/Login-Head.png" alt="My Jarvis Gua Logo" width={64} height={64} className="rounded-xl" />
        </div>

        {error ? (
          <>
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Failed</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm text-muted-foreground">Redirecting to login...</p>
          </>
        ) : (
          <>
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Completing Sign In</h1>
            <p className="text-muted-foreground">Please wait while we set up your account...</p>
          </>
        )}
      </div>
    </div>
  );
}
