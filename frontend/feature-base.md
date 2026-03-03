my-app/
├── src/
│ ├── app/ # App Router (Next.js 13+)
│ │ ├── (auth)/ # Route group - auth pages
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ └── register/
│ │ │ └── page.tsx
│ │ ├── (dashboard)/ # Route group - dashboard
│ │ │ ├── layout.tsx
│ │ │ ├── dashboard/
│ │ │ │ └── page.tsx
│ │ │ └── settings/
│ │ │ └── page.tsx
│ │ ├── api/ # API Routes
│ │ │ └── users/
│ │ │ └── route.ts
│ │ ├── layout.tsx # Root layout
│ │ ├── page.tsx # Homepage
│ │ └── globals.css
│ │
│ ├── components/ # Komponen UI
│ │ ├── ui/ # Komponen generik/atomic (Button, Input, Modal)
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ └── index.ts
│ │ ├── forms/ # Komponen form
│ │ │ └── LoginForm.tsx
│ │ └── layouts/ # Komponen layout (Navbar, Sidebar, Footer)
│ │ ├── Navbar.tsx
│ │ └── Sidebar.tsx
│ │
│ ├── features/ # ⭐ Feature-based modules (paling penting!)
│ │ ├── auth/
│ │ │ ├── components/ # Komponen khusus auth
│ │ │ ├── hooks/ # Hooks khusus auth
│ │ │ ├── services/ # API calls auth
│ │ │ ├── store/ # State management auth
│ │ │ └── types/ # Types auth
│ │ ├── users/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ └── types/
│ │ └── products/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ ├── hooks/ # Global custom hooks
│ │ ├── useDebounce.ts
│ │ └── useLocalStorage.ts
│ │
│ ├── lib/ # Library/utility setup
│ │ ├── axios.ts # Axios instance
│ │ ├── prisma.ts # Prisma client
│ │ └── auth.ts # Auth config
│ │
│ ├── services/ # Global API services
│ │ └── api.ts
│ │
│ ├── store/ # Global state (Redux/Zustand)
│ │ ├── index.ts
│ │ └── slices/
│ │
│ ├── types/ # Global TypeScript types
│ │ ├── index.ts
│ │ └── api.types.ts
│ │
│ └── utils/ # Helper functions
│ ├── formatDate.ts
│ └── formatCurrency.ts
│
├── public/ # Static assets
│ ├── images/
│ └── icons/
│
├── prisma/ # Database schema (jika pakai Prisma)
│ └── schema.prisma
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
