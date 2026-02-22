# 🎓 Konsep Dasar untuk Pemula

> Dokumen ini menjelaskan konsep-konsep fundamental yang perlu dipahami sebelum memulai proyek LifeOS.

---

## 📚 Daftar Isi

1. [Apa itu Monorepo?](#apa-itu-monorepo)
2. [Apa itu Frontend & Backend?](#apa-itu-frontend--backend)
3. [Apa itu Database?](#apa-itu-database)
4. [Apa itu API?](#apa-itu-api)
5. [Apa itu Autentikasi?](#apa-itu-autentikasi)
6. [Apa itu CI/CD?](#apa-itu-cicd)
7. [Apa itu Docker?](#apa-itu-docker)
8. [Apa itu Git?](#apa-itu-git)

---

## 🏗️ Apa itu Monorepo?

### Penjelasan Sederhana
Monorepo adalah cara menyimpan semua kode proyek dalam satu repository (folder besar).

### Analogi
Bayangkan kamu punya toko online:
- **Monorepo**: Semua (website, aplikasi kasir, sistem gudang) dalam satu gedung
- **Multi-repo**: Website di gedung A, kasir di gedung B, gudang di gedung C

### Keuntungan Monorepo
✅ Semua kode di satu tempat  
✅ Mudah berbagi kode  
✅ Satu versi untuk semua  
✅ Refactoring lebih mudah

### Kerugian Monorepo
❌ Ukuran repository besar  
❌ Build time lebih lama  
❌ Perlu tools khusus (Turborepo)

### Struktur Monorepo LifeOS
```
lifeos/
├── apps/              # Aplikasi-aplikasi
│   ├── web/           # Website (Next.js)
│   ├── api/           # Backend (FastAPI)
│   └── bot/           # Telegram Bot
├── packages/          # Kode bersama
│   ├── types/         # TypeScript types
│   ├── ui/            # UI components
│   └── utils/         # Helper functions
└── docs/              # Dokumentasi
```

---


## 🎨 Apa itu Frontend & Backend?

### Frontend (Tampilan Depan)

**Definisi**: Bagian aplikasi yang dilihat dan diinteraksi oleh user.

**Analogi**: Frontend seperti interior toko - apa yang dilihat pelanggan.

**Teknologi LifeOS**:
- Next.js (framework)
- React (library UI)
- Tailwind CSS (styling)
- shadcn/ui (komponen)

**Contoh Pekerjaan Frontend**:
- Membuat halaman login
- Menampilkan list expenses
- Membuat form input
- Menampilkan grafik

### Backend (Mesin di Belakang)

**Definisi**: Bagian aplikasi yang menangani logika bisnis dan data.

**Analogi**: Backend seperti gudang & sistem kasir - yang bekerja di belakang layar.

**Teknologi LifeOS**:
- FastAPI (framework)
- PostgreSQL (database)
- Redis (caching)
- Celery (background tasks)

**Contoh Pekerjaan Backend**:
- Menyimpan data ke database
- Validasi data
- Autentikasi user
- Mengirim email

### Komunikasi Frontend-Backend

```
User → Frontend → API → Backend → Database
                    ↓
                Response
```

**Contoh Flow**:
1. User klik tombol "Login"
2. Frontend kirim email & password ke API
3. Backend cek di database
4. Backend kirim response (sukses/gagal)
5. Frontend tampilkan hasil

---


## 🗄️ Apa itu Database?

### Definisi
Database adalah tempat menyimpan data secara terstruktur.

### Analogi
Database seperti lemari arsip raksasa yang terorganisir dengan baik.

### Jenis Database

#### 1. Relational Database (SQL)
**Contoh**: PostgreSQL, MySQL, SQLite

**Karakteristik**:
- Data tersimpan dalam tabel
- Ada relasi antar tabel
- Menggunakan SQL untuk query

**Contoh Tabel Users**:
```
| id | email              | name          |
|----|-------------------|---------------|
| 1  | john@email.com    | John Doe      |
| 2  | jane@email.com    | Jane Smith    |
```

#### 2. NoSQL Database
**Contoh**: MongoDB, Redis

**Karakteristik**:
- Data tersimpan dalam dokumen/key-value
- Lebih fleksibel
- Lebih cepat untuk operasi tertentu

### Database di LifeOS

**PostgreSQL** (Database Utama):
- Menyimpan users
- Menyimpan expenses
- Menyimpan health logs
- Menyimpan tasks

**Redis** (Caching):
- Session data
- Temporary data
- Queue untuk background jobs

### Operasi Database (CRUD)

**Create** (Buat):
```sql
INSERT INTO users (email, name) 
VALUES ('john@email.com', 'John Doe');
```

**Read** (Baca):
```sql
SELECT * FROM users WHERE email = 'john@email.com';
```

**Update** (Ubah):
```sql
UPDATE users SET name = 'John Smith' 
WHERE email = 'john@email.com';
```

**Delete** (Hapus):
```sql
DELETE FROM users WHERE email = 'john@email.com';
```

---


## 🔌 Apa itu API?

### Definisi
API (Application Programming Interface) adalah jembatan komunikasi antar aplikasi.

### Analogi
API seperti pelayan di restoran:
- Kamu (Frontend) pesan makanan
- Pelayan (API) bawa pesanan ke dapur
- Dapur (Backend) masak makanan
- Pelayan bawa makanan kembali ke kamu

### REST API

**REST** = Representational State Transfer

**HTTP Methods**:
- **GET**: Ambil data (seperti baca buku)
- **POST**: Buat data baru (seperti tulis buku baru)
- **PUT**: Update data (seperti edit buku)
- **DELETE**: Hapus data (seperti buang buku)

### Contoh API Endpoints LifeOS

**Authentication**:
```
POST /api/v1/auth/register  → Register user baru
POST /api/v1/auth/login     → Login user
```

**Expenses**:
```
GET  /api/v1/finance/expenses       → List semua expenses
POST /api/v1/finance/expenses       → Buat expense baru
GET  /api/v1/finance/expenses/{id}  → Detail satu expense
PUT  /api/v1/finance/expenses/{id}  → Update expense
DELETE /api/v1/finance/expenses/{id} → Hapus expense
```

### Request & Response

**Request** (dari Frontend):
```http
POST /api/v1/finance/expenses
Content-Type: application/json
Authorization: Bearer eyJhbGc...

{
  "amount": 25000,
  "description": "Makan siang",
  "category": "Makanan"
}
```

**Response** (dari Backend):
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123",
  "amount": 25000,
  "description": "Makan siang",
  "category": "Makanan",
  "created_at": "2025-02-19T10:30:00Z"
}
```

### Status Codes

- **200 OK**: Sukses
- **201 Created**: Data berhasil dibuat
- **400 Bad Request**: Request salah
- **401 Unauthorized**: Belum login
- **403 Forbidden**: Tidak punya akses
- **404 Not Found**: Data tidak ditemukan
- **500 Internal Server Error**: Error di server

---


## 🔐 Apa itu Autentikasi?

### Definisi
Autentikasi adalah proses memverifikasi identitas user.

### Analogi
Autentikasi seperti menunjukkan KTP di security:
- Kamu tunjukkan KTP (username & password)
- Security cek (backend verifikasi)
- Security kasih kartu akses (JWT token)
- Kamu pakai kartu untuk masuk (akses dengan token)

### Flow Autentikasi LifeOS

#### 1. Register
```
User → Frontend: Isi form (email, password, name)
Frontend → Backend: POST /api/v1/auth/register
Backend: Hash password dengan bcrypt
Backend: Simpan user ke database
Backend → Frontend: Return JWT token
Frontend: Simpan token di localStorage
```

#### 2. Login
```
User → Frontend: Isi form (email, password)
Frontend → Backend: POST /api/v1/auth/login
Backend: Cek email di database
Backend: Verify password dengan bcrypt
Backend → Frontend: Return JWT token
Frontend: Simpan token di localStorage
```

#### 3. Akses Protected Endpoint
```
Frontend → Backend: GET /api/v1/finance/expenses
                    Header: Authorization: Bearer <token>
Backend: Decode & verify token
Backend: Ambil user_id dari token
Backend: Query expenses milik user
Backend → Frontend: Return expenses
```

### JWT (JSON Web Token)

**Struktur JWT**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

[Header].[Payload].[Signature]
```

**Payload** (data yang disimpan):
```json
{
  "sub": "user-id-123",
  "exp": 1708344000,
  "iat": 1708340400
}
```

### Password Hashing

**Kenapa Hash Password?**
- Keamanan: Password tidak disimpan plain text
- Jika database bocor, password tetap aman

**Cara Kerja Bcrypt**:
```
Password: "mypassword123"
         ↓ (bcrypt hash)
Hash: "$2b$12$KIXxLVq8..."
```

**Verifikasi**:
```python
# Saat register
hashed = bcrypt.hash("mypassword123")
# Simpan hashed ke database

# Saat login
input_password = "mypassword123"
stored_hash = "$2b$12$KIXxLVq8..."
is_valid = bcrypt.verify(input_password, stored_hash)
# is_valid = True
```

---


## 🚀 Apa itu CI/CD?

### CI (Continuous Integration)

**Definisi**: Otomatis test & build kode setiap ada perubahan.

**Analogi**: Seperti quality control di pabrik yang cek setiap produk.

**Proses CI**:
```
Developer push code → GitHub
                      ↓
              GitHub Actions run
                      ↓
              ┌──────┴──────┐
              ↓             ↓
         Run Tests    Run Linter
              ↓             ↓
         ✅ Pass      ✅ Pass
              └──────┬──────┘
                     ↓
              Build Success ✅
```

**Keuntungan CI**:
- Deteksi bug lebih cepat
- Kualitas kode terjaga
- Kolaborasi lebih mudah

### CD (Continuous Deployment)

**Definisi**: Otomatis deploy ke server setelah test berhasil.

**Analogi**: Seperti conveyor belt yang langsung kirim produk ke toko.

**Proses CD**:
```
CI Success ✅
     ↓
Deploy to Staging
     ↓
Manual Approval (optional)
     ↓
Deploy to Production
     ↓
Live! 🎉
```

### GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

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
      - name: Install dependencies
        run: pnpm install
      - name: Run tests
        run: pnpm test
      - name: Build
        run: pnpm build
```

**Kapan Workflow Berjalan?**
- Setiap push ke branch `main` atau `develop`
- Setiap ada Pull Request

---


## 🐳 Apa itu Docker?

### Definisi
Docker adalah platform untuk menjalankan aplikasi dalam container.

### Analogi
Docker seperti shipping container:
- Isi container sama di mana-mana
- Bisa dipindah-pindah (laptop, server, cloud)
- Terisolasi dari lingkungan luar

### Container vs Virtual Machine

**Virtual Machine**:
```
┌─────────────────┐
│   Application   │
│   Guest OS      │
│   Hypervisor    │
│   Host OS       │
│   Hardware      │
└─────────────────┘
```

**Container**:
```
┌─────────────────┐
│   Application   │
│   Docker Engine │
│   Host OS       │
│   Hardware      │
└─────────────────┘
```

**Keuntungan Container**:
- Lebih ringan
- Start lebih cepat
- Konsumsi resource lebih sedikit

### Docker Compose

**Definisi**: Tool untuk menjalankan multiple containers.

**File**: `docker-compose.yml`

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: lifeos
      POSTGRES_PASSWORD: lifeos_dev
      POSTGRES_DB: lifeos_dev
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

**Perintah**:
```bash
# Start semua services
docker-compose up -d

# Stop semua services
docker-compose down

# Lihat logs
docker-compose logs -f

# Lihat status
docker-compose ps
```

### Dockerfile

**Definisi**: Blueprint untuk membuat Docker image.

**Contoh Dockerfile**:
```dockerfile
FROM python:3.12
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

---


## 📝 Apa itu Git?

### Definisi
Git adalah version control system untuk tracking perubahan kode.

### Analogi
Git seperti "Save Game" di video game:
- Bisa save progress
- Bisa load save lama
- Bisa punya multiple save slots (branches)

### Konsep Dasar Git

#### 1. Repository (Repo)
Folder yang di-track oleh Git.

#### 2. Commit
Snapshot dari kode pada waktu tertentu.

```
Commit 1: "Add login page"
    ↓
Commit 2: "Fix login bug"
    ↓
Commit 3: "Add dashboard"
```

#### 3. Branch
Jalur development terpisah.

```
main    ●───●───●───●
             ↘
feature      ●───●
```

#### 4. Merge
Menggabungkan branch.

```
main    ●───●───●───●───●
             ↘         ↗
feature      ●───●───●
```

### Git Workflow

**1. Clone Repository**:
```bash
git clone https://github.com/username/lifeos.git
cd lifeos
```

**2. Buat Branch Baru**:
```bash
git checkout -b feature/expense-tracking
```

**3. Buat Perubahan**:
```bash
# Edit files...
```

**4. Stage Changes**:
```bash
git add .
# atau
git add src/components/ExpenseForm.tsx
```

**5. Commit**:
```bash
git commit -m "Add expense form component"
```

**6. Push ke GitHub**:
```bash
git push origin feature/expense-tracking
```

**7. Buat Pull Request**:
- Buka GitHub
- Klik "New Pull Request"
- Pilih branch
- Tulis deskripsi
- Submit

**8. Merge setelah Review**:
```bash
git checkout main
git pull origin main
git merge feature/expense-tracking
git push origin main
```

### Git Best Practices

**Commit Message**:
```
✅ Good:
- "Add expense form validation"
- "Fix login redirect bug"
- "Update README with setup instructions"

❌ Bad:
- "update"
- "fix bug"
- "asdfasdf"
```

**Branch Naming**:
```
✅ Good:
- feature/expense-tracking
- bugfix/login-redirect
- hotfix/security-patch

❌ Bad:
- my-branch
- test
- branch1
```

---

# 🎯 Kesimpulan

Sekarang kamu sudah memahami konsep-konsep dasar:
- ✅ Monorepo untuk organisasi kode
- ✅ Frontend & Backend untuk arsitektur aplikasi
- ✅ Database untuk menyimpan data
- ✅ API untuk komunikasi
- ✅ Autentikasi untuk keamanan
- ✅ CI/CD untuk otomasi
- ✅ Docker untuk containerization
- ✅ Git untuk version control

**Next Steps**:
1. Baca [PANDUAN-SPRINT-PEMULA.md](./PANDUAN-SPRINT-PEMULA.md)
2. Setup development environment
3. Mulai Sprint 0!

---

**Selamat belajar! 🚀**
