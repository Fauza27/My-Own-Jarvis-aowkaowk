lifeos/                          # Root repo (bisa monorepo nanti)
├── apps/
│   └── web/                     # ← FRONTEND KITA (folder ini yang kita buka)
│       ├── src/
│       │   ├── app/                     # Next.js App Router (semua routing di sini)
│       │   │   ├── (auth)/              # Route group - tidak muncul di URL
│       │   │   │   ├── login/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── register/
│       │   │   ├── (dashboard)/         # Semua halaman utama pakai layout sama
│       │   │   │   ├── layout.tsx       # Sidebar + Header + Chat floating
│       │   │   │   ├── page.tsx         # Unified Dashboard (US-9.1)
│       │   │   │   ├── chat/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── finance/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── history/
│       │   │   │   │   ├── summary/
│       │   │   │   │   └── budget/
│       │   │   │   ├── health/
│       │   │   │   ├── running/
│       │   │   │   ├── vehicle/
│       │   │   │   └── study/
│       │   │   ├── api/                 # Server Actions / Route Handlers
│       │   │   │   └── trpc/            # Kalau pakai tRPC nanti
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx           # Root layout (html, body, providers)
│       │   │   └── not-found.tsx
│       │   │
│       │   ├── components/              # Shared components
│       │   │   ├── ui/                  # ← shadcn/ui (jangan diubah manual!)
│       │   │   │   ├── button.tsx
│       │   │   │   ├── card.tsx
│       │   │   │   └── ... (100+ komponen)
│       │   │   ├── layout/              # Navbar, Sidebar, ThemeToggle, Footer
│       │   │   ├── common/              # Toast, LoadingSpinner, ErrorBoundary, Modal
│       │   │   ├── chat/                # ChatWidget, Message, InputBar, StreamingText
│       │   │   ├── dashboard/           # DashboardCard, QuickAction, InsightCard
│       │   │   └── forms/               # FormExpense, FormFoodLog, etc
│       │   │
│       │   ├── features/                # ★ PALING PENTING - Feature Sliced Design
│       │   │   ├── finance/
│       │   │   │   ├── components/      # ExpenseTable, ReceiptScanner, BudgetProgressBar
│       │   │   │   ├── hooks/           # useExpenses, useMonthlySummary, useOCR
│       │   │   │   ├── api/             # financeQueries.ts (TanStack Query)
│       │   │   │   ├── types.ts
│       │   │   │   ├── utils.ts         # formatRupiah, categorizeExpense
│       │   │   │   └── store.ts         # Zustand slice (opsional)
│       │   │   ├── health/
│       │   │   ├── running/
│       │   │   ├── vehicle/
│       │   │   ├── productivity/        # TaskWeave
│       │   │   └── study/
│       │   │
│       │   ├── hooks/                   # Global hooks
│       │   │   ├── useSupabase.ts
│       │   │   ├── useAuth.ts
│       │   │   ├── useChatStream.ts
│       │   │   └── useMediaQuery.ts
│       │   │
│       │   ├── lib/                     # Low-level utilities & config
│       │   │   ├── supabase.ts          # Client & Server client
│       │   │   ├── api.ts               # Fetch wrapper + auth header
│       │   │   ├── utils.ts             # cn(), formatDate, etc
│       │   │   ├── constants.ts
│       │   │   └── validators/          # Zod schemas per feature
│       │   │
│       │   ├── stores/                  # Global state (Zustand recommended)
│       │   │   ├── authStore.ts
│       │   │   ├── uiStore.ts           # sidebarOpen, theme, notifications
│       │   │   └── notificationStore.ts
│       │   │
│       │   ├── types/                   # Global TypeScript types
│       │   │   ├── index.ts
│       │   │   ├── user.ts
│       │   │   ├── expense.ts
│       │   │   ├── health.ts
│       │   │   └── common.ts
│       │   │
│       │   └── utils/                   # Pure JS functions (tidak React)
│       │       ├── currency.ts
│       │       ├── date.ts
│       │       └── validators.ts
│       │
│       ├── public/
│       │   ├── icons/
│       │   ├── images/
│       │   └── favicon.ico
│       │
│       ├── components.json              # shadcn config
│       ├── next.config.mjs
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── package.json
│       └── README.md
│
├── packages/                            # Nanti kalau monorepo (Turborepo)
│   ├── ui/                              # Shared UI package
│   ├── utils/
│   └── types/
│
├── turbo.json                           # Kalau pakai Turborepo
├── package.json
└── README.md