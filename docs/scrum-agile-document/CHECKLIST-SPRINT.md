# ✅ Checklist Sprint LifeOS

> Checklist lengkap untuk memastikan setiap sprint selesai dengan baik.

---

## 📋 Sprint 0: Foundation & Setup

### Pre-Sprint Checklist
- [ ] Baca semua dokumentasi
- [ ] Install prerequisites:
  - [ ] Node.js 20+
  - [ ] Python 3.12+
  - [ ] Docker Desktop
  - [ ] pnpm
  - [ ] Git
  - [ ] VS Code
- [ ] Setup GitHub account
- [ ] Setup Telegram account

### Day 1-2: Project Initialization

#### Task 0.1: Monorepo Setup
- [ ] Install Turborepo
- [ ] Create folder structure
- [ ] Configure turbo.json
- [ ] Setup pnpm workspaces
- [ ] Configure package.json
- [ ] Create .gitignore
- [ ] Initial git commit
- [ ] Test: `pnpm dev` runs without errors

#### Task 0.2: Next.js Frontend Setup
- [ ] Initialize Next.js 15
- [ ] Install dependencies (shadcn/ui, Tailwind, etc)
- [ ] Configure Tailwind
- [ ] Setup folder structure
- [ ] Create basic layout components
- [ ] Setup dark mode
- [ ] Configure environment variables
- [ ] Test: App runs at localhost:3000
- [ ] Test: Dark mode works

#### Task 0.3: FastAPI Backend Setup
- [ ] Create /apps/api folder
- [ ] Setup Python virtual environment
- [ ] Create requirements.txt
- [ ] Install dependencies
- [ ] Setup folder structure
- [ ] Create main.py
- [ ] Create config.py
- [ ] Configure CORS
- [ ] Test: API runs at localhost:8000
- [ ] Test: API docs at localhost:8000/docs


### Day 3-4: Database & Authentication

#### Task 0.4: Database Setup
- [ ] Create docker-compose.yml
- [ ] Start Docker services
- [ ] Create User model
- [ ] Create Expense model
- [ ] Create HealthLog model
- [ ] Create Task model
- [ ] Create Vehicle model
- [ ] Setup database connection
- [ ] Initialize Alembic
- [ ] Configure alembic.ini
- [ ] Create initial migration
- [ ] Run migration
- [ ] Test: PostgreSQL accessible
- [ ] Test: Redis running
- [ ] Test: All tables created

#### Task 0.5: Authentication System
- [ ] Create JWT utility functions
- [ ] Create Pydantic schemas
- [ ] Create auth endpoints (register, login)
- [ ] Create auth dependency
- [ ] Register routes in main.py
- [ ] Test: User can register
- [ ] Test: User can login
- [ ] Test: JWT token received
- [ ] Test: Protected endpoints require JWT
- [ ] Test: Password hashing works

### Day 5-6: Frontend Auth & Shared Packages

#### Task 0.6: Frontend Authentication
- [ ] Create API client with Axios
- [ ] Create auth hook with Zustand
- [ ] Create login page
- [ ] Create register page
- [ ] Create protected route wrapper
- [ ] Test: User can register from frontend
- [ ] Test: User can login from frontend
- [ ] Test: Token stored in localStorage
- [ ] Test: Protected routes redirect

#### Task 0.7: Shared Packages Setup
- [ ] Create /packages/types
- [ ] Define interfaces (User, Expense, etc)
- [ ] Create package.json for types
- [ ] Create /packages/utils
- [ ] Implement formatCurrency()
- [ ] Implement formatDate()
- [ ] Implement parseExpenseAmount()
- [ ] Create package.json for utils
- [ ] Import packages in apps
- [ ] Test: Types importable
- [ ] Test: Utils importable


### Day 7-8: CI/CD & Testing

#### Task 0.8: CI/CD Pipeline
- [ ] Create .github/workflows/ci.yml
- [ ] Configure frontend test job
- [ ] Configure backend test job
- [ ] Create deploy-staging.yml
- [ ] Setup branch protection rules
- [ ] Add status badges to README
- [ ] Test: CI runs on push
- [ ] Test: Tests must pass before merge

#### Task 0.9: Basic Testing Setup
- [ ] Setup Pytest for backend
- [ ] Create conftest.py
- [ ] Write auth tests
- [ ] Setup Vitest for frontend
- [ ] Create vitest.config.ts
- [ ] Write first frontend test
- [ ] Test: Backend tests passing
- [ ] Test: Frontend tests passing

### Day 9-10: Telegram Bot & Dashboard

#### Task 0.10: Telegram Bot Setup
- [ ] Create bot with BotFather
- [ ] Save bot token
- [ ] Create /apps/bot folder
- [ ] Create requirements.txt
- [ ] Install dependencies
- [ ] Create main.py
- [ ] Implement /start command
- [ ] Implement /help command
- [ ] Implement message handler
- [ ] Test: Bot responds to /start
- [ ] Test: Bot responds to /help
- [ ] Test: Bot receives messages

#### Task 0.11: Basic Dashboard UI
- [ ] Create dashboard layout
- [ ] Create Header component
- [ ] Create Sidebar component
- [ ] Create navigation items
- [ ] Create empty dashboard page
- [ ] Setup routing
- [ ] Test: Dashboard renders
- [ ] Test: Navigation works
- [ ] Test: Responsive on mobile

### Day 11-12: Documentation & Polish

#### Task 0.12: Project Documentation
- [ ] Create comprehensive README.md
- [ ] Document features
- [ ] Document tech stack
- [ ] Write installation guide
- [ ] Document environment variables
- [ ] Create CONTRIBUTING.md
- [ ] Create architecture diagram
- [ ] Test: README complete
- [ ] Test: All env vars documented

#### Task 0.13: Sprint 0 Review & Retrospective
- [ ] Test entire setup end-to-end
- [ ] Fix bugs found
- [ ] Document lessons learned
- [ ] Plan Sprint 1 priorities
- [ ] Update project board
- [ ] Conduct Sprint Review meeting
- [ ] Conduct Sprint Retrospective
- [ ] Document action items

### Sprint 0 Final Checklist
- [ ] Monorepo working
- [ ] Frontend renders
- [ ] Backend API responding
- [ ] Database connected
- [ ] Authentication working
- [ ] Telegram bot responding
- [ ] CI/CD pipeline running
- [ ] Documentation complete
- [ ] All tests passing
- [ ] No critical bugs

---


## 📋 Sprint 1: Finance Module MVP

### Pre-Sprint Checklist
- [ ] Sprint 0 completed
- [ ] All Sprint 0 tests passing
- [ ] Environment setup verified
- [ ] Sprint 1 backlog reviewed
- [ ] Sprint 1 goal understood

### Week 1: Backend Expense API

#### Task 1.1: Expense Parser Service
- [ ] Create ExpenseParser class
- [ ] Implement parse_amount() method
- [ ] Implement extract_description() method
- [ ] Implement parse_expense() method
- [ ] Write unit tests
- [ ] Test: Parse "15k" → 15000
- [ ] Test: Parse "1.5jt" → 1500000
- [ ] Test: Parse "Makan siang 25k"
- [ ] Test: All tests passing

#### Task 1.2: Expense CRUD API
- [ ] Create Pydantic schemas
- [ ] Create SQLAlchemy model
- [ ] Create database migration
- [ ] Run migration
- [ ] Create API endpoints (POST, GET)
- [ ] Create parse endpoint
- [ ] Register router in main.py
- [ ] Test: Create expense works
- [ ] Test: List expenses works
- [ ] Test: Parse endpoint works
- [ ] Test: Data saved to database

#### Task 1.3: Telegram Bot Expense Handler
- [ ] Create expense handler
- [ ] Implement message parsing
- [ ] Create category keyboard
- [ ] Implement category callback
- [ ] Register handlers
- [ ] Test: Bot parses "Makan siang 25k"
- [ ] Test: Bot shows category options
- [ ] Test: Expense saved after category selection
- [ ] Test: Bot sends confirmation

### Week 2: Frontend Expense UI

#### Task 1.4: Expense List Component
- [ ] Create useExpenses hook
- [ ] Create useCreateExpense hook
- [ ] Create ExpenseList component
- [ ] Format currency display
- [ ] Format date display
- [ ] Create finance page
- [ ] Add loading state
- [ ] Add empty state
- [ ] Test: List displays expenses
- [ ] Test: Data from API
- [ ] Test: Responsive on mobile

#### Task 1.5: Expense Form Component
- [ ] Create Zod schema
- [ ] Create ExpenseForm component
- [ ] Add form validation
- [ ] Integrate with API
- [ ] Add to finance page
- [ ] Test: Form validation works
- [ ] Test: Can submit expense
- [ ] Test: List auto-refreshes
- [ ] Test: Form resets after submit

#### Task 1.6: Basic Monthly Summary
- [ ] Create summary API endpoint
- [ ] Aggregate by category
- [ ] Calculate totals
- [ ] Create MonthlySummary component
- [ ] Install Recharts
- [ ] Create pie chart
- [ ] Add category breakdown
- [ ] Test: Summary API works
- [ ] Test: Total displays correctly
- [ ] Test: Pie chart renders
- [ ] Test: Breakdown shows categories

### Sprint 1 Final Checklist
- [ ] User can send expense via bot
- [ ] Bot parses amount and description
- [ ] Bot asks for category
- [ ] Expense saved to database
- [ ] Expense visible in web dashboard
- [ ] User can add expense via form
- [ ] Monthly summary displays
- [ ] All tests passing
- [ ] Mobile responsive
- [ ] No critical bugs

---


## 📊 General Sprint Checklist

### Sprint Planning
- [ ] Review product backlog
- [ ] Select user stories for sprint
- [ ] Break down into tasks
- [ ] Estimate story points
- [ ] Define sprint goal
- [ ] Commit to sprint backlog
- [ ] Set Definition of Done

### Daily (if working in team)
- [ ] Daily standup (15 min)
  - [ ] What did I do yesterday?
  - [ ] What will I do today?
  - [ ] Any blockers?
- [ ] Update task status
- [ ] Communicate blockers early

### During Sprint
- [ ] Follow task checklist
- [ ] Write tests for new features
- [ ] Update documentation
- [ ] Commit regularly with clear messages
- [ ] Create PR for review
- [ ] Fix bugs immediately
- [ ] Keep sprint board updated

### Code Quality
- [ ] Code follows style guide
- [ ] No linter errors
- [ ] All tests passing
- [ ] Code reviewed (if team)
- [ ] Documentation updated
- [ ] No console.log/print left
- [ ] Environment variables used correctly

### Before Sprint End
- [ ] All tasks completed or moved
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Demo prepared
- [ ] Retrospective notes ready

### Sprint Review
- [ ] Demo completed features
- [ ] Gather feedback
- [ ] Update product backlog
- [ ] Calculate velocity
- [ ] Document lessons learned

### Sprint Retrospective
- [ ] What went well?
- [ ] What didn't go well?
- [ ] What will we improve?
- [ ] Action items defined
- [ ] Action items assigned

---


## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Backup database (if production)

### Frontend Deployment (Vercel/Netlify)
- [ ] Build succeeds locally
- [ ] Environment variables set
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Test deployment on staging
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Test critical paths

### Backend Deployment (Railway/Render)
- [ ] Build succeeds locally
- [ ] Environment variables set
- [ ] Database connected
- [ ] Run migrations
- [ ] Test API endpoints
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Check logs for errors

### Post-Deployment
- [ ] Smoke test all features
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify database connections
- [ ] Test integrations
- [ ] Update status page
- [ ] Notify stakeholders

---

## 📝 Notes

### How to Use This Checklist

1. **Print or Copy**: Print this checklist or copy to your project management tool

2. **Check Daily**: Review checklist setiap hari

3. **Update Status**: Mark items as complete

4. **Track Blockers**: Note any blockers immediately

5. **Review Weekly**: Review progress setiap minggu

### Customization

Feel free to:
- Add items specific to your project
- Remove items that don't apply
- Adjust based on team size
- Modify based on feedback

### Tips

- Don't skip items to save time
- Quality over speed
- Ask for help when stuck
- Celebrate small wins
- Learn from mistakes

---

**Good luck with your sprints! 🎉**

*Checklist ini akan diupdate seiring berjalannya proyek.*
