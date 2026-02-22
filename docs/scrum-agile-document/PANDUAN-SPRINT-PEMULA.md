# 📚 Panduan Sprint LifeOS untuk Pemula

> Dokumen ini menjelaskan rencana pengembangan proyek LifeOS selama 12 bulan dengan bahasa yang mudah dipahami untuk pemula.

---

## 🎯 Apa itu Sprint?

**Sprint** adalah periode waktu kerja yang tetap (dalam proyek ini: 2 minggu) di mana kita menyelesaikan sejumlah pekerjaan tertentu.

### Konsep Dasar Sprint:
- **Durasi**: 2 minggu (14 hari)
- **Total Sprint**: 24 sprint (12 bulan)
- **Jam Kerja**: ~25 jam/minggu = 50 jam/sprint
- **Story Points**: Target 20-30 poin per sprint

### Apa itu Story Points?
Story Points adalah cara mengukur seberapa sulit/besar suatu pekerjaan:
- **1-3 poin**: Pekerjaan kecil (1-2 jam)
- **5 poin**: Pekerjaan sedang (3-4 jam)
- **8 poin**: Pekerjaan besar (5-8 jam)
- **13+ poin**: Pekerjaan sangat besar (perlu dipecah)

---

## 📋 Prioritas Pekerjaan

Setiap tugas memiliki tingkat prioritas:
- **P0 (Priority 0)**: HARUS dikerjakan, paling penting
- **P1 (Priority 1)**: Penting, tapi bisa ditunda sedikit
- **P2 (Priority 2)**: Bagus untuk dimiliki, tidak urgent

---


# 🏗️ SPRINT 0: Membangun Fondasi (Minggu 1-2)

**Tanggal**: 19 Feb - 4 Mar 2025  
**Tujuan**: Menyiapkan semua alat dan infrastruktur dasar  
**Total Poin**: 39 poin

## Mengapa Sprint 0 Penting?

Sprint 0 adalah fase persiapan. Bayangkan seperti membangun rumah - sebelum membangun dinding dan atap, kita perlu membuat fondasi yang kuat terlebih dahulu.

---

## 📅 Hari 1-2: Inisialisasi Proyek

### Task 0.1: Setup Monorepo (5 poin, ~3 jam)

**Apa itu Monorepo?**
Monorepo adalah cara menyimpan semua kode proyek (frontend, backend, bot) dalam satu repository/folder besar.

**Keuntungan Monorepo:**
- Semua kode di satu tempat
- Mudah berbagi kode antar aplikasi
- Versi kontrol lebih mudah

**Yang Akan Dikerjakan:**
1. Install Turborepo (alat untuk mengelola monorepo)
2. Buat struktur folder:
   ```
   lifeos/
   ├── apps/           # Aplikasi utama
   │   ├── web/        # Website (Next.js)
   │   ├── api/        # Backend (FastAPI)
   │   └── bot/        # Telegram Bot
   ├── packages/       # Kode yang dibagi
   │   ├── types/      # Tipe data
   │   ├── ui/         # Komponen UI
   │   └── utils/      # Fungsi bantuan
   ├── docs/           # Dokumentasi
   └── scripts/        # Script otomasi
   ```
3. Setup Git (version control)

**Kriteria Selesai:**
- ✅ Perintah `pnpm dev` berjalan tanpa error
- ✅ Semua folder sudah dibuat
- ✅ Git sudah diinisialisasi



### Task 0.2: Setup Frontend Next.js (5 poin, ~4 jam)

**Apa itu Next.js?**
Next.js adalah framework untuk membuat website dengan React. Ini seperti template yang sudah siap pakai dengan banyak fitur bawaan.

**Yang Akan Dikerjakan:**
1. Install Next.js 15 di folder `/apps/web`
2. Install library pendukung:
   - **shadcn/ui**: Komponen UI yang cantik
   - **Tailwind CSS**: Styling yang mudah
   - **Zustand**: Manajemen state (data)
   - **React Query**: Fetching data dari API
   - **Axios**: HTTP client
   - **React Hook Form**: Membuat form
   - **Zod**: Validasi data
   - **Recharts**: Membuat grafik
   - **date-fns**: Manipulasi tanggal

3. Buat struktur folder:
   ```
   src/
   ├── app/          # Halaman-halaman
   ├── components/   # Komponen UI
   ├── hooks/        # Custom hooks
   ├── lib/          # Utility functions
   └── styles/       # CSS
   ```

4. Setup dark mode (mode gelap)

**Kriteria Selesai:**
- ✅ Website berjalan di http://localhost:3000
- ✅ Tailwind CSS bekerja
- ✅ Komponen shadcn/ui bisa digunakan
- ✅ Dark mode berfungsi



### Task 0.3: Setup Backend FastAPI (8 poin, ~5 jam)

**Apa itu FastAPI?**
FastAPI adalah framework Python untuk membuat API (backend). API adalah jembatan antara frontend (website) dan database.

**Mengapa FastAPI?**
- Sangat cepat
- Mudah dipelajari
- Dokumentasi otomatis
- Support async (operasi bersamaan)

**Yang Akan Dikerjakan:**
1. Buat folder `/apps/api`
2. Setup Python virtual environment (lingkungan terisolasi)
3. Install dependencies:
   - **FastAPI**: Framework utama
   - **Uvicorn**: Server untuk menjalankan FastAPI
   - **SQLAlchemy**: ORM (Object Relational Mapping) untuk database
   - **Alembic**: Migrasi database
   - **Pydantic**: Validasi data
   - **JWT**: Autentikasi
   - **Redis**: Caching
   - **Celery**: Background tasks
   - **OpenAI**: AI features
   - **python-telegram-bot**: Telegram bot

4. Buat struktur folder:
   ```
   src/
   ├── api/       # Endpoint API
   ├── core/      # Konfigurasi inti
   ├── models/    # Model database
   ├── schemas/   # Skema validasi
   ├── services/  # Business logic
   ├── ai/        # AI features
   └── tests/     # Unit tests
   ```

5. Buat file konfigurasi untuk environment variables

**Kriteria Selesai:**
- ✅ API berjalan di http://localhost:8000
- ✅ Dokumentasi API tersedia di http://localhost:8000/docs
- ✅ CORS dikonfigurasi (agar frontend bisa akses)
- ✅ Environment variables berfungsi



---

## 📅 Hari 3-4: Database & Autentikasi

### Task 0.4: Setup Database (8 poin, ~5 jam)

**Apa itu Database?**
Database adalah tempat menyimpan semua data aplikasi (user, expenses, health logs, dll).

**Teknologi yang Digunakan:**
- **PostgreSQL**: Database utama (seperti Excel tapi lebih powerful)
- **Redis**: Database cepat untuk caching (data sementara)
- **Docker**: Containerization (menjalankan database di lingkungan terisolasi)

**Yang Akan Dikerjakan:**
1. Buat file `docker-compose.yml` untuk menjalankan PostgreSQL dan Redis
2. Buat model database:
   - **User**: Data pengguna (email, password, nama)
   - **Expense**: Data pengeluaran
   - **HealthLog**: Data kesehatan
   - **Task**: Data tugas
   - **Vehicle**: Data kendaraan

3. Setup Alembic untuk migrasi database
4. Jalankan migrasi pertama

**Apa itu Migrasi Database?**
Migrasi adalah cara mengubah struktur database secara terorganisir. Seperti "version control" untuk database.

**Kriteria Selesai:**
- ✅ PostgreSQL berjalan dan bisa diakses
- ✅ Redis berjalan
- ✅ Semua tabel database sudah dibuat
- ✅ Alembic migrations bekerja



### Task 0.5: Sistem Autentikasi (8 poin, ~5 jam)

**Apa itu Autentikasi?**
Autentikasi adalah proses memverifikasi identitas pengguna (login/register).

**Teknologi yang Digunakan:**
- **JWT (JSON Web Token)**: Token untuk autentikasi
- **Bcrypt**: Enkripsi password
- **HTTPBearer**: Security scheme

**Cara Kerja Autentikasi:**
1. User register dengan email & password
2. Password di-hash (dienkripsi) sebelum disimpan
3. User login dengan email & password
4. Server verifikasi dan memberikan JWT token
5. User menggunakan token untuk akses endpoint yang dilindungi

**Yang Akan Dikerjakan:**
1. Buat utility untuk JWT:
   - `create_access_token()`: Membuat token
   - `decode_token()`: Membaca token
   - `verify_password()`: Verifikasi password
   - `get_password_hash()`: Hash password

2. Buat Pydantic schemas:
   - `UserCreate`: Data untuk register
   - `UserLogin`: Data untuk login
   - `Token`: Response token
   - `UserResponse`: Data user

3. Buat API endpoints:
   - `POST /api/v1/auth/register`: Register user baru
   - `POST /api/v1/auth/login`: Login user

4. Buat dependency `get_current_user()` untuk proteksi endpoint

**Kriteria Selesai:**
- ✅ User bisa register
- ✅ User bisa login dan menerima JWT
- ✅ Endpoint yang dilindungi memerlukan JWT valid
- ✅ Password di-hash dengan aman



---

## 📅 Hari 5-6: Frontend Auth & Shared Packages

### Task 0.6: Frontend Authentication (5 poin, ~4 jam)

**Yang Akan Dikerjakan:**
1. Buat API client dengan Axios:
   - Konfigurasi base URL
   - Interceptor untuk menambahkan token otomatis

2. Buat auth hook dengan Zustand:
   - State management untuk user & token
   - Function `login()`, `register()`, `logout()`
   - Simpan token di localStorage

3. Buat halaman Login & Register:
   - Form dengan validasi
   - Error handling
   - Redirect setelah login

4. Buat Protected Route wrapper:
   - Cek apakah user sudah login
   - Redirect ke login jika belum

**Kriteria Selesai:**
- ✅ User bisa register dari frontend
- ✅ User bisa login dari frontend
- ✅ Token tersimpan di localStorage
- ✅ Protected routes redirect ke login jika belum autentikasi



### Task 0.7: Setup Shared Packages (3 poin, ~2 jam)

**Apa itu Shared Packages?**
Shared packages adalah kode yang digunakan bersama oleh beberapa aplikasi (web, api, bot).

**Keuntungan:**
- Tidak perlu menulis kode yang sama berulang kali
- Konsistensi di semua aplikasi
- Mudah di-maintain

**Yang Akan Dikerjakan:**
1. Buat package `@lifeos/types`:
   - Interface untuk User
   - Interface untuk Expense
   - Interface untuk HealthLog
   - Interface untuk Task
   - Interface untuk Vehicle

2. Buat package `@lifeos/utils`:
   - `formatCurrency()`: Format angka ke Rupiah
   - `formatDate()`: Format tanggal
   - `parseExpenseAmount()`: Parse "15k" → 15000

**Contoh Penggunaan:**
```typescript
import { formatCurrency } from '@lifeos/utils';
import type { Expense } from '@lifeos/types';

const expense: Expense = {
  amount: 25000,
  description: "Makan siang"
};

console.log(formatCurrency(expense.amount)); // "Rp 25.000"
```

**Kriteria Selesai:**
- ✅ Package types bisa diimport
- ✅ Package utils bisa diimport
- ✅ Semua aplikasi bisa menggunakan shared packages



---

## 📅 Hari 7-8: CI/CD & Testing

### Task 0.8: CI/CD Pipeline (5 poin, ~3 jam)

**Apa itu CI/CD?**
- **CI (Continuous Integration)**: Otomatis test kode setiap kali ada perubahan
- **CD (Continuous Deployment)**: Otomatis deploy ke server setelah test berhasil

**Keuntungan CI/CD:**
- Deteksi bug lebih cepat
- Kualitas kode terjaga
- Deploy lebih aman
- Hemat waktu

**Yang Akan Dikerjakan:**
1. Buat GitHub Actions workflow untuk CI:
   - Test frontend (lint & build)
   - Test backend (pytest)
   - Jalankan otomatis setiap push/PR

2. Buat workflow untuk deploy staging:
   - Deploy otomatis ke Railway/Vercel
   - Hanya untuk branch `develop`

3. Setup branch protection rules:
   - Wajib review PR
   - Test harus pass sebelum merge
   - Tidak bisa push langsung ke `main`

**Kriteria Selesai:**
- ✅ CI berjalan setiap push/PR
- ✅ Test harus pass sebelum merge
- ✅ Staging auto-deploy saat push ke develop



### Task 0.9: Basic Testing Setup (3 poin, ~2 jam)

**Apa itu Testing?**
Testing adalah menulis kode untuk mengecek apakah kode kita bekerja dengan benar.

**Jenis Testing:**
- **Unit Test**: Test fungsi individual
- **Integration Test**: Test interaksi antar komponen
- **E2E Test**: Test keseluruhan aplikasi

**Yang Akan Dikerjakan:**
1. Setup Pytest untuk backend:
   - Konfigurasi test database
   - Buat fixtures (data test)
   - Test client untuk API

2. Tulis test untuk autentikasi:
   - Test register user
   - Test login user
   - Test protected endpoint

3. Setup Vitest untuk frontend:
   - Konfigurasi jsdom
   - Test komponen React

**Contoh Test:**
```python
def test_register_user(client):
    response = client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "password": "test123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

**Kriteria Selesai:**
- ✅ Pytest dikonfigurasi dan berjalan
- ✅ Minimal 2 backend tests passing
- ✅ Vitest dikonfigurasi
- ✅ Test coverage reports bekerja



---

## 📅 Hari 9-10: Telegram Bot & Dashboard

### Task 0.10: Telegram Bot Setup (8 poin, ~4 jam)

**Apa itu Telegram Bot?**
Bot adalah program yang bisa berinteraksi dengan user di Telegram. User bisa chat dengan bot seperti chat dengan teman.

**Keuntungan Telegram Bot:**
- Mudah digunakan
- Tidak perlu install app
- Bisa kirim notifikasi
- Gratis

**Yang Akan Dikerjakan:**
1. Buat bot di BotFather:
   - Buka Telegram, cari @BotFather
   - Ketik `/newbot`
   - Ikuti instruksi
   - Simpan token

2. Setup bot application:
   - Install python-telegram-bot
   - Buat command handlers:
     - `/start`: Welcome message
     - `/help`: Daftar perintah
   - Buat message handler untuk chat biasa

3. Koneksi bot ke backend API

**Contoh Interaksi:**
```
User: /start
Bot: 👋 Welcome to LifeOS!
     I'm your personal AI assistant...

User: Makan siang 25k
Bot: 💰 Expense Detected:
     Amount: Rp 25.000
     Description: Makan siang
     Select category: [Makanan] [Transport] [Lainnya]
```

**Kriteria Selesai:**
- ✅ Bot merespons `/start`
- ✅ Bot merespons `/help`
- ✅ Bot menerima pesan
- ✅ Bot berjalan di Docker



### Task 0.11: Basic Dashboard UI (5 poin, ~3 jam)

**Yang Akan Dikerjakan:**
1. Buat layout dashboard:
   - Header (logo, user menu)
   - Sidebar (navigasi)
   - Main content area

2. Buat Sidebar component dengan menu:
   - 🏠 Dashboard
   - 💰 Finance
   - ❤️ Health
   - 🏃 Running
   - 🚗 Vehicle
   - ✅ Tasks
   - ⚙️ Settings

3. Buat halaman dashboard kosong:
   - Card untuk statistik
   - Placeholder untuk data

4. Setup routing antar halaman

**Kriteria Selesai:**
- ✅ Dashboard layout render dengan baik
- ✅ Sidebar navigation bekerja
- ✅ Semua halaman modul bisa diakses
- ✅ Responsive di mobile



---

## 📅 Hari 11-12: Dokumentasi & Polish

### Task 0.12: Project Documentation (3 poin, ~2 jam)

**Mengapa Dokumentasi Penting?**
- Memudahkan developer lain memahami proyek
- Referensi untuk diri sendiri di masa depan
- Memudahkan onboarding anggota tim baru

**Yang Akan Dikerjakan:**
1. Buat README.md lengkap:
   - Deskripsi proyek
   - Fitur-fitur
   - Tech stack
   - Cara instalasi
   - Cara menjalankan
   - Struktur folder

2. Buat CONTRIBUTING.md:
   - Panduan kontribusi
   - Code style guide
   - Git workflow

3. Dokumentasi environment variables:
   - Daftar semua env vars
   - Penjelasan masing-masing
   - Contoh nilai

4. Buat diagram arsitektur:
   - Flow data
   - Hubungan antar komponen

**Kriteria Selesai:**
- ✅ README lengkap dengan instruksi setup
- ✅ Semua env vars terdokumentasi
- ✅ Diagram arsitektur dibuat



### Task 0.13: Sprint 0 Review & Retrospective (2 poin, ~2 jam)

**Apa itu Sprint Review?**
Sprint Review adalah sesi di akhir sprint untuk:
- Mengecek apakah semua pekerjaan selesai
- Demo hasil kerja
- Mendapat feedback

**Apa itu Sprint Retrospective?**
Sprint Retrospective adalah sesi refleksi untuk:
- Apa yang berjalan baik?
- Apa yang bisa diperbaiki?
- Action items untuk sprint berikutnya

**Yang Akan Dikerjakan:**
1. Test seluruh setup end-to-end
2. Fix bug yang ditemukan
3. Dokumentasi lessons learned
4. Rencanakan prioritas Sprint 1
5. Update project board

**Sprint 0 Review Checklist:**
- ✅ Monorepo bekerja
- ✅ Frontend render
- ✅ Backend API merespons
- ✅ Database terkoneksi
- ✅ Autentikasi bekerja
- ✅ Telegram bot merespons
- ✅ CI/CD pipeline berjalan
- ✅ Dokumentasi lengkap



---

## 📊 Ringkasan Sprint 0

### Deliverables (Hasil yang Diserahkan):
✅ Monorepo setup dengan Turborepo  
✅ Next.js frontend dengan autentikasi  
✅ FastAPI backend dengan database  
✅ Telegram bot skeleton  
✅ CI/CD pipeline  
✅ Basic testing  
✅ Dokumentasi lengkap

### Yang TIDAK Ada di Sprint 0:
❌ Business logic (expense tracking, health, dll)  
❌ Fitur AI  
❌ Komponen UI kompleks  
❌ Integrasi email/bank

### Statistik:
- **Total Story Points**: 39 poin
- **Estimasi Waktu**: 50 jam
- **Durasi**: 2 minggu
- **Jumlah Tasks**: 13 tasks

---


# 🏃 SPRINT 1: Finance Module MVP (Minggu 3-4)

**Tanggal**: 5 Mar - 18 Mar 2025  
**Tujuan**: User bisa mencatat pengeluaran via chat dan melihatnya di dashboard  
**Total Poin**: 34 poin

## Gambaran Umum Sprint 1

Sprint 1 fokus pada fitur pertama yang bisa digunakan: **Expense Tracking** (Pencatatan Pengeluaran).

### Fitur yang Akan Dibuat:
1. User bisa kirim pesan "Makan siang 25k" ke bot
2. Bot parse (membaca) jumlah dan deskripsi
3. Bot tanya kategori pengeluaran
4. Data tersimpan di database
5. User bisa lihat pengeluaran di website
6. User bisa tambah pengeluaran manual via form
7. Dashboard menampilkan ringkasan bulanan

---

## 📅 Minggu 1: Backend Expense API

### Task 1.1: Expense Parser Service (8 poin, ~3 jam)

**Apa itu Parser?**
Parser adalah program yang membaca teks dan mengekstrak informasi penting.

**Contoh:**
- Input: "Makan siang 25k"
- Output: `{ amount: 25000, description: "Makan siang" }`

**Format yang Didukung:**
- "15k" → 15.000
- "1.5jt" → 1.500.000
- "25ribu" → 25.000
- "Rp 50000" → 50.000

**Yang Akan Dikerjakan:**
1. Buat class `ExpenseParser`
2. Method `parse_amount()`: Extract angka dari teks
3. Method `extract_description()`: Extract deskripsi
4. Method `parse_expense()`: Gabungkan keduanya
5. Tulis unit tests

**Kriteria Selesai:**
- ✅ Parser bisa baca format "15k", "1.5jt", dll
- ✅ Parser bisa extract deskripsi
- ✅ Semua tests passing



### Task 1.2: Expense CRUD API (8 poin, ~4 jam)

**Apa itu CRUD?**
CRUD adalah operasi dasar database:
- **C**reate: Buat data baru
- **R**ead: Baca data
- **U**pdate: Update data
- **D**elete: Hapus data

**Yang Akan Dikerjakan:**
1. Buat Pydantic schemas:
   - `ExpenseCreate`: Data untuk buat expense
   - `ExpenseResponse`: Data response

2. Buat SQLAlchemy model:
   - Tabel `expenses` dengan kolom:
     - id, user_id, amount, description
     - category, date, created_at

3. Buat migrasi database

4. Buat API endpoints:
   - `POST /api/v1/finance/expenses`: Buat expense
   - `GET /api/v1/finance/expenses`: List expenses
   - `POST /api/v1/finance/expenses/parse`: Parse teks

**Contoh Request:**
```bash
POST /api/v1/finance/expenses
{
  "amount": 25000,
  "description": "Makan siang",
  "category": "Makanan"
}
```

**Kriteria Selesai:**
- ✅ Bisa create expense
- ✅ Bisa list expenses
- ✅ Bisa parse expense text
- ✅ Data tersimpan di database



### Task 1.3: Telegram Bot Expense Handler (8 poin, ~4 jam)

**Yang Akan Dikerjakan:**
1. Buat expense handler:
   - Terima pesan dari user
   - Parse menggunakan API
   - Tampilkan konfirmasi dengan kategori

2. Buat category callback:
   - User pilih kategori
   - Kirim ke API untuk disimpan
   - Tampilkan konfirmasi sukses

3. Daftar kategori:
   - 🍔 Makanan
   - 🚗 Transport
   - 🛒 Belanja
   - 🎮 Hiburan
   - 💳 Tagihan
   - 💊 Kesehatan
   - 📦 Lainnya

**Flow Interaksi:**
```
User: Makan siang 25k

Bot: 💰 Expense Detected:
     Amount: Rp 25.000
     Description: Makan siang
     
     Select category:
     [🍔 Makanan] [🚗 Transport] [🛒 Belanja]
     [🎮 Hiburan] [💳 Tagihan] [💊 Kesehatan]
     [📦 Lainnya]

User: *klik Makanan*

Bot: ✅ Expense logged!
     Rp 25.000 - Makan siang
     Category: Makanan
```

**Kriteria Selesai:**
- ✅ Bot bisa parse pesan expense
- ✅ Bot tampilkan pilihan kategori
- ✅ Expense tersimpan setelah pilih kategori
- ✅ Bot kirim konfirmasi



---

## 📅 Minggu 2: Frontend Expense UI

### Task 1.4: Expense List Component (8 poin, ~4 jam)

**Yang Akan Dikerjakan:**
1. Buat custom hook `useExpenses()`:
   - Fetch data dari API
   - Cache dengan React Query
   - Auto-refresh saat ada perubahan

2. Buat component `ExpenseList`:
   - Tampilkan list expenses
   - Format currency (Rp 25.000)
   - Format date (20 Feb 2025)
   - Tampilkan kategori

3. Buat halaman Finance:
   - Integrasikan ExpenseList
   - Loading state
   - Empty state

**Tampilan ExpenseList:**
```
┌─────────────────────────────────────┐
│ Makan siang                         │
│ Makanan • 20 Feb 2025      Rp 25.000│
├─────────────────────────────────────┤
│ Bensin motor                        │
│ Transport • 19 Feb 2025    Rp 50.000│
├─────────────────────────────────────┤
│ Belanja bulanan                     │
│ Belanja • 18 Feb 2025     Rp 500.000│
└─────────────────────────────────────┘
```

**Kriteria Selesai:**
- ✅ List expenses tampil di web
- ✅ Data real-time dari API
- ✅ Format currency & date benar
- ✅ Responsive di mobile



### Task 1.5: Expense Form Component (5 poin, ~3 jam)

**Yang Akan Dikerjakan:**
1. Buat form schema dengan Zod:
   - Validasi amount (harus positif)
   - Validasi description (tidak boleh kosong)
   - Validasi category

2. Buat component `ExpenseForm`:
   - Input amount
   - Input description
   - Select category
   - Submit button

3. Integrasikan dengan API:
   - Mutation dengan React Query
   - Auto-refresh list setelah submit
   - Reset form setelah sukses

**Tampilan Form:**
```
┌─────────────────────────────────────┐
│ Add Expense                         │
├─────────────────────────────────────┤
│ Amount (Rp)                         │
│ [____________]                      │
│                                     │
│ Description                         │
│ [____________]                      │
│                                     │
│ Category                            │
│ [Makanan ▼]                         │
│                                     │
│ [Add Expense]                       │
└─────────────────────────────────────┘
```

**Kriteria Selesai:**
- ✅ Form validasi bekerja
- ✅ Bisa submit expense
- ✅ List auto-refresh setelah submit
- ✅ Form reset setelah sukses



### Task 1.6: Basic Monthly Summary (8 poin, ~4 jam)

**Yang Akan Dikerjakan:**
1. Buat API endpoint `/summary`:
   - Aggregate expenses by category
   - Calculate total per category
   - Count jumlah transaksi
   - Filter by month & year

2. Buat component `MonthlySummary`:
   - Card total pengeluaran bulan ini
   - Pie chart breakdown by category
   - List kategori dengan jumlah

3. Integrasikan Recharts:
   - Install recharts
   - Buat pie chart
   - Custom colors per kategori

**Tampilan Summary:**
```
┌─────────────────────────────────────┐
│ February 2025                       │
│                                     │
│ Total Spending                      │
│ Rp 1.250.000                        │
│                                     │
│     [Pie Chart]                     │
│                                     │
│ By Category:                        │
│ 🍔 Makanan      Rp 500.000 (40%)   │
│ 🚗 Transport    Rp 300.000 (24%)   │
│ 🛒 Belanja      Rp 450.000 (36%)   │
└─────────────────────────────────────┘
```

**Kriteria Selesai:**
- ✅ Summary API bekerja
- ✅ Total spending tampil
- ✅ Pie chart render
- ✅ Breakdown by category tampil



---

## 📊 Ringkasan Sprint 1

### Definition of Done (Kriteria Selesai):
- ✅ User bisa kirim "Makan siang 25k" ke bot
- ✅ Bot parse amount dan description
- ✅ Bot tanya kategori
- ✅ Expense tersimpan di database
- ✅ Expense tampil di web dashboard
- ✅ User bisa tambah expense manual via form
- ✅ Monthly summary tampil total dan kategori
- ✅ Semua tests passing
- ✅ Mobile responsive

### Statistik:
- **Total Story Points**: 34 poin
- **Estimasi Waktu**: ~50 jam
- **Durasi**: 2 minggu
- **Jumlah Tasks**: 6 tasks

### User Journey:
1. User buka Telegram
2. Kirim pesan "Makan siang 25k"
3. Bot parse dan tanya kategori
4. User pilih "Makanan"
5. Bot konfirmasi tersimpan
6. User buka website
7. Lihat expense di list
8. Lihat summary bulanan

---


# 📖 Istilah Penting

## Teknologi

### Frontend
- **Next.js**: Framework React untuk membuat website
- **React**: Library JavaScript untuk UI
- **Tailwind CSS**: Framework CSS untuk styling
- **shadcn/ui**: Koleksi komponen UI
- **Zustand**: State management
- **React Query**: Data fetching & caching
- **Zod**: Schema validation

### Backend
- **FastAPI**: Framework Python untuk API
- **SQLAlchemy**: ORM untuk database
- **Alembic**: Database migration tool
- **Pydantic**: Data validation
- **JWT**: JSON Web Token untuk autentikasi
- **Bcrypt**: Password hashing

### Database
- **PostgreSQL**: Relational database
- **Redis**: In-memory database untuk caching

### DevOps
- **Docker**: Containerization
- **GitHub Actions**: CI/CD
- **Turborepo**: Monorepo tool
- **pnpm**: Package manager

---

## Konsep Agile

### Sprint
Periode waktu tetap (2 minggu) untuk menyelesaikan pekerjaan.

### Story Points
Ukuran kompleksitas/effort suatu pekerjaan.

### User Story
Deskripsi fitur dari perspektif user.
Format: "As a [user], I want [feature] so that [benefit]"

### Task
Pekerjaan teknis untuk menyelesaikan user story.

### Acceptance Criteria
Kondisi yang harus dipenuhi agar task dianggap selesai.

### Definition of Done
Checklist standar untuk menentukan kapan pekerjaan selesai.

### Sprint Review
Meeting di akhir sprint untuk demo hasil kerja.

### Sprint Retrospective
Meeting untuk refleksi dan improvement.

---


## Konsep Programming

### API (Application Programming Interface)
Interface untuk komunikasi antar aplikasi.

### REST API
Arsitektur API menggunakan HTTP methods (GET, POST, PUT, DELETE).

### CRUD
Create, Read, Update, Delete - operasi dasar database.

### ORM (Object Relational Mapping)
Cara mengakses database menggunakan object, bukan SQL.

### Migration
Cara mengubah struktur database secara terorganisir.

### Authentication
Proses verifikasi identitas user.

### Authorization
Proses verifikasi hak akses user.

### Token
String unik untuk autentikasi (seperti tiket masuk).

### Hashing
Enkripsi satu arah (tidak bisa di-decrypt).

### Environment Variables
Konfigurasi yang berbeda per environment (dev, staging, prod).

---


# 💡 Tips untuk Pemula

## 1. Jangan Terburu-buru
- Pahami konsep sebelum coding
- Baca dokumentasi dengan teliti
- Tanya jika ada yang tidak jelas

## 2. Test Secara Berkala
- Jangan tunggu sampai selesai semua
- Test setiap fitur setelah dibuat
- Fix bug segera setelah ditemukan

## 3. Commit Sering
- Commit setiap selesai satu task kecil
- Tulis commit message yang jelas
- Jangan commit kode yang error

## 4. Dokumentasi
- Tulis komentar untuk kode yang kompleks
- Update README saat ada perubahan
- Dokumentasikan API endpoints

## 5. Belajar dari Error
- Baca error message dengan teliti
- Google error message
- Catat solusi untuk referensi

## 6. Gunakan Tools
- VS Code extensions
- Postman untuk test API
- Chrome DevTools untuk debug

## 7. Break Down Tasks
- Pecah task besar jadi kecil-kecil
- Fokus satu task pada satu waktu
- Celebrate small wins

---


# 🎯 Roadmap Sprint 2-24

Setelah Sprint 0 dan Sprint 1 selesai, berikut adalah gambaran umum sprint-sprint berikutnya:

## Sprint 2-3: Finance Module (Lanjutan)
- Budget tracking
- Kategori custom
- Export data
- Grafik spending trends

## Sprint 4-5: Health Module
- Food logging
- Calorie tracking
- Weight tracking
- Exercise logging

## Sprint 6-7: Running Coach
- Training plans
- Run tracking
- Progress analytics
- Goal setting

## Sprint 8-9: Vehicle Module
- Maintenance tracking
- Fuel logging
- Service reminders
- Cost analysis

## Sprint 10-11: Task Management
- Todo lists
- Reminders
- Priorities
- Categories

## Sprint 12-15: AI Features
- Natural language processing
- Smart categorization
- Predictive analytics
- Personalized insights

## Sprint 16-18: Integrations
- Email integration
- Bank integration
- Calendar sync
- Export/Import

## Sprint 19-21: Advanced Features
- Multi-currency
- Recurring expenses
- Shared expenses
- Reports & analytics

## Sprint 22-24: Polish & Launch
- Performance optimization
- Security audit
- User testing
- Production deployment

---


# 📚 Resources untuk Belajar

## Dokumentasi Resmi
- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## Tutorial Video
- [Next.js Tutorial - YouTube](https://www.youtube.com/results?search_query=nextjs+tutorial)
- [FastAPI Tutorial - YouTube](https://www.youtube.com/results?search_query=fastapi+tutorial)
- [React Tutorial - YouTube](https://www.youtube.com/results?search_query=react+tutorial)

## Komunitas
- [Stack Overflow](https://stackoverflow.com/)
- [Reddit r/webdev](https://www.reddit.com/r/webdev/)
- [Discord - Reactiflux](https://www.reactiflux.com/)
- [Discord - Python](https://pythondiscord.com/)

## Tools
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [TablePlus](https://tableplus.com/) - Database GUI
- [Figma](https://www.figma.com/) - Design

---

# 🤝 Kontribusi

Jika ada yang ingin ditambahkan atau diperbaiki dalam dokumen ini, silakan:
1. Buat issue di GitHub
2. Submit pull request
3. Hubungi maintainer

---

# 📝 Changelog

## v1.0.0 (19 Feb 2025)
- Initial documentation
- Sprint 0 & Sprint 1 breakdown
- Glossary & tips

---

**Dibuat dengan ❤️ untuk memudahkan pemula memahami sprint planning**
