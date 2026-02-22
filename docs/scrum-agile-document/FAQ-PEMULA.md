# ❓ FAQ (Frequently Asked Questions) - Pemula

> Kumpulan pertanyaan yang sering ditanyakan oleh pemula saat memulai proyek LifeOS.

---

## 📚 Pertanyaan Umum

### Q1: Saya tidak punya pengalaman coding, apakah bisa mengikuti panduan ini?

**A**: Panduan ini dibuat untuk pemula, tapi ada beberapa prerequisite:
- Dasar HTML, CSS, JavaScript
- Dasar Python
- Familiar dengan terminal/command line
- Mau belajar dan googling

**Rekomendasi**: Jika benar-benar pemula, pelajari dulu:
1. HTML & CSS basics (1-2 minggu)
2. JavaScript basics (2-3 minggu)
3. Python basics (1-2 minggu)
4. Git basics (1 minggu)

**Resources**:
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy](https://www.codecademy.com/)
- [W3Schools](https://www.w3schools.com/)

---

### Q2: Berapa lama waktu yang dibutuhkan untuk menyelesaikan Sprint 0?

**A**: 
- **Estimasi**: 50 jam (2 minggu dengan 25 jam/minggu)
- **Realita untuk pemula**: Bisa 3-4 minggu
- **Tips**: Jangan terburu-buru, pahami setiap konsep

**Breakdown**:
- Hari 1-2: Setup (6-8 jam)
- Hari 3-4: Database & Auth (8-10 jam)
- Hari 5-6: Frontend & Packages (6-8 jam)
- Hari 7-8: CI/CD & Testing (5-6 jam)
- Hari 9-10: Bot & Dashboard (7-8 jam)
- Hari 11-12: Docs & Review (4-5 jam)

---

### Q3: Apakah harus menggunakan semua teknologi yang disebutkan?

**A**: Tidak harus, tapi direkomendasikan karena:
- Sudah teruji dan stabil
- Dokumentasi lengkap
- Komunitas besar
- Cocok untuk proyek ini

**Alternatif**:
- Next.js → Remix, SvelteKit
- FastAPI → Django, Flask
- PostgreSQL → MySQL, MongoDB
- Tailwind → Bootstrap, Material-UI

---


### Q4: Saya stuck di suatu task, apa yang harus dilakukan?

**A**: Ikuti langkah-langkah ini:

1. **Baca error message dengan teliti**
   - Copy error message
   - Cari di Google: "error message + teknologi"
   - Contoh: "CORS error FastAPI"

2. **Cek dokumentasi resmi**
   - Next.js docs
   - FastAPI docs
   - Stack Overflow

3. **Debug step by step**
   - Tambahkan `console.log()` atau `print()`
   - Cek apakah data sampai ke backend
   - Cek apakah query database benar

4. **Tanya di komunitas**
   - Stack Overflow
   - Reddit r/webdev
   - Discord communities

5. **Break down masalah**
   - Pecah jadi masalah lebih kecil
   - Solve satu per satu

**Contoh**:
```
Masalah: Login tidak bekerja

Break down:
1. Apakah form submit? → console.log()
2. Apakah request sampai backend? → cek network tab
3. Apakah password benar? → cek database
4. Apakah token dibuat? → cek backend logs
5. Apakah token disimpan? → cek localStorage
```

---

### Q5: Apakah harus mengikuti urutan sprint secara berurutan?

**A**: 
- **Sprint 0**: HARUS dikerjakan dulu (fondasi)
- **Sprint 1+**: Bisa disesuaikan prioritas

**Rekomendasi**:
- Ikuti urutan untuk pemula
- Setelah paham, bisa custom sesuai kebutuhan

**Alasan urutan penting**:
- Sprint 0 adalah fondasi
- Sprint 1 adalah fitur pertama (proof of concept)
- Sprint berikutnya build on top of previous sprints

---

### Q6: Berapa biaya yang dibutuhkan untuk development?

**A**: 

**Gratis** (untuk development):
- GitHub (repository)
- VS Code (editor)
- PostgreSQL (local)
- Redis (local)
- Vercel (hosting frontend - free tier)
- Railway (hosting backend - free tier)

**Berbayar** (untuk production):
- Domain: ~$10-15/tahun
- VPS/Cloud: ~$5-20/bulan
- Database hosting: ~$5-10/bulan
- OpenAI API: Pay per use (~$0.002/1K tokens)

**Total untuk development**: $0  
**Total untuk production**: ~$20-50/bulan

---


### Q7: Apakah bisa dikerjakan sendiri atau perlu tim?

**A**: 

**Bisa dikerjakan sendiri**, tapi:
- Butuh waktu lebih lama
- Harus belajar semua teknologi
- Lebih challenging

**Keuntungan solo**:
- Full control
- Belajar lebih banyak
- Fleksibel waktu

**Keuntungan tim**:
- Lebih cepat
- Bisa fokus di satu area
- Saling belajar

**Rekomendasi**:
- Solo: Fokus 1 sprint per 2-3 minggu
- Tim (2-3 orang): Bisa 1 sprint per 2 minggu

---

### Q8: Apa yang harus dilakukan jika menemukan bug?

**A**: 

1. **Jangan panik!** Bug adalah bagian dari development

2. **Dokumentasikan bug**:
   - Apa yang terjadi?
   - Apa yang diharapkan?
   - Langkah untuk reproduce
   - Screenshot/error message

3. **Debug**:
   - Cek logs
   - Tambahkan print/console.log
   - Gunakan debugger

4. **Fix**:
   - Buat branch baru: `bugfix/nama-bug`
   - Fix bug
   - Test
   - Commit & push

5. **Prevent**:
   - Tambahkan unit test
   - Update dokumentasi

**Template Bug Report**:
```markdown
## Bug Description
Login button tidak merespons saat diklik

## Expected Behavior
Seharusnya redirect ke dashboard

## Actual Behavior
Tidak ada yang terjadi

## Steps to Reproduce
1. Buka halaman login
2. Isi email & password
3. Klik tombol login
4. Tidak ada response

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Branch: feature/login

## Screenshots
[attach screenshot]
```

---


### Q9: Bagaimana cara testing aplikasi?

**A**: 

Ada beberapa jenis testing:

#### 1. Manual Testing
**Cara paling sederhana**:
- Buka aplikasi
- Coba semua fitur
- Cek apakah bekerja sesuai ekspektasi

#### 2. Unit Testing
**Test fungsi individual**:
```python
# Backend (pytest)
def test_parse_amount():
    parser = ExpenseParser()
    assert parser.parse_amount("15k") == 15000
```

```typescript
// Frontend (vitest)
test('formatCurrency formats correctly', () => {
  expect(formatCurrency(25000)).toBe('Rp 25.000');
});
```

#### 3. Integration Testing
**Test interaksi antar komponen**:
```python
def test_create_expense(client):
    response = client.post("/api/v1/finance/expenses", json={
        "amount": 25000,
        "description": "Makan siang"
    })
    assert response.status_code == 200
```

#### 4. E2E Testing
**Test keseluruhan flow**:
- Gunakan Playwright atau Cypress
- Simulasi user interaction
- Test dari login sampai logout

**Rekomendasi untuk pemula**:
1. Mulai dengan manual testing
2. Tambahkan unit tests untuk fungsi penting
3. Nanti bisa tambahkan E2E tests

---

### Q10: Bagaimana cara deploy aplikasi ke production?

**A**: 

#### Frontend (Next.js)

**Option 1: Vercel** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel
```

**Option 2: Netlify**
- Connect GitHub repo
- Auto-deploy on push

#### Backend (FastAPI)

**Option 1: Railway**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd apps/api
railway up
```

**Option 2: Render**
- Connect GitHub repo
- Configure build command
- Auto-deploy on push

#### Database

**Option 1: Railway**
- Provision PostgreSQL
- Copy connection string
- Update env vars

**Option 2: Supabase**
- Create project
- Get connection string
- Update env vars

**Checklist sebelum deploy**:
- ✅ Environment variables configured
- ✅ Database migrations run
- ✅ Tests passing
- ✅ CORS configured
- ✅ Security headers set
- ✅ Rate limiting enabled

---


## 🛠️ Pertanyaan Teknis

### Q11: Apa perbedaan pnpm, npm, dan yarn?

**A**: 

Semua adalah package manager untuk JavaScript.

**npm** (Node Package Manager):
- Default dari Node.js
- Paling populer
- Agak lambat

**yarn**:
- Dibuat oleh Facebook
- Lebih cepat dari npm
- Lockfile lebih baik

**pnpm** (Performant npm):
- Paling cepat
- Hemat disk space
- Digunakan di LifeOS

**Perbandingan**:
```
Install 1000 packages:
- npm: 60 detik
- yarn: 45 detik
- pnpm: 30 detik

Disk space:
- npm: 1 GB
- yarn: 900 MB
- pnpm: 300 MB (shared)
```

**Perintah setara**:
```bash
# Install dependencies
npm install
yarn install
pnpm install

# Add package
npm install axios
yarn add axios
pnpm add axios

# Remove package
npm uninstall axios
yarn remove axios
pnpm remove axios
```

---

### Q12: Apa itu environment variables dan bagaimana menggunakannya?

**A**: 

**Definisi**: Variabel konfigurasi yang berbeda per environment.

**Kenapa perlu?**:
- Keamanan (jangan commit API keys)
- Fleksibilitas (beda config dev vs prod)
- Portability (mudah pindah environment)

**Contoh**:
```bash
# .env (JANGAN commit ke Git!)
DATABASE_URL=postgresql://user:pass@localhost/db
JWT_SECRET=super-secret-key-123
OPENAI_API_KEY=sk-...
TELEGRAM_BOT_TOKEN=123456:ABC...
```

**Cara menggunakan**:

**Backend (Python)**:
```python
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET = os.getenv("JWT_SECRET")
```

**Frontend (Next.js)**:
```typescript
// .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

// Gunakan di code
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Best Practices**:
- ✅ Gunakan `.env.example` untuk template
- ✅ Tambahkan `.env` ke `.gitignore`
- ✅ Dokumentasikan semua env vars
- ❌ Jangan commit `.env` ke Git
- ❌ Jangan hardcode secrets di code

---

### Q13: Bagaimana cara handle CORS error?

**A**: 

**Apa itu CORS?**
Cross-Origin Resource Sharing - security feature browser.

**Contoh Error**:
```
Access to fetch at 'http://localhost:8000/api/v1/auth/login' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Penyebab**:
Frontend (localhost:3000) coba akses Backend (localhost:8000) - beda origin!

**Solusi di FastAPI**:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development
        "https://lifeos.com"      # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Untuk development** (allow semua):
```python
allow_origins=["*"]  # JANGAN di production!
```

**Untuk production** (specific origins):
```python
allow_origins=[
    "https://lifeos.com",
    "https://www.lifeos.com"
]
```

---


### Q14: Bagaimana cara membuat database migration?

**A**: 

**Apa itu Migration?**
Cara mengubah struktur database secara terorganisir.

**Kenapa perlu?**:
- Version control untuk database
- Rollback jika ada masalah
- Kolaborasi tim lebih mudah

**Menggunakan Alembic**:

**1. Initialize Alembic**:
```bash
cd apps/api
alembic init alembic
```

**2. Configure `alembic.ini`**:
```ini
sqlalchemy.url = postgresql://user:pass@localhost/db
```

**3. Update `alembic/env.py`**:
```python
from src.core.database import Base
from src.models import user, expense  # Import semua models

target_metadata = Base.metadata
```

**4. Create Migration**:
```bash
# Auto-generate dari models
alembic revision --autogenerate -m "Add expenses table"

# Manual migration
alembic revision -m "Add index to email"
```

**5. Review Migration File**:
```python
# alembic/versions/xxx_add_expenses_table.py
def upgrade():
    op.create_table(
        'expenses',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        # ...
    )

def downgrade():
    op.drop_table('expenses')
```

**6. Run Migration**:
```bash
# Upgrade to latest
alembic upgrade head

# Downgrade one version
alembic downgrade -1

# Check current version
alembic current
```

**Best Practices**:
- ✅ Review migration sebelum run
- ✅ Test di development dulu
- ✅ Backup database sebelum migrate
- ✅ Commit migration files ke Git
- ❌ Jangan edit migration yang sudah di-run

---

### Q15: Bagaimana cara debug aplikasi?

**A**: 

#### Backend (FastAPI)

**1. Print Debugging**:
```python
@router.post("/expenses")
def create_expense(expense_data: ExpenseCreate):
    print(f"Received data: {expense_data}")  # Debug
    # ... rest of code
```

**2. Logging**:
```python
import logging

logger = logging.getLogger(__name__)

@router.post("/expenses")
def create_expense(expense_data: ExpenseCreate):
    logger.info(f"Creating expense: {expense_data}")
    # ... rest of code
```

**3. VS Code Debugger**:
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["src.main:app", "--reload"],
      "jinja": true
    }
  ]
}
```

#### Frontend (Next.js)

**1. Console.log**:
```typescript
const handleSubmit = async (data) => {
  console.log('Form data:', data);  // Debug
  const response = await apiClient.post('/expenses', data);
  console.log('Response:', response);  // Debug
};
```

**2. React DevTools**:
- Install extension
- Inspect component state
- Check props

**3. Network Tab**:
- Buka Chrome DevTools (F12)
- Tab Network
- Cek request/response

**4. VS Code Debugger**:
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["dev"],
      "port": 9229
    }
  ]
}
```

**Tips Debugging**:
- Start dari error message
- Isolate masalah
- Check data flow
- Use breakpoints
- Read stack trace

---


## 🎯 Pertanyaan Sprint

### Q16: Apa yang harus dilakukan di Sprint Review?

**A**: 

Sprint Review adalah meeting di akhir sprint untuk:
1. Demo hasil kerja
2. Dapat feedback
3. Update product backlog

**Agenda** (1-2 jam):
1. **Opening** (5 min)
   - Recap sprint goal
   - Overview apa yang dikerjakan

2. **Demo** (30-45 min)
   - Tunjukkan fitur yang selesai
   - Live demo, bukan slide
   - Fokus pada user value

3. **Discussion** (15-30 min)
   - Feedback dari stakeholder
   - Apa yang berjalan baik?
   - Apa yang perlu diperbaiki?

4. **Backlog Update** (10-15 min)
   - Update prioritas
   - Add/remove items
   - Re-estimate

**Template Sprint Review**:
```markdown
# Sprint 0 Review

## Sprint Goal
Setup development environment and core infrastructure

## Completed Items
- ✅ Monorepo setup
- ✅ Frontend authentication
- ✅ Backend API
- ✅ Database setup
- ✅ CI/CD pipeline

## Demo
1. Show monorepo structure
2. Demo login/register
3. Show API docs
4. Show CI/CD workflow

## Metrics
- Story Points Completed: 39/39
- Velocity: 39
- Bugs Found: 2
- Tests Passing: 15/15

## Feedback
- [Feedback dari stakeholder]

## Next Sprint
- Sprint 1: Finance Module MVP
```

---

### Q17: Apa yang harus dilakukan di Sprint Retrospective?

**A**: 

Sprint Retrospective adalah meeting untuk refleksi dan improvement.

**Agenda** (1 jam):
1. **Set the Stage** (5 min)
   - Create safe environment
   - Remind ground rules

2. **Gather Data** (15 min)
   - What went well?
   - What didn't go well?
   - What puzzles us?

3. **Generate Insights** (20 min)
   - Why things happened?
   - Root cause analysis

4. **Decide Actions** (15 min)
   - What will we do differently?
   - Action items with owner

5. **Close** (5 min)
   - Recap action items
   - Appreciation

**Format: Start-Stop-Continue**:
```markdown
# Sprint 0 Retrospective

## Start (Mulai melakukan)
- Daily standup meetings
- Code review sebelum merge
- Write tests untuk fitur baru

## Stop (Berhenti melakukan)
- Push langsung ke main
- Skip documentation
- Ignore linter warnings

## Continue (Terus melakukan)
- Pair programming untuk fitur kompleks
- Update README saat ada perubahan
- Commit dengan message yang jelas

## Action Items
1. Setup daily standup at 9 AM (Owner: Team)
2. Create PR template (Owner: John)
3. Add pre-commit hooks (Owner: Jane)
```

**Tips**:
- Be honest but respectful
- Focus on process, not people
- Make action items specific
- Follow up on previous action items

---


### Q18: Bagaimana cara estimasi Story Points?

**A**: 

Story Points mengukur effort, bukan waktu.

**Faktor yang mempengaruhi**:
- Complexity (seberapa sulit?)
- Uncertainty (seberapa jelas requirement?)
- Effort (seberapa banyak pekerjaan?)

**Skala Fibonacci**: 1, 2, 3, 5, 8, 13, 21

**Guideline**:
- **1 point**: Sangat mudah, < 1 jam
  - Contoh: Update text di UI
  
- **2 points**: Mudah, 1-2 jam
  - Contoh: Add new field ke form
  
- **3 points**: Sedang, 2-3 jam
  - Contoh: Create simple component
  
- **5 points**: Agak kompleks, 3-5 jam
  - Contoh: Implement form validation
  
- **8 points**: Kompleks, 5-8 jam
  - Contoh: Create CRUD API
  
- **13 points**: Sangat kompleks, 1-2 hari
  - Contoh: Implement authentication
  
- **21+ points**: Terlalu besar, perlu dipecah

**Teknik Estimasi: Planning Poker**:
1. Baca user story
2. Diskusi requirement
3. Setiap orang pilih angka (secret)
4. Reveal bersamaan
5. Diskusi jika beda jauh
6. Voting lagi sampai consensus

**Tips**:
- Gunakan reference story
- Jangan overthink
- Estimasi relatif, bukan absolut
- Re-estimate jika perlu

---

### Q19: Bagaimana cara prioritas backlog?

**A**: 

**Framework: MoSCoW**

**Must Have** (P0):
- Critical untuk MVP
- Tanpa ini, produk tidak bisa jalan
- Contoh: Authentication, Database setup

**Should Have** (P1):
- Penting tapi tidak critical
- Bisa ditunda sedikit
- Contoh: Email notifications, Export data

**Could Have** (P2):
- Nice to have
- Tidak urgent
- Contoh: Dark mode, Animations

**Won't Have** (untuk sekarang):
- Tidak prioritas
- Mungkin di masa depan
- Contoh: Mobile app, Multi-language

**Cara Prioritas**:
1. **Value vs Effort Matrix**:
```
High Value, Low Effort  → Do First
High Value, High Effort → Do Second
Low Value, Low Effort   → Do Third
Low Value, High Effort  → Don't Do
```

2. **Dependencies**:
- Kerjakan yang jadi dependency dulu
- Contoh: Auth harus selesai sebelum protected routes

3. **Risk**:
- Kerjakan yang berisiko tinggi lebih awal
- Fail fast, learn fast

**Contoh Prioritas Sprint 0**:
```
P0 (Must Have):
- Monorepo setup
- Frontend setup
- Backend setup
- Database setup
- Authentication

P1 (Should Have):
- CI/CD pipeline
- Testing setup
- Shared packages

P2 (Could Have):
- Documentation
- Code formatting
```

---


### Q20: Apa yang harus dilakukan jika tidak selesai dalam satu sprint?

**A**: 

**Jangan panik!** Ini normal, terutama untuk pemula.

**Langkah-langkah**:

1. **Identifikasi Penyebab**:
   - Estimasi terlalu optimis?
   - Ada blocker yang tidak terduga?
   - Scope creep (requirement berubah)?
   - Skill gap?

2. **Prioritas Ulang**:
   - Mana yang HARUS selesai?
   - Mana yang bisa ditunda?
   - Focus on MVP

3. **Komunikasi**:
   - Inform stakeholder early
   - Explain situation
   - Propose solution

4. **Options**:
   
   **Option A: Extend Sprint**
   - Tambah 2-3 hari
   - Hanya untuk exceptional case
   - Tidak ideal

   **Option B: Move to Next Sprint**
   - Pindahkan incomplete items
   - Adjust next sprint capacity
   - Recommended

   **Option C: Reduce Scope**
   - Simplify requirement
   - Deliver partial feature
   - Better than nothing

5. **Learn & Improve**:
   - Discuss di retrospective
   - Adjust velocity
   - Improve estimation

**Contoh**:
```markdown
# Sprint 0 - Incomplete Items

## Completed (35/39 points)
- ✅ Monorepo setup (5)
- ✅ Frontend setup (5)
- ✅ Backend setup (8)
- ✅ Database setup (8)
- ✅ Authentication (8)
- ⚠️ CI/CD pipeline (5) - 80% done
- ❌ Testing setup (3) - Not started
- ❌ Documentation (3) - Not started

## Decision
- Move CI/CD to Sprint 1 (finish remaining 20%)
- Move Testing & Docs to Sprint 1
- Adjust Sprint 1 capacity: 34 - 11 = 23 points

## Root Cause
- Underestimated authentication complexity
- Spent extra time debugging CORS issues

## Action Items
- Add buffer time for debugging
- Improve estimation accuracy
- Start testing earlier
```

**Tips**:
- Don't sacrifice quality for speed
- It's okay to not finish everything
- Learn from it
- Adjust for next sprint

---

# 📞 Butuh Bantuan?

Jika masih ada pertanyaan yang belum terjawab:

1. **Baca dokumentasi**:
   - [PANDUAN-SPRINT-PEMULA.md](./PANDUAN-SPRINT-PEMULA.md)
   - [KONSEP-DASAR-PEMULA.md](./KONSEP-DASAR-PEMULA.md)

2. **Search di Google**:
   - Kebanyakan masalah sudah pernah dialami orang lain

3. **Tanya di komunitas**:
   - Stack Overflow
   - Reddit r/webdev
   - Discord communities

4. **Create GitHub Issue**:
   - Jika menemukan bug di dokumentasi
   - Jika ada saran improvement

---

**Happy Coding! 🚀**

*Dokumen ini akan terus diupdate berdasarkan feedback dan pertanyaan yang masuk.*
