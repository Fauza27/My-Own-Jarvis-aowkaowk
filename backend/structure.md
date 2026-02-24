lifeos-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app entry point, middleware, router registration
│   ├── config.py                  # Settings (env vars, Pydantic BaseSettings)
│   ├── database.py                # DB connection, session factory
│   │
│   ├── api/                       # Semua HTTP endpoints
│   │   ├── __init__.py
│   │   ├── deps.py                # Shared dependencies (get_current_user, get_db, dll)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py          # Include semua sub-router di sini
│   │       ├── auth.py            # POST /auth/register, /auth/login, /auth/refresh
│   │       ├── users.py           # GET/PUT /users/me, /users/profile
│   │       ├── finance.py         # CRUD /expenses, /budgets, /recurring
│   │       ├── health.py          # CRUD /food-logs, /exercise-logs, /weight-logs
│   │       ├── fitness.py         # CRUD /runs, /training-plans
│   │       ├── vehicles.py        # CRUD /vehicles, /maintenance-logs
│   │       ├── tasks.py           # CRUD /tasks, /priorities
│   │       ├── notifications.py   # GET /notifications, PUT /notifications/read
│   │       └── ai.py              # POST /ai/chat, /ai/insights, /ai/parse
│   │
│   ├── services/                  # Business logic layer
│   │   ├── __init__.py
│   │   ├── auth_service.py        # JWT encode/decode, password hash, token refresh
│   │   ├── finance_service.py     # Kalkulasi budget, summary, predictions
│   │   ├── health_service.py      # BMI, BMR, TDEE, kalori defisit
│   │   ├── fitness_service.py     # Training plan gen, fatigue score, pace calc
│   │   ├── vehicle_service.py     # Jadwal maintenance, km tracking
│   │   ├── notification_service.py# Trigger notif, quiet hours check
│   │   └── insight_service.py     # Cross-module correlation & insight generation
│   │
│   ├── ai/                        # Semua yang berhubungan dengan AI/LLM
│   │   ├── __init__.py
│   │   ├── client.py              # OpenAI client setup & wrapper
│   │   ├── prompts/               # Prompt templates (pisah dari logic)
│   │   │   ├── expense_parser.py
│   │   │   ├── food_estimator.py
│   │   │   ├── categorizer.py
│   │   │   ├── health_advisor.py
│   │   │   ├── running_coach.py
│   │   │   ├── mechanic.py
│   │   │   └── insights.py
│   │   ├── parsers/               # Parsing & extraction logic
│   │   │   ├── expense_parser.py  # Parse "beli nasi goreng 15k"
│   │   │   ├── food_parser.py     # Parse makanan + estimasi kalori
│   │   │   ├── receipt_ocr.py     # GPT-4 Vision untuk foto bon
│   │   │   ├── email_parser.py    # Parse email notif transaksi
│   │   │   └── image_food_parser.py # GPT-4 Vision untuk foto makanan
│   │   ├── agents/                # Agent-based logic per domain
│   │   │   ├── finance_agent.py
│   │   │   ├── health_agent.py
│   │   │   ├── running_agent.py
│   │   │   ├── vehicle_agent.py
│   │   │   └── orchestrator.py    # Intent classifier → route ke agent yang tepat
│   │   └── rag/
│   │       ├── embedder.py        # Text → vector embedding
│   │       ├── retriever.py       # Semantic search via pgvector
│   │       └── memory.py          # Long-term user memory management
│   │
│   ├── models/                    # SQLAlchemy ORM models (DB tables)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── expense.py
│   │   ├── budget.py
│   │   ├── food_log.py
│   │   ├── exercise_log.py
│   │   ├── weight_log.py
│   │   ├── run_log.py
│   │   ├── training_plan.py
│   │   ├── vehicle.py
│   │   ├── maintenance_log.py
│   │   ├── task.py
│   │   ├── notification.py
│   │   └── memory.py              # RAG memory vector store table
│   │
│   ├── schemas/                   # Pydantic schemas (request/response validation)
│   │   ├── __init__.py
│   │   ├── auth.py                # LoginRequest, TokenResponse, RegisterRequest
│   │   ├── user.py                # UserProfile, UserUpdate
│   │   ├── expense.py             # ExpenseCreate, ExpenseResponse, ExpenseFilter
│   │   ├── budget.py
│   │   ├── food_log.py
│   │   ├── exercise_log.py
│   │   ├── weight_log.py
│   │   ├── run_log.py
│   │   ├── vehicle.py
│   │   ├── maintenance_log.py
│   │   ├── task.py
│   │   └── ai.py                  # ChatRequest, ChatResponse, ParsedExpense
│   │
│   ├── workers/                   # Background jobs (Celery tasks)
│   │   ├── __init__.py
│   │   ├── celery_app.py          # Celery instance & config
│   │   ├── finance_jobs.py        # Monthly insight generation, budget alert check
│   │   ├── health_jobs.py         # Weekly health report, weight trend alert
│   │   ├── vehicle_jobs.py        # Maintenance due check
│   │   ├── notification_jobs.py   # Send daily briefing, reminder dispatch
│   │   └── email_jobs.py          # Process forwarded payment emails
│   │
│   └── core/                      # Utilities & cross-cutting concerns
│       ├── __init__.py
│       ├── security.py            # Password hashing, JWT utils
│       ├── exceptions.py          # Custom exception classes & handlers
│       ├── pagination.py          # Reusable pagination helper
│       ├── storage.py             # Supabase Storage upload/delete wrapper
│       └── constants.py           # Enum: Category, MealType, ExerciseType, dll
│
├── bot/                           # Telegram Bot (terpisah dari API)
│   ├── __init__.py
│   ├── main.py                    # Bot entry point & polling/webhook setup
│   ├── handlers/
│   │   ├── __init__.py
│   │   ├── start.py               # /start, /help commands
│   │   ├── expense.py             # /expense handler + free text expense
│   │   ├── food.py                # /food + foto makanan handler
│   │   ├── run.py                 # /run handler
│   │   ├── vehicle.py             # /vehicle, /service handler
│   │   ├── task.py                # /task handler
│   │   └── chat.py                # General chat → route ke orchestrator
│   ├── middleware/
│   │   ├── auth_middleware.py     # Verifikasi user Telegram sudah linked
│   │   └── rate_limiter.py        # Rate limit per user
│   ├── keyboards/
│   │   ├── expense_kb.py          # Inline keyboard konfirmasi kategori
│   │   ├── food_kb.py
│   │   └── common_kb.py           # Tombol umum (confirm, cancel, edit)
│   └── utils/
│       ├── formatter.py           # Format pesan Telegram (markdown, emoji)
│       └── state_manager.py       # Conversation state (Redis)
│
├── migrations/                    # Alembic database migrations
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
│       ├── 001_create_users.py
│       ├── 002_create_expenses.py
│       └── ...
│
├── tests/
│   ├── conftest.py                # Pytest fixtures (test DB, mock user, dll)
│   ├── unit/
│   │   ├── test_expense_parser.py
│   │   ├── test_food_parser.py
│   │   ├── test_finance_service.py
│   │   ├── test_health_service.py
│   │   └── test_fitness_service.py
│   ├── integration/
│   │   ├── test_auth_api.py
│   │   ├── test_expense_api.py
│   │   ├── test_food_api.py
│   │   └── test_vehicle_api.py
│   └── fixtures/
│       └── sample_data.py         # Data dummy untuk testing
│
├── scripts/
│   ├── seed_db.py                 # Populate DB dengan data development
│   └── create_admin.py            # Buat user admin pertama
│
├── .env                           # Environment variables (jangan di-commit!)
├── .env.example                   # Template .env untuk onboarding
├── .gitignore
├── alembic.ini                    # Konfigurasi Alembic
├── pyproject.toml                 # Dependencies (Poetry) + tool config
├── Dockerfile
├── docker-compose.yml             # Local dev: app + postgres + redis
└── README.md