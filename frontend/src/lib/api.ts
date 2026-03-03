import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

export const getHome = cache(async () => {
  const res = await fetch(`${BASE_URL}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});