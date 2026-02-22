# 🏃 LifeOS - Sprint Planning & Breakdown

## 📊 Sprint Overview (12 Months = 24 Sprints)

**Sprint Duration:** 2 weeks (14 days)  
**Velocity Target:** 20-30 story points per sprint (solo developer)  
**Working Hours:** ~25 hours/week = 50 hours/sprint

---

# 🎯 SPRINT 0: Foundation & Setup
**Duration:** Week 1-2 (Feb 19 - Mar 4, 2025)  
**Goal:** Setup development environment and core infrastructure  
**Story Points:** 39

## Sprint 0 Backlog

### Day 1-2: Project Initialization

#### Task 0.1: Monorepo Setup
**Story Points:** 5  
**Owner:** You  
**Priority:** P0

**Subtasks:**
- [ ] Initialize Turborepo
  ```bash
  npx create-turbo@latest lifeos --package-manager pnpm
  ```
- [ ] Configure `turbo.json` with pipelines
- [ ] Setup pnpm workspaces
- [ ] Create folder structure:
  ```
  /apps (web, api, bot)
  /packages (types, ui, utils, config)
  /docs
  /scripts
  ```
- [ ] Configure root `package.json` scripts
- [ ] Add `.gitignore` (node_modules, .env, .next, __pycache__)
- [ ] Initial git commit

**Acceptance Criteria:**
- ✅ `pnpm dev` runs without errors
- ✅ All folders created
- ✅ Git initialized with proper .gitignore

**Time Estimate:** 3 hours

---

#### Task 0.2: Next.js Frontend Setup
**Story Points:** 5  
**Priority:** P0

**Subtasks:**
- [ ] Initialize Next.js 15 in `/apps/web`
  ```bash
  cd apps
  npx create-next-app@latest web
  # Choose: TypeScript, App Router, Tailwind, src/ directory
  ```
- [ ] Install dependencies:
  ```bash
  pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
  pnpm add lucide-react
  pnpm add @tanstack/react-query
  pnpm add zustand
  pnpm add axios
  pnpm add react-hook-form zod
  pnpm add recharts
  pnpm add date-fns
  ```
- [ ] Install shadcn/ui:
  ```bash
  npx shadcn-ui@latest init
  npx shadcn-ui@latest add button card input dialog
  ```
- [ ] Configure `tailwind.config.ts` with design tokens
- [ ] Setup folder structure:
  ```
  /src/app
  /src/components
  /src/hooks
  /src/lib
  /src/styles
  ```
- [ ] Create basic layout components:
  - `Header.tsx`
  - `Sidebar.tsx`
  - `Layout.tsx`
- [ ] Setup dark mode with next-themes
- [ ] Configure environment variables (`.env.local`)

**Acceptance Criteria:**
- ✅ Next.js app runs at http://localhost:3000
- ✅ Tailwind working
- ✅ shadcn/ui components render
- ✅ Dark mode toggle works

**Time Estimate:** 4 hours

---

#### Task 0.3: FastAPI Backend Setup
**Story Points:** 8  
**Priority:** P0

**Subtasks:**
- [ ] Create `/apps/api` folder
- [ ] Initialize Python project:
  ```bash
  cd apps/api
  python -m venv venv
  source venv/bin/activate  # or venv\Scripts\activate on Windows
  ```
- [ ] Create `pyproject.toml` (Poetry) or `requirements.txt`:
  ```toml
  [tool.poetry.dependencies]
  python = "^3.12"
  fastapi = "^0.110.0"
  uvicorn = { extras = ["standard"], version = "^0.27.0" }
  sqlalchemy = "^2.0.27"
  alembic = "^1.13.1"
  psycopg2-binary = "^2.9.9"
  pydantic = "^2.6.0"
  pydantic-settings = "^2.1.0"
  python-jose = { extras = ["cryptography"], version = "^3.3.0" }
  passlib = { extras = ["bcrypt"], version = "^1.7.4" }
  python-multipart = "^0.0.9"
  redis = "^5.0.1"
  celery = "^5.3.6"
  openai = "^1.12.0"
  python-telegram-bot = "^21.0"
  pytest = "^8.0.0"
  pytest-asyncio = "^0.23.0"
  ```
- [ ] Install dependencies:
  ```bash
  poetry install  # or pip install -r requirements.txt
  ```
- [ ] Setup folder structure:
  ```
  /src
    /api
    /core
    /models
    /schemas
    /services
    /ai
    /tasks
    /tests
  ```
- [ ] Create `src/main.py`:
  ```python
  from fastapi import FastAPI
  from fastapi.middleware.cors import CORSMiddleware
  
  app = FastAPI(title="LifeOS API", version="1.0.0")
  
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["http://localhost:3000"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  
  @app.get("/")
  def root():
      return {"message": "LifeOS API is running"}
  
  @app.get("/health")
  def health_check():
      return {"status": "healthy"}
  ```
- [ ] Create `src/core/config.py`:
  ```python
  from pydantic_settings import BaseSettings
  
  class Settings(BaseSettings):
      DATABASE_URL: str
      REDIS_URL: str
      JWT_SECRET: str
      OPENAI_API_KEY: str
      
      class Config:
          env_file = ".env"
  
  settings = Settings()
  ```
- [ ] Test run:
  ```bash
  uvicorn src.main:app --reload
  ```

**Acceptance Criteria:**
- ✅ FastAPI runs at http://localhost:8000
- ✅ API docs at http://localhost:8000/docs
- ✅ CORS configured
- ✅ Environment variables loading

**Time Estimate:** 5 hours

---

### Day 3-4: Database & Authentication

#### Task 0.4: Database Setup
**Story Points:** 8  
**Priority:** P0

**Subtasks:**
- [ ] Create `docker-compose.yml`:
  ```yaml
  version: '3.8'
  services:
    postgres:
      image: postgres:16.2
      environment:
        POSTGRES_USER: lifeos
        POSTGRES_PASSWORD: lifeos_dev
        POSTGRES_DB: lifeos_dev
      ports:
        - "5432:5432"
      volumes:
        - postgres_data:/var/lib/postgresql/data
    
    redis:
      image: redis:7.2-alpine
      ports:
        - "6379:6379"
      volumes:
        - redis_data:/data
  
  volumes:
    postgres_data:
    redis_data:
  ```
- [ ] Start Docker services:
  ```bash
  docker-compose up -d
  ```
- [ ] Create database models in `/src/models`:
  ```python
  # src/models/user.py
  from sqlalchemy import Column, String, Boolean, DateTime
  from sqlalchemy.sql import func
  from src.core.database import Base
  
  class User(Base):
      __tablename__ = "users"
      
      id = Column(String, primary_key=True)
      email = Column(String, unique=True, index=True)
      hashed_password = Column(String)
      full_name = Column(String, nullable=True)
      telegram_id = Column(String, unique=True, nullable=True)
      is_active = Column(Boolean, default=True)
      created_at = Column(DateTime(timezone=True), server_default=func.now())
      updated_at = Column(DateTime(timezone=True), onupdate=func.now())
  ```
- [ ] Create more models:
  - `Expense`
  - `HealthLog`
  - `Task`
  - `Vehicle`
- [ ] Setup database connection (`src/core/database.py`):
  ```python
  from sqlalchemy import create_engine
  from sqlalchemy.ext.declarative import declarative_base
  from sqlalchemy.orm import sessionmaker
  from src.core.config import settings
  
  engine = create_engine(settings.DATABASE_URL)
  SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
  Base = declarative_base()
  
  def get_db():
      db = SessionLocal()
      try:
          yield db
      finally:
          db.close()
  ```
- [ ] Initialize Alembic:
  ```bash
  alembic init alembic
  ```
- [ ] Configure `alembic.ini` and `alembic/env.py`
- [ ] Create initial migration:
  ```bash
  alembic revision --autogenerate -m "Initial tables"
  alembic upgrade head
  ```
- [ ] Verify tables created:
  ```bash
  docker exec -it lifeos-postgres psql -U lifeos -d lifeos_dev -c "\dt"
  ```

**Acceptance Criteria:**
- ✅ Postgres running and accessible
- ✅ Redis running
- ✅ All tables created (users, expenses, health_logs, tasks, vehicles)
- ✅ Alembic migrations working

**Time Estimate:** 5 hours

---

#### Task 0.5: Authentication System
**Story Points:** 8  
**Priority:** P0

**Subtasks:**
- [ ] Create JWT utility (`src/core/security.py`):
  ```python
  from datetime import datetime, timedelta
  from jose import JWTError, jwt
  from passlib.context import CryptContext
  from src.core.config import settings
  
  pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
  
  def verify_password(plain_password, hashed_password):
      return pwd_context.verify(plain_password, hashed_password)
  
  def get_password_hash(password):
      return pwd_context.hash(password)
  
  def create_access_token(data: dict, expires_delta: timedelta = None):
      to_encode = data.copy()
      expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
      to_encode.update({"exp": expire})
      return jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")
  
  def decode_token(token: str):
      return jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
  ```
- [ ] Create Pydantic schemas (`src/schemas/user.py`):
  ```python
  from pydantic import BaseModel, EmailStr
  
  class UserCreate(BaseModel):
      email: EmailStr
      password: str
      full_name: str | None = None
  
  class UserLogin(BaseModel):
      email: EmailStr
      password: str
  
  class Token(BaseModel):
      access_token: str
      token_type: str = "bearer"
  
  class UserResponse(BaseModel):
      id: str
      email: str
      full_name: str | None
      
      class Config:
          from_attributes = True
  ```
- [ ] Create auth endpoints (`src/api/v1/auth.py`):
  ```python
  from fastapi import APIRouter, Depends, HTTPException, status
  from sqlalchemy.orm import Session
  from src.core.database import get_db
  from src.core.security import verify_password, get_password_hash, create_access_token
  from src.models.user import User
  from src.schemas.user import UserCreate, UserLogin, Token
  import uuid
  
  router = APIRouter(prefix="/auth", tags=["auth"])
  
  @router.post("/register", response_model=Token)
  def register(user_data: UserCreate, db: Session = Depends(get_db)):
      # Check if user exists
      if db.query(User).filter(User.email == user_data.email).first():
          raise HTTPException(status_code=400, detail="Email already registered")
      
      # Create user
      user = User(
          id=str(uuid.uuid4()),
          email=user_data.email,
          hashed_password=get_password_hash(user_data.password),
          full_name=user_data.full_name
      )
      db.add(user)
      db.commit()
      
      # Generate token
      token = create_access_token({"sub": user.id})
      return {"access_token": token}
  
  @router.post("/login", response_model=Token)
  def login(credentials: UserLogin, db: Session = Depends(get_db)):
      user = db.query(User).filter(User.email == credentials.email).first()
      
      if not user or not verify_password(credentials.password, user.hashed_password):
          raise HTTPException(status_code=401, detail="Invalid credentials")
      
      token = create_access_token({"sub": user.id})
      return {"access_token": token}
  ```
- [ ] Create auth dependency (`src/api/deps.py`):
  ```python
  from fastapi import Depends, HTTPException, status
  from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
  from sqlalchemy.orm import Session
  from src.core.database import get_db
  from src.core.security import decode_token
  from src.models.user import User
  
  security = HTTPBearer()
  
  def get_current_user(
      credentials: HTTPAuthorizationCredentials = Depends(security),
      db: Session = Depends(get_db)
  ) -> User:
      try:
          payload = decode_token(credentials.credentials)
          user_id = payload.get("sub")
          if not user_id:
              raise HTTPException(status_code=401, detail="Invalid token")
          
          user = db.query(User).filter(User.id == user_id).first()
          if not user:
              raise HTTPException(status_code=401, detail="User not found")
          
          return user
      except Exception:
          raise HTTPException(status_code=401, detail="Invalid token")
  ```
- [ ] Register routes in `src/main.py`:
  ```python
  from src.api.v1 import auth
  
  app.include_router(auth.router, prefix="/api/v1")
  ```
- [ ] Test with curl:
  ```bash
  # Register
  curl -X POST http://localhost:8000/api/v1/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test123","full_name":"Test User"}'
  
  # Login
  curl -X POST http://localhost:8000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test123"}'
  ```

**Acceptance Criteria:**
- ✅ User can register
- ✅ User can login and receive JWT
- ✅ Protected endpoints require valid JWT
- ✅ Password hashing working

**Time Estimate:** 5 hours

---

### Day 5-6: Frontend Auth & Shared Packages

#### Task 0.6: Frontend Authentication
**Story Points:** 5  
**Priority:** P0

**Subtasks:**
- [ ] Create API client (`apps/web/src/lib/api-client.ts`):
  ```typescript
  import axios from 'axios';
  
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  export default apiClient;
  ```
- [ ] Create auth hook (`apps/web/src/hooks/useAuth.ts`):
  ```typescript
  import { create } from 'zustand';
  import apiClient from '@/lib/api-client';
  
  interface User {
    id: string;
    email: string;
    full_name: string | null;
  }
  
  interface AuthState {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
  }
  
  export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('access_token'),
    isAuthenticated: !!localStorage.getItem('access_token'),
    
    login: async (email, password) => {
      const response = await apiClient.post('/api/v1/auth/login', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      set({ token: access_token, isAuthenticated: true });
    },
    
    register: async (email, password, fullName) => {
      const response = await apiClient.post('/api/v1/auth/register', {
        email,
        password,
        full_name: fullName,
      });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      set({ token: access_token, isAuthenticated: true });
    },
    
    logout: () => {
      localStorage.removeItem('access_token');
      set({ user: null, token: null, isAuthenticated: false });
    },
  }));
  ```
- [ ] Create login page (`apps/web/src/app/(auth)/login/page.tsx`):
  ```typescript
  'use client';
  
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { useAuth } from '@/hooks/useAuth';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  
  export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await login(email, password);
        router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold">Login to LifeOS</h1>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    );
  }
  ```
- [ ] Create register page (similar to login)
- [ ] Create protected route wrapper (`apps/web/src/components/ProtectedRoute.tsx`)
- [ ] Test auth flow end-to-end

**Acceptance Criteria:**
- ✅ User can register from frontend
- ✅ User can login from frontend
- ✅ Token stored in localStorage
- ✅ Protected routes redirect to login if unauthenticated

**Time Estimate:** 4 hours

---

#### Task 0.7: Shared Packages Setup
**Story Points:** 3  
**Priority:** P1

**Subtasks:**
- [ ] Create `/packages/types`:
  ```typescript
  // packages/types/src/index.ts
  export interface User {
    id: string;
    email: string;
    full_name: string | null;
    telegram_id: string | null;
    created_at: string;
  }
  
  export interface Expense {
    id: string;
    user_id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    created_at: string;
  }
  
  export interface HealthLog {
    id: string;
    user_id: string;
    type: 'food' | 'exercise' | 'weight';
    date: string;
    data: any;
    calories?: number;
  }
  
  // ... more types
  ```
- [ ] Create `packages/types/package.json`:
  ```json
  {
    "name": "@lifeos/types",
    "version": "1.0.0",
    "main": "./src/index.ts",
    "types": "./src/index.ts"
  }
  ```
- [ ] Create `/packages/utils`:
  ```typescript
  // packages/utils/src/currency.ts
  export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // packages/utils/src/date.ts
  export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
    }).format(new Date(date));
  };
  
  // packages/utils/src/parsers.ts
  export const parseExpenseAmount = (text: string): number | null => {
    // "15k" -> 15000
    // "1.5jt" -> 1500000
    const patterns = [
      { regex: /(\d+(?:\.\d+)?)\s*k/i, multiplier: 1000 },
      { regex: /(\d+(?:\.\d+)?)\s*rb/i, multiplier: 1000 },
      { regex: /(\d+(?:\.\d+)?)\s*ribu/i, multiplier: 1000 },
      { regex: /(\d+(?:\.\d+)?)\s*jt/i, multiplier: 1000000 },
      { regex: /(\d+(?:\.\d+)?)\s*juta/i, multiplier: 1000000 },
    ];
    
    for (const { regex, multiplier } of patterns) {
      const match = text.match(regex);
      if (match) {
        return parseFloat(match[1]) * multiplier;
      }
    }
    
    return null;
  };
  ```
- [ ] Import shared packages in apps:
  ```json
  // apps/web/package.json
  {
    "dependencies": {
      "@lifeos/types": "*",
      "@lifeos/utils": "*"
    }
  }
  ```

**Acceptance Criteria:**
- ✅ Types package created and importable
- ✅ Utils package created and importable
- ✅ Apps can import from shared packages

**Time Estimate:** 2 hours

---

### Day 7-8: CI/CD & Testing

#### Task 0.8: CI/CD Pipeline
**Story Points:** 5  
**Priority:** P1

**Subtasks:**
- [ ] Create `.github/workflows/ci.yml`:
  ```yaml
  name: CI
  
  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]
  
  jobs:
    test-frontend:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v2
          with:
            version: 8
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'pnpm'
        - run: pnpm install
        - run: pnpm --filter web lint
        - run: pnpm --filter web build
    
    test-backend:
      runs-on: ubuntu-latest
      services:
        postgres:
          image: postgres:16
          env:
            POSTGRES_PASSWORD: test
          options: >-
            --health-cmd pg_isready
            --health-interval 10s
            --health-timeout 5s
            --health-retries 5
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-python@v5
          with:
            python-version: '3.12'
        - name: Install dependencies
          run: |
            cd apps/api
            pip install -r requirements.txt
        - name: Run tests
          run: |
            cd apps/api
            pytest
          env:
            DATABASE_URL: postgresql://postgres:test@localhost/test
  ```
- [ ] Create `.github/workflows/deploy-staging.yml`:
  ```yaml
  name: Deploy to Staging
  
  on:
    push:
      branches: [develop]
  
  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Deploy to Railway
          run: |
            # Railway CLI deployment commands
            echo "Deploy to staging"
  ```
- [ ] Setup GitHub branch protection rules:
  - Require PR reviews
  - Require status checks to pass
  - No direct push to main
- [ ] Add status badges to README

**Acceptance Criteria:**
- ✅ CI runs on every push/PR
- ✅ Tests must pass before merge
- ✅ Staging deploys on push to develop

**Time Estimate:** 3 hours

---

#### Task 0.9: Basic Testing Setup
**Story Points:** 3  
**Priority:** P1

**Subtasks:**
- [ ] Setup Pytest for backend (`apps/api/tests/conftest.py`):
  ```python
  import pytest
  from sqlalchemy import create_engine
  from sqlalchemy.orm import sessionmaker
  from src.core.database import Base, get_db
  from src.main import app
  from fastapi.testclient import TestClient
  
  SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"
  
  @pytest.fixture
  def db_session():
      engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL)
      Base.metadata.create_all(bind=engine)
      TestingSessionLocal = sessionmaker(bind=engine)
      session = TestingSessionLocal()
      yield session
      session.close()
      Base.metadata.drop_all(bind=engine)
  
  @pytest.fixture
  def client(db_session):
      def override_get_db():
          yield db_session
      app.dependency_overrides[get_db] = override_get_db
      yield TestClient(app)
      app.dependency_overrides.clear()
  ```
- [ ] Write first test (`apps/api/tests/test_auth.py`):
  ```python
  def test_register_user(client):
      response = client.post("/api/v1/auth/register", json={
          "email": "test@example.com",
          "password": "test123",
          "full_name": "Test User"
      })
      assert response.status_code == 200
      assert "access_token" in response.json()
  
  def test_login_user(client):
      # Register first
      client.post("/api/v1/auth/register", json={
          "email": "test@example.com",
          "password": "test123"
      })
      
      # Login
      response = client.post("/api/v1/auth/login", json={
          "email": "test@example.com",
          "password": "test123"
      })
      assert response.status_code == 200
      assert "access_token" in response.json()
  ```
- [ ] Setup Vitest for frontend (`apps/web/vitest.config.ts`):
  ```typescript
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';
  
  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
    },
  });
  ```
- [ ] Write first frontend test
- [ ] Run tests:
  ```bash
  # Backend
  cd apps/api && pytest
  
  # Frontend
  pnpm --filter web test
  ```

**Acceptance Criteria:**
- ✅ Pytest configured and running
- ✅ At least 2 backend tests passing
- ✅ Vitest configured
- ✅ Test coverage reports working

**Time Estimate:** 2 hours

---

### Day 9-10: Telegram Bot & Dashboard

#### Task 0.10: Telegram Bot Setup
**Story Points:** 8  
**Priority:** P0

**Subtasks:**
- [ ] Create bot with BotFather:
  - Open Telegram, search @BotFather
  - `/newbot`
  - Name: LifeOS Bot
  - Username: lifeos_assistant_bot
  - Copy token
- [ ] Initialize bot app (`apps/bot/src/main.py`):
  ```python
  import os
  from telegram import Update
  from telegram.ext import (
      Application,
      CommandHandler,
      MessageHandler,
      filters,
      ContextTypes,
  )
  
  TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
  API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")
  
  async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
      await update.message.reply_text(
          "👋 Welcome to LifeOS!\n\n"
          "I'm your personal AI assistant for:\n"
          "💰 Finance tracking\n"
          "🥗 Health & nutrition\n"
          "🏃 Running coach\n"
          "🚗 Vehicle maintenance\n"
          "✅ Task management\n\n"
          "To link your account, use:\n"
          "/link <your-email>"
      )
  
  async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
      help_text = """
      📖 Available Commands:
      
      /start - Welcome message
      /help - Show this help
      /link <email> - Link Telegram to your account
      
      💰 Finance:
      /expense <amount> <description> - Log expense
      /budget - Check budget status
      
      🥗 Health:
      /food <description> - Log meal
      /weight <kg> - Log weight
      
      Or just chat naturally:
      "Tadi makan nasi goreng 25k"
      "Lari pagi 5km"
      """
      await update.message.reply_text(help_text)
  
  async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
      text = update.message.text
      # TODO: Send to backend for intent classification
      await update.message.reply_text(f"You said: {text}\n(Processing coming soon)")
  
  def main():
      app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
      
      app.add_handler(CommandHandler("start", start))
      app.add_handler(CommandHandler("help", help_command))
      app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
      
      print("Bot is running...")
      app.run_polling()
  
  if __name__ == "__main__":
      main()
  ```
- [ ] Create `apps/bot/requirements.txt`:
  ```
  python-telegram-bot==21.0
  httpx==0.27.0
  python-dotenv==1.0.1
  ```
- [ ] Install and run:
  ```bash
  cd apps/bot
  pip install -r requirements.txt
  python src/main.py
  ```
- [ ] Test bot:
  - Open Telegram
  - Search for your bot
  - Send `/start`
  - Verify response

**Acceptance Criteria:**
- ✅ Bot responds to `/start`
- ✅ Bot responds to `/help`
- ✅ Bot receives messages
- ✅ Bot running in Docker

**Time Estimate:** 4 hours

---

#### Task 0.11: Basic Dashboard UI
**Story Points:** 5  
**Priority:** P0

**Subtasks:**
- [ ] Create dashboard layout (`apps/web/src/app/(dashboard)/layout.tsx`):
  ```typescript
  import { Header } from '@/components/layout/Header';
  import { Sidebar } from '@/components/layout/Sidebar';
  
  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }
  ```
- [ ] Create Sidebar component:
  ```typescript
  'use client';
  
  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import { Home, DollarSign, Heart, Activity, Car, CheckSquare, Settings } from 'lucide-react';
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/finance', label: 'Finance', icon: DollarSign },
    { href: '/dashboard/health', label: 'Health', icon: Heart },
    { href: '/dashboard/running', label: 'Running', icon: Activity },
    { href: '/dashboard/vehicle', label: 'Vehicle', icon: Car },
    { href: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];
  
  export function Sidebar() {
    const pathname = usePathname();
    
    return (
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold">LifeOS</h1>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    );
  }
  ```
- [ ] Create empty dashboard page:
  ```typescript
  export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-sm text-muted-foreground">This Month</h3>
            <p className="text-2xl font-bold">Rp 0</p>
            <p className="text-xs text-green-600">Budget tracking coming soon</p>
          </div>
          {/* More cards */}
        </div>
      </div>
    );
  }
  ```
- [ ] Test navigation between pages

**Acceptance Criteria:**
- ✅ Dashboard layout renders
- ✅ Sidebar navigation works
- ✅ All module pages accessible (empty for now)
- ✅ Responsive on mobile

**Time Estimate:** 3 hours

---

### Day 11-12: Documentation & Polish

#### Task 0.12: Project Documentation
**Story Points:** 3  
**Priority:** P2

**Subtasks:**
- [ ] Create comprehensive README.md:
  ```markdown
  # LifeOS - Your AI-Powered Life Operating System
  
  ## Features
  - 💰 Finance Intelligence
  - 🥗 Health & Nutrition Tracking
  - 🏃 Personal Running Coach
  - 🚗 Vehicle Maintenance Assistant
  - ✅ Smart Task Management
  
  ## Tech Stack
  - Frontend: Next.js 15, React 19, TailwindCSS, shadcn/ui
  - Backend: FastAPI, PostgreSQL, Redis, Celery
  - AI: OpenAI GPT-4, LangChain
  - Bot: Telegram Bot API
  
  ## Getting Started
  
  ### Prerequisites
  - Node.js 20+
  - Python 3.12+
  - Docker & Docker Compose
  - pnpm 8+
  
  ### Installation
  \```bash
  # Clone repo
  git clone https://github.com/yourusername/lifeos.git
  cd lifeos
  
  # Install dependencies
  pnpm install
  
  # Setup environment
  cp .env.example .env
  # Edit .env with your values
  
  # Start services
  docker-compose up -d
  
  # Run migrations
  cd apps/api && alembic upgrade head
  
  # Start development
  pnpm dev
  \```
  
  ## Development
  - Frontend: http://localhost:3000
  - Backend: http://localhost:8000
  - API Docs: http://localhost:8000/docs
  
  ## License
  MIT
  ```
- [ ] Create CONTRIBUTING.md
- [ ] Create docs folder with guides
- [ ] Add inline code comments
- [ ] Document environment variables

**Acceptance Criteria:**
- ✅ README complete with setup instructions
- ✅ All env vars documented
- ✅ Architecture diagram created

**Time Estimate:** 2 hours

---

#### Task 0.13: Sprint 0 Review & Retrospective
**Story Points:** 2  
**Priority:** P0

**Subtasks:**
- [ ] Test entire setup end-to-end
- [ ] Fix any bugs found
- [ ] Document lessons learned
- [ ] Plan Sprint 1 priorities
- [ ] Update project board

**Sprint 0 Review Checklist:**
- ✅ Monorepo working
- ✅ Frontend renders
- ✅ Backend API responding
- ✅ Database connected
- ✅ Authentication working
- ✅ Telegram bot responding
- ✅ CI/CD pipeline running
- ✅ Documentation complete

**Time Estimate:** 2 hours

---

## 📊 Sprint 0 Summary

**Total Story Points:** 39  
**Estimated Hours:** 50 hours  
**Duration:** 2 weeks

### Deliverables:
✅ Monorepo setup with Turborepo  
✅ Next.js frontend with authentication  
✅ FastAPI backend with database  
✅ Telegram bot skeleton  
✅ CI/CD pipeline  
✅ Basic testing  
✅ Comprehensive documentation

### What's NOT in Sprint 0:
❌ Any business logic (expense tracking, health, etc.)  
❌ AI features  
❌ Complex UI components  
❌ Email/bank integrations

---

# 🏃 SPRINT 1: Finance Module MVP (Part 1)
**Duration:** Week 3-4 (Mar 5 - Mar 18, 2025)  
**Goal:** Users can log expenses via chat and see them in dashboard  
**Story Points:** 34

## Sprint 1 Backlog

### Week 1: Backend Expense API

#### US-2.1: Manual Expense Input via Chat
**Story Points:** 8  
**Priority:** P0

**Tasks:**

**Task 1.1: Expense Parser Service**
- [ ] Create `apps/api/src/services/finance/expense_parser.py`:
  ```python
  import re
  from typing import Dict, Optional
  
  class ExpenseParser:
      @staticmethod
      def parse_amount(text: str) -> Optional[float]:
          """Parse Indonesian currency formats"""
          patterns = [
              (r'(\d+(?:[.,]\d+)?)\s*k(?:rb)?', 1000),
              (r'(\d+(?:[.,]\d+)?)\s*ribu', 1000),
              (r'(\d+(?:[.,]\d+)?)\s*jt(?:a)?', 1000000),
              (r'(\d+(?:[.,]\d+)?)\s*juta', 1000000),
              (r'Rp\s*(\d+(?:[.,]\d+)?)', 1),
              (r'(\d{1,3}(?:[.,]\d{3})*)', 1),
          ]
          
          for pattern, multiplier in patterns:
              match = re.search(pattern, text, re.IGNORECASE)
              if match:
                  amount = float(match.group(1).replace(',', '.'))
                  return amount * multiplier
          
          return None
      
      @staticmethod
      def extract_description(text: str, amount: float) -> str:
          """Remove amount from text to get description"""
          # Remove common amount patterns
          cleaned = re.sub(r'\d+(?:[.,]\d+)?\s*(?:k|rb|ribu|jt|juta|Rp)', '', text, flags=re.IGNORECASE)
          cleaned = cleaned.strip()
          return cleaned or "No description"
      
      def parse_expense(self, text: str) -> Dict:
          """Parse full expense from natural language"""
          amount = self.parse_amount(text)
          if not amount:
              return {"error": "Could not parse amount"}
          
          description = self.extract_description(text, amount)
          
          return {
              "amount": amount,
              "description": description,
              "confidence": 0.9 if amount else 0.3
          }
  ```
- [ ] Write tests (`apps/api/tests/test_expense_parser.py`):
  ```python
  def test_parse_amount_k():
      parser = ExpenseParser()
      assert parser.parse_amount("15k") == 15000
      assert parser.parse_amount("1.5k") == 1500
  
  def test_parse_amount_ribu():
      parser = ExpenseParser()
      assert parser.parse_amount("25ribu") == 25000
  
  def test_parse_full_expense():
      parser = ExpenseParser()
      result = parser.parse_expense("Makan siang 25k")
      assert result["amount"] == 25000
      assert "Makan siang" in result["description"]
  ```
- [ ] Run tests: `pytest apps/api/tests/test_expense_parser.py`

**Time:** 3 hours

---

**Task 1.2: Expense CRUD API**
- [ ] Create schemas (`apps/api/src/schemas/expense.py`):
  ```python
  from pydantic import BaseModel
  from datetime import datetime
  
  class ExpenseCreate(BaseModel):
      amount: float
      description: str
      category: str = "Uncategorized"
      date: datetime = None
  
  class ExpenseResponse(BaseModel):
      id: str
      user_id: str
      amount: float
      description: str
      category: str
      date: datetime
      created_at: datetime
      
      class Config:
          from_attributes = True
  ```
- [ ] Create model (`apps/api/src/models/expense.py`):
  ```python
  from sqlalchemy import Column, String, Float, DateTime, ForeignKey
  from sqlalchemy.sql import func
  from src.core.database import Base
  
  class Expense(Base):
      __tablename__ = "expenses"
      
      id = Column(String, primary_key=True)
      user_id = Column(String, ForeignKey("users.id"))
      amount = Column(Float, nullable=False)
      description = Column(String)
      category = Column(String, default="Uncategorized")
      date = Column(DateTime(timezone=True), nullable=False)
      created_at = Column(DateTime(timezone=True), server_default=func.now())
  ```
- [ ] Create migration:
  ```bash
  cd apps/api
  alembic revision --autogenerate -m "Add expenses table"
  alembic upgrade head
  ```
- [ ] Create API endpoints (`apps/api/src/api/v1/finance/expenses.py`):
  ```python
  from fastapi import APIRouter, Depends
  from sqlalchemy.orm import Session
  from src.core.database import get_db
  from src.api.deps import get_current_user
  from src.models.user import User
  from src.models.expense import Expense
  from src.schemas.expense import ExpenseCreate, ExpenseResponse
  from src.services.finance.expense_parser import ExpenseParser
  import uuid
  from datetime import datetime
  
  router = APIRouter(prefix="/expenses", tags=["expenses"])
  
  @router.post("", response_model=ExpenseResponse)
  def create_expense(
      expense_data: ExpenseCreate,
      db: Session = Depends(get_db),
      current_user: User = Depends(get_current_user)
  ):
      expense = Expense(
          id=str(uuid.uuid4()),
          user_id=current_user.id,
          amount=expense_data.amount,
          description=expense_data.description,
          category=expense_data.category,
          date=expense_data.date or datetime.utcnow()
      )
      db.add(expense)
      db.commit()
      db.refresh(expense)
      return expense
  
  @router.get("", response_model=list[ExpenseResponse])
  def list_expenses(
      limit: int = 50,
      db: Session = Depends(get_db),
      current_user: User = Depends(get_current_user)
  ):
      expenses = db.query(Expense).filter(
          Expense.user_id == current_user.id
      ).order_by(Expense.date.desc()).limit(limit).all()
      return expenses
  
  @router.post("/parse")
  def parse_expense_text(text: str):
      parser = ExpenseParser()
      return parser.parse_expense(text)
  ```
- [ ] Register router in `main.py`:
  ```python
  from src.api.v1.finance import expenses
  app.include_router(expenses.router, prefix="/api/v1/finance")
  ```
- [ ] Test with curl:
  ```bash
  curl -X POST http://localhost:8000/api/v1/finance/expenses \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"amount":25000,"description":"Makan siang","category":"Makanan"}'
  ```

**Time:** 4 hours

---

**Task 1.3: Telegram Bot Expense Handler**
- [ ] Create expense handler (`apps/bot/src/handlers/expense.py`):
  ```python
  from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
  from telegram.ext import ContextTypes
  import httpx
  import os
  
  API_URL = os.getenv("API_BASE_URL")
  
  CATEGORIES = [
      "Makanan 🍔",
      "Transport 🚗",
      "Belanja 🛒",
      "Hiburan 🎮",
      "Tagihan 💳",
      "Kesehatan 💊",
      "Lainnya 📦"
  ]
  
  async def handle_expense_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
      text = update.message.text
      user_token = context.user_data.get("token")
      
      if not user_token:
          await update.message.reply_text(
              "Please link your account first using /link <email>"
          )
          return
      
      # Parse expense
      async with httpx.AsyncClient() as client:
          response = await client.post(
              f"{API_URL}/api/v1/finance/expenses/parse",
              params={"text": text}
          )
          parsed = response.json()
      
      if "error" in parsed:
          await update.message.reply_text(
              "Sorry, I couldn't understand that. Try: 'Makan siang 25k'"
          )
          return
      
      # Ask for category confirmation
      keyboard = [
          [InlineKeyboardButton(cat, callback_data=f"cat_{i}")]
          for i, cat in enumerate(CATEGORIES)
      ]
      reply_markup = InlineKeyboardMarkup(keyboard)
      
      context.user_data["pending_expense"] = parsed
      
      await update.message.reply_text(
          f"💰 Expense Detected:\n"
          f"Amount: Rp {parsed['amount']:,.0f}\n"
          f"Description: {parsed['description']}\n\n"
          f"Select category:",
          reply_markup=reply_markup
      )
  
  async def category_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
      query = update.callback_query
      await query.answer()
      
      category_index = int(query.data.split("_")[1])
      category = CATEGORIES[category_index].split()[0]  # Remove emoji
      
      pending = context.user_data.get("pending_expense")
      user_token = context.user_data.get("token")
      
      # Create expense
      async with httpx.AsyncClient() as client:
          response = await client.post(
              f"{API_URL}/api/v1/finance/expenses",
              headers={"Authorization": f"Bearer {user_token}"},
              json={
                  "amount": pending["amount"],
                  "description": pending["description"],
                  "category": category
              }
          )
      
      if response.status_code == 200:
          await query.edit_message_text(
              f"✅ Expense logged!\n"
              f"Rp {pending['amount']:,.0f} - {pending['description']}\n"
              f"Category: {category}"
          )
      else:
          await query.edit_message_text("❌ Failed to log expense. Please try again.")
  ```
- [ ] Register handlers in `main.py`:
  ```python
  from src.handlers.expense import handle_expense_message, category_callback
  from telegram.ext import CallbackQueryHandler
  
  # Add to main()
  app.add_handler(MessageHandler(
      filters.TEXT & ~filters.COMMAND,
      handle_expense_message
  ))
  app.add_handler(CallbackQueryHandler(category_callback, pattern="^cat_"))
  ```
- [ ] Test bot:
  - Send "Makan siang 25k"
  - Select category
  - Verify expense created

**Time:** 4 hours

---

### Week 2: Frontend Expense UI

#### Task 1.4: Expense List Component
**Story Points:** 8

- [ ] Create API hook (`apps/web/src/hooks/useExpenses.ts`):
  ```typescript
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import apiClient from '@/lib/api-client';
  import type { Expense } from '@lifeos/types';
  
  export const useExpenses = () => {
    return useQuery({
      queryKey: ['expenses'],
      queryFn: async () => {
        const { data } = await apiClient.get<Expense[]>('/api/v1/finance/expenses');
        return data;
      },
    });
  };
  
  export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (expense: { amount: number; description: string; category: string }) => {
        const { data } = await apiClient.post('/api/v1/finance/expenses', expense);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['expenses'] });
      },
    });
  };
  ```
- [ ] Create ExpenseList component (`apps/web/src/components/finance/ExpenseList.tsx`):
  ```typescript
  'use client';
  
  import { useExpenses } from '@/hooks/useExpenses';
  import { formatCurrency, formatDate } from '@lifeos/utils';
  import { Card } from '@/components/ui/card';
  
  export function ExpenseList() {
    const { data: expenses, isLoading } = useExpenses();
    
    if (isLoading) return <div>Loading...</div>;
    
    return (
      <div className="space-y-2">
        {expenses?.map((expense) => (
          <Card key={expense.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-muted-foreground">
                  {expense.category} • {formatDate(expense.date)}
                </p>
              </div>
              <p className="text-lg font-bold">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  ```
- [ ] Create finance page (`apps/web/src/app/(dashboard)/finance/page.tsx`):
  ```typescript
  import { ExpenseList } from '@/components/finance/ExpenseList';
  
  export default function FinancePage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Finance</h1>
        <ExpenseList />
      </div>
    );
  }
  ```
- [ ] Test: Create expense via bot, verify it shows in web

**Time:** 4 hours

---

#### Task 1.5: Expense Form Component
**Story Points:** 5

- [ ] Create ExpenseForm component:
  ```typescript
  'use client';
  
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import * as z from 'zod';
  import { useCreateExpense } from '@/hooks/useExpenses';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Select } from '@/components/ui/select';
  
  const expenseSchema = z.object({
    amount: z.number().positive(),
    description: z.string().min(1),
    category: z.string(),
  });
  
  type ExpenseForm = z.infer<typeof expenseSchema>;
  
  export function ExpenseForm() {
    const { register, handleSubmit, reset } = useForm<ExpenseForm>({
      resolver: zodResolver(expenseSchema),
    });
    const createExpense = useCreateExpense();
    
    const onSubmit = (data: ExpenseForm) => {
      createExpense.mutate(data, {
        onSuccess: () => reset(),
      });
    };
    
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          placeholder="Amount (Rp)"
        />
        <Input {...register('description')} placeholder="Description" />
        <Select {...register('category')}>
          <option value="Makanan">Makanan</option>
          <option value="Transport">Transport</option>
          <option value="Belanja">Belanja</option>
        </Select>
        <Button type="submit">Add Expense</Button>
      </form>
    );
  }
  ```
- [ ] Add to finance page
- [ ] Test form submission

**Time:** 3 hours

---

#### Task 1.6: Basic Monthly Summary
**Story Points:** 8

- [ ] Create summary API endpoint:
  ```python
  @router.get("/summary")
  def get_monthly_summary(
      month: int = None,
      year: int = None,
      db: Session = Depends(get_db),
      current_user: User = Depends(get_current_user)
  ):
      from datetime import datetime
      from sqlalchemy import func, extract
      
      if not month or not year:
          now = datetime.now()
          month, year = now.month, now.year
      
      expenses = db.query(
          Expense.category,
          func.sum(Expense.amount).label('total'),
          func.count(Expense.id).label('count')
      ).filter(
          Expense.user_id == current_user.id,
          extract('month', Expense.date) == month,
          extract('year', Expense.date) == year
      ).group_by(Expense.category).all()
      
      total = sum(e.total for e in expenses)
      
      return {
          "total": total,
          "by_category": [
              {"category": e.category, "amount": e.total, "count": e.count}
              for e in expenses
          ],
          "month": month,
          "year": year
      }
  ```
- [ ] Create MonthlySummary component with chart (Recharts)
- [ ] Add to finance page

**Time:** 4 hours

---

## Sprint 1 Definition of Done
- ✅ User can send "Makan siang 25k" to bot
- ✅ Bot parses amount and description
- ✅ Bot asks for category
- ✅ Expense saved to database
- ✅ Expense visible in web dashboard
- ✅ User can manually add expense via web form
- ✅ Monthly summary shows total and categories
- ✅ All tests passing
- ✅ Mobile responsive

**Total Hours:** ~50 hours

---

Mau saya lanjutkan dengan **Sprint 2-24 breakdown** atau mau **drill down** lebih detail ke specific sprints? 🚀