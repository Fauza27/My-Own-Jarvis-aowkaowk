# 📚 US-1.3: Unified Data Storage Architecture - Penjelasan Lengkap

**Untuk:** Pemula yang baru belajar database design  
**Tujuan:** Memahami konsep database schema, relationships, dan implementasi di Sprint 1

---

## 🤔 Apa itu US-1.3?

**User Story:**
> As a system  
> I want unified database schema across all modules  
> So that data can be shared and cross-referenced efficiently

**Dalam bahasa sederhana:**
Kamu perlu membuat "blueprint" database yang bisa dipakai oleh SEMUA modul (Finance, Health, Running, Vehicle, dll) dengan cara yang terorganisir dan efisien.

---

## 🎯 Mengapa Ini Penting?

### Analogi: Rumah vs Apartemen

**Tanpa Unified Schema (Buruk):**
```
Finance Module → Database Finance (terpisah)
Health Module  → Database Health (terpisah)
Running Module → Database Running (terpisah)
```
- ❌ Data user duplikat di 3 tempat
- ❌ Susah korelasi data (misal: spending naik → weight naik?)
- ❌ Maintenance nightmare (update user di 3 tempat)

**Dengan Unified Schema (Baik):**
```
All Modules → Single Database (shared)
├── users (1 tabel untuk semua)
├── expenses (finance)
├── food_logs (health)
└── workouts (running)
```
- ✅ Data user cuma 1 copy
- ✅ Mudah korelasi data (JOIN query)
- ✅ Update sekali, semua modul update

---

## 📖 Konsep yang Harus Dipahami

### 1. Database Schema
**Apa itu?**
Blueprint/desain struktur database kamu. Seperti denah rumah sebelum dibangun.

**Isi Schema:**
- Tabel apa saja yang ada
- Kolom apa di setiap tabel
- Tipe data setiap kolom
- Relasi antar tabel

**Baca:**
- 📖 https://www.postgresql.org/docs/current/ddl-schemas.html
- 📖 https://www.guru99.com/database-design.html


### 2. Tables (Tabel)
**Apa itu?**
Seperti spreadsheet Excel. Setiap tabel menyimpan 1 jenis data.

**Contoh:**
```
Tabel: users
+------+------------------+----------+
| id   | email            | name     |
+------+------------------+----------+
| 1    | fauza@email.com  | Fauza    |
| 2    | john@email.com   | John     |
+------+------------------+----------+

Tabel: expenses
+------+---------+--------+-------------+
| id   | user_id | amount | description |
+------+---------+--------+-------------+
| 1    | 1       | 15000  | Nasi Goreng |
| 2    | 1       | 50000  | Bensin      |
| 3    | 2       | 20000  | Kopi        |
+------+---------+--------+-------------+
```

**Baca:**
- 📖 https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/

---

### 3. Columns (Kolom) & Data Types
**Apa itu?**
Kolom = field di tabel. Setiap kolom punya tipe data.

**Tipe Data Umum:**
- `UUID` - ID unik (contoh: 550e8400-e29b-41d4-a716-446655440000)
- `String/VARCHAR` - Text (contoh: "Nasi Goreng")
- `Integer` - Angka bulat (contoh: 15000)
- `Decimal/Numeric` - Angka desimal (contoh: 15.50)
- `DateTime` - Tanggal & waktu (contoh: 2025-02-19 10:30:00)
- `Boolean` - True/False

**Baca:**
- 📖 https://www.postgresql.org/docs/current/datatype.html

---

### 4. Primary Key (PK)
**Apa itu?**
ID unik untuk setiap row di tabel. Seperti KTP untuk setiap orang.

**Contoh:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,  -- Ini Primary Key
    email VARCHAR(255),
    name VARCHAR(100)
);
```

**Kenapa pakai UUID bukan Integer?**
- UUID = globally unique (aman untuk distributed systems)
- Integer = sequential (bisa ditebak, security risk)

**Baca:**
- 📖 https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-primary-key/
- 📖 https://www.postgresql.org/docs/current/datatype-uuid.html

---

### 5. Foreign Key (FK)
**Apa itu?**
Kolom yang "nunjuk" ke Primary Key di tabel lain. Untuk bikin relasi.

**Contoh:**
```sql
CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    user_id UUID,  -- Ini Foreign Key
    amount DECIMAL(10, 2),
    description VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Artinya:**
- Setiap expense HARUS punya user_id
- user_id HARUS ada di tabel users
- Jika user dihapus, expenses-nya juga dihapus (CASCADE)

**Baca:**
- 📖 https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-foreign-key/

---

### 6. Relationships (Relasi)
**Apa itu?**
Hubungan antar tabel.

**Jenis Relasi:**

#### a) One-to-One (1:1)
Satu user punya satu profile.
```
users (1) ←→ (1) user_profiles
```

#### b) One-to-Many (1:N)
Satu user punya banyak expenses.
```
users (1) ←→ (N) expenses
```

#### c) Many-to-Many (N:M)
Banyak users bisa punya banyak tags (butuh junction table).
```
users (N) ←→ user_tags ←→ (M) tags
```

**Baca:**
- 📖 https://www.guru99.com/database-relationships.html
- 📖 https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/

---

### 7. Indexes
**Apa itu?**
Seperti index di buku. Bikin query lebih cepat.

**Contoh:**
```sql
-- Tanpa index: Scan 1 juta rows (lambat)
SELECT * FROM expenses WHERE user_id = '123';

-- Dengan index: Langsung ke row yang tepat (cepat)
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
```

**Kapan pakai index?**
- Kolom yang sering di-query (WHERE, JOIN)
- Foreign keys
- Kolom untuk sorting (ORDER BY)

**Baca:**
- 📖 https://www.postgresqltutorial.com/postgresql-indexes/

---

### 8. Migrations
**Apa itu?**
Cara "version control" untuk database schema. Seperti Git tapi untuk database.

**Kenapa penting?**
- Track perubahan schema
- Rollback jika ada masalah
- Sync schema antar developer

**Tools:**
- **Alembic** (Python/SQLAlchemy) ← Kamu pakai ini
- Prisma Migrate (Node.js)
- Django Migrations

**Baca:**
- 📖 https://alembic.sqlalchemy.org/en/latest/tutorial.html

---

## 🏗️ Database Schema LifeOS

### Tabel yang Harus Dibuat (Sprint 1):

```
Core Tables:
1. users              - User accounts
2. user_profiles      - User preferences

Finance Module:
3. expenses           - Transaction records
4. budgets            - Budget limits

Health Module:
5. food_logs          - Meal tracking
6. weight_logs        - Weight history

Running Module:
7. workouts           - Exercise logs
8. training_plans     - Running plans

Vehicle Module:
9. vehicles           - Vehicle registration
10. maintenance_logs  - Service history

Productivity Module:
11. tasks             - Task management

AI Module:
12. conversations     - Chat sessions
13. messages          - Chat messages
14. embeddings        - Vector data (RAG)

System:
15. notifications     - User notifications
```

---

## 📐 Contoh Schema Design

### Tabel: users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    telegram_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
```

**Penjelasan:**
- `id` = Primary Key (UUID)
- `email` = UNIQUE (tidak boleh duplikat)
- `password_hash` = Password yang sudah di-hash (NEVER store plaintext!)
- `telegram_id` = Link ke Telegram account (nullable)
- `created_at` / `updated_at` = Audit trail

---

### Tabel: expenses
```sql
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    receipt_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Foreign Key
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes untuk query cepat
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(date DESC);
CREATE INDEX idx_expenses_user_date ON expenses(user_id, date DESC);
```

**Penjelasan:**
- `user_id` = Foreign Key ke users
- `amount` = DECIMAL(10, 2) = max 99,999,999.99
- `ON DELETE CASCADE` = Jika user dihapus, expenses-nya juga dihapus
- Index `(user_id, date)` = Composite index untuk query "expenses user X di bulan Y"

---

### Relasi: users ←→ expenses

```
users (1) ←→ (N) expenses

Artinya:
- 1 user bisa punya banyak expenses
- 1 expense hanya punya 1 user
```

**Query Contoh:**
```sql
-- Get all expenses untuk user tertentu
SELECT * FROM expenses 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY date DESC;

-- Get user dengan expenses-nya (JOIN)
SELECT u.name, e.amount, e.description, e.date
FROM users u
JOIN expenses e ON u.id = e.user_id
WHERE u.email = 'fauza@email.com'
ORDER BY e.date DESC;
```

---

## 🛠️ Implementasi dengan SQLAlchemy

### 1. Setup Database Connection

**File:** `apps/api/app/core/database.py`
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**Baca:**
- 📖 https://docs.sqlalchemy.org/en/20/core/engines.html

---

### 2. Create Models

**File:** `apps/api/app/models/user.py`
```python
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100))
    telegram_id = Column(String(50), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships (1:N)
    expenses = relationship("Expense", back_populates="user", cascade="all, delete-orphan")
```

**Baca:**
- 📖 https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html

---

**File:** `apps/api/app/models/expense.py`
```python
from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.core.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    description = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)
    date = Column(DateTime, nullable=False)
    receipt_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship (N:1)
    user = relationship("User", back_populates="expenses")
```

---

### 3. Create Migrations (Alembic)

**Install Alembic:**
```bash
pip install alembic
alembic init alembic
```

**Configure:** `alembic.ini`
```ini
sqlalchemy.url = postgresql://user:password@localhost/lifeos_dev
```

**Create Migration:**
```bash
alembic revision --autogenerate -m "Create users and expenses tables"
alembic upgrade head
```

**Baca:**
- 📖 https://alembic.sqlalchemy.org/en/latest/tutorial.html

---

## 🎯 Tasks di Sprint 1 (US-1.3)

### T-16: Install PostgreSQL
**Apa yang dilakukan:**
- Install PostgreSQL di local machine
- Create database `lifeos_dev`
- Test koneksi

**Baca:**
- 📖 https://www.postgresql.org/download/
- 📖 https://www.postgresqltutorial.com/postgresql-getting-started/

---

### T-17: Install SQLAlchemy
**Apa yang dilakukan:**
```bash
cd apps/api
pip install sqlalchemy psycopg2-binary alembic
```

**Baca:**
- 📖 https://docs.sqlalchemy.org/en/20/intro.html

---

### T-18: Design Complete Database Schema
**Apa yang dilakukan:**
- Buat diagram ERD (Entity Relationship Diagram)
- List semua tabel yang dibutuhkan (15 tabel)
- Define kolom untuk setiap tabel
- Define relasi antar tabel

**Tools:**
- dbdiagram.io (online, gratis)
- draw.io
- Pen & paper (old school tapi efektif!)

**Baca:**
- 📖 https://www.guru99.com/er-diagram-tutorial-dbms.html

---

### T-19: Create SQLAlchemy Models
**Apa yang dilakukan:**
- Buat file model untuk setiap tabel
- Define columns, types, relationships
- Test import models

**Struktur:**
```
apps/api/app/models/
├── __init__.py
├── user.py
├── expense.py
├── food_log.py
├── weight_log.py
├── workout.py
├── vehicle.py
├── task.py
└── ... (15 files total)
```

---

### T-20: Add Indexes
**Apa yang dilakukan:**
- Identify kolom yang sering di-query
- Add indexes di migration file
- Test query performance

**Contoh:**
```python
# In Alembic migration file
def upgrade():
    op.create_index('idx_expenses_user_date', 'expenses', ['user_id', 'date'])
```

---

### T-21-22: Create & Run Migrations
**Apa yang dilakukan:**
```bash
# Create migration
alembic revision --autogenerate -m "Initial schema"

# Review migration file (IMPORTANT!)
# Check: alembic/versions/xxxxx_initial_schema.py

# Run migration
alembic upgrade head

# Verify tables created
psql -d lifeos_dev -c "\dt"
```

---

### T-23-24: Create & Run Seed Data
**Apa yang dilakukan:**
- Buat script untuk populate database dengan test data
- Run script
- Verify data di database

**File:** `apps/api/app/scripts/seed.py`

**Run:**
```bash
python -m app.scripts.seed
```

---

### T-25: Test Database Queries
**Apa yang dilakukan:**
- Test CRUD operations (Create, Read, Update, Delete)
- Test JOIN queries
- Test performance

**Contoh Test:**
```python
# Test create user
user = User(email="test@example.com", name="Test User")
db.add(user)
db.commit()

# Test create expense
expense = Expense(
    user_id=user.id,
    amount=15000,
    description="Nasi Goreng",
    category="Food",
    date=datetime.now()
)
db.add(expense)
db.commit()

# Test query
expenses = db.query(Expense).filter(Expense.user_id == user.id).all()
print(f"Found {len(expenses)} expenses")
```

---

## 💡 Tips untuk Pemula

### 1. Mulai dari Tabel Sederhana
Jangan langsung bikin 15 tabel. Mulai dari:
1. users
2. expenses

Setelah paham, baru tambah tabel lain.

### 2. Gunakan GUI Tool
Install **pgAdmin** atau **DBeaver** untuk visualisasi database.
- Bisa lihat tabel, kolom, data
- Bisa run query dengan UI
- Lebih mudah untuk belajar

**Download:**
- pgAdmin: https://www.pgadmin.org/download/
- DBeaver: https://dbeaver.io/download/

### 3. Practice SQL Queries
Sebelum pakai SQLAlchemy, pahami dulu SQL dasar:
```sql
-- Create
INSERT INTO users (email, name) VALUES ('test@example.com', 'Test');

-- Read
SELECT * FROM users WHERE email = 'test@example.com';

-- Update
UPDATE users SET name = 'New Name' WHERE id = '123';

-- Delete
DELETE FROM users WHERE id = '123';
```

**Practice:**
- https://www.w3schools.com/sql/
- https://sqlzoo.net/

### 4. Understand Relationships
Gambar diagram di kertas:
```
users (1) ←→ (N) expenses
users (1) ←→ (N) food_logs
users (1) ←→ (N) workouts
```

Ini akan bantu kamu paham Foreign Keys.

### 5. Read Error Messages
PostgreSQL error messages sangat informatif:
```
ERROR: duplicate key value violates unique constraint "users_email_key"
```
Artinya: Email sudah ada di database (UNIQUE constraint)

### 6. Backup Database
Sebelum experiment, backup dulu:
```bash
pg_dump lifeos_dev > backup.sql

# Restore jika rusak
psql lifeos_dev < backup.sql
```

---

## 🚨 Common Mistakes (Hindari Ini!)

### 1. Lupa Foreign Key Constraints
```python
# ❌ SALAH (no constraint)
user_id = Column(UUID)

# ✅ BENAR (with constraint)
user_id = Column(UUID, ForeignKey("users.id", ondelete="CASCADE"))
```

### 2. Tidak Pakai Index
```python
# ❌ SALAH (query lambat)
# No index on user_id

# ✅ BENAR (query cepat)
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
```

### 3. Salah Tipe Data
```python
# ❌ SALAH (amount bisa negatif)
amount = Column(Integer)

# ✅ BENAR (decimal, positive)
amount = Column(Numeric(10, 2), CheckConstraint('amount > 0'))
```

### 4. Lupa Timestamps
```python
# ❌ SALAH (no audit trail)
# No created_at, updated_at

# ✅ BENAR (with timestamps)
created_at = Column(DateTime, default=datetime.utcnow)
updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### 5. Hardcode Database URL
```python
# ❌ SALAH (security risk)
DATABASE_URL = "postgresql://user:password@localhost/db"

# ✅ BENAR (use environment variable)
DATABASE_URL = os.getenv("DATABASE_URL")
```

---

## 📚 Learning Resources

### Dokumentasi Resmi:
1. **PostgreSQL Tutorial**
   - https://www.postgresqltutorial.com/
   - Start: Section 1-5 (basics)

2. **SQLAlchemy 2.0 Tutorial**
   - https://docs.sqlalchemy.org/en/20/tutorial/
   - Focus: ORM, Relationships

3. **Alembic Tutorial**
   - https://alembic.sqlalchemy.org/en/latest/tutorial.html
   - Focus: Migrations

### Video Tutorials:
1. "PostgreSQL Tutorial for Beginners" (freeCodeCamp)
2. "SQLAlchemy Tutorial" (Corey Schafer)
3. "Database Design Course" (freeCodeCamp)

### Practice:
1. https://sqlzoo.net/ (Interactive SQL)
2. https://www.hackerrank.com/domains/sql (SQL Challenges)

---

## ✅ Success Criteria (Sprint 1)

Kamu berhasil jika:
- ✅ PostgreSQL installed dan running
- ✅ Database `lifeos_dev` created
- ✅ 15 tabel created dengan migrations
- ✅ Relationships working (Foreign Keys)
- ✅ Indexes created
- ✅ Seed data populated
- ✅ Bisa query data (SELECT, INSERT, UPDATE, DELETE)
- ✅ Paham konsep: Tables, Columns, PK, FK, Relationships, Indexes

---

## 🎯 Next Steps

Setelah Sprint 1:
1. **Sprint 2:** Implement Authentication (pakai tabel users)
2. **Sprint 3:** Implement Finance Module (pakai tabel expenses)
3. **Sprint 4:** Implement Health Module (pakai tabel food_logs, weight_logs)

Database schema yang kamu buat di Sprint 1 akan dipakai di semua sprint berikutnya!

---

**Good luck! Database design itu fundamental skill. Invest time di sini akan save time nanti! 💪**

**Created:** February 2025  
**For:** Sprint 1 - US-1.3  
**Status:** Learning Guide
