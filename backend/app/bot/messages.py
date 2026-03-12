WELCOME = """
👋 *Halo, {first_name}!*
 
Selamat datang di *My Jarvis Gua Bot* — Personal asisten kamu di Telegram\!
 
Untuk mulai, hubungkan akun kamu terlebih dahulu dengan perintah:
👉 /connect
 
Sudah punya akun? Langsung connect\!
Belum punya? Daftar dulu di [My-Jarvis-Gua\.com](http://localhost:3000)
""".strip()
 
ALREADY_CONNECTED = """
✅ *Akun kamu sudah terhubung\!*
 
Halo, *{display_name}*\! Akun kamu sudah aktif\.
Gunakan /help untuk melihat semua perintah\.
""".strip()
 
HELP_TEXT = """
📖 *Panduan Bot*
 
*Koneksi Akun:*
/connect — Hubungkan akun
/disconnect — Putus koneksi akun
 
*Manajemen Task:*
/addtask — Tambah task baru
/list — Lihat semua task aktif
/done — Tandai task selesai
/stats — Lihat statistik task
 
*Profil:*
/profile — Lihat profil kamu
/editprofile — Edit nama dan bio
 
*Lainnya:*
/help — Tampilkan bantuan ini
/cancel — Batalkan aksi saat ini
""".strip()
 
# ── Connect Flow ──────────────────────────────────────────────────────────────
 
ASK_EMAIL = """
📧 *Hubungkan Akun Taskly*
 
Masukkan *email* akun Taskly kamu:
 
_Ketik /cancel untuk batalkan_
""".strip()
 
ASK_PASSWORD = """
🔑 Masukkan *password* akun Taskly kamu:
 
_Pesan password kamu akan segera dihapus untuk keamanan_
""".strip()
 
CONNECT_SUCCESS = """
✅ *Berhasil terhubung\!*
 
Halo, *{display_name}*\! Akun Telegram kamu sekarang terhubung dengan Taskly\.
 
Gunakan /addtask untuk mulai tambah tugas, atau /list untuk melihat task yang ada\.
""".strip()
 
CONNECT_FAILED_WRONG_CREDS = """
❌ *Login gagal\!*
 
Email atau password salah\. Silakan coba lagi dengan /connect\.
""".strip()
 
CONNECT_FAILED_EMAIL_NOT_CONFIRMED = """
⚠️ *Email belum dikonfirmasi\!*
 
Cek inbox email kamu dan klik link konfirmasi terlebih dahulu\.
Setelah itu, coba /connect lagi\.
""".strip()
 
DISCONNECT_SUCCESS = """
🔌 *Akun berhasil diputus*
 
Akun Telegram kamu tidak lagi terhubung dengan Taskly\.
Gunakan /connect untuk menghubungkan kembali\.
""".strip()
 
DISCONNECT_NOT_CONNECTED = """
ℹ️ Akun Telegram kamu belum terhubung dengan Taskly\.
""".strip()
 
# ── Add Task Flow ─────────────────────────────────────────────────────────────
 
ASK_TASK_TITLE = """
📝 *Tambah Task Baru*
 
Apa *judul* task kamu?
 
_Ketik /cancel untuk batalkan_
""".strip()
 
ASK_TASK_DATE = """
📅 Kapan *deadline*\-nya?
 
Format: `YYYY\-MM\-DD` \(contoh: `2025\-03\-31`\)
Atau ketik /skip jika tidak ada deadline\.
""".strip()
 
TASK_CREATED = """
✅ *Task berhasil dibuat\!*
 
📌 *{title}*
{date_line}
 
Gunakan /list untuk melihat semua task\.
""".strip()
 
TASK_CREATED_DATE_LINE = "📅 Deadline: {due_date}"
TASK_CREATED_NO_DATE_LINE = "📅 Tidak ada deadline"
 
# ── List Tasks ────────────────────────────────────────────────────────────────
 
NO_TASKS = """
📋 *Belum ada task aktif*
 
Tambah task pertama kamu dengan /addtask\! 🚀
""".strip()
 
TASK_LIST_HEADER = "📋 *Task Aktif kamu \\({count} task\\):*\n\n"
 
TASK_ITEM = """
{index}\. 📌 *{title}*{date_info}
""".strip()
 
TASK_ITEM_DATE = "\n   📅 _{due_date}_"
TASK_ITEM_URGENT = "\n   📅 _{due_date}_ ⚠️ _Segera\!_"
 
# ── Profile ───────────────────────────────────────────────────────────────────
 
PROFILE_INFO = """
👤 *Profil Kamu*
 
📛 Nama: *{display_name}*
📧 Email: `{email}`
📝 Bio: _{bio}_
🔗 Telegram: ✅ Terhubung
📅 Bergabung: {created_at}
""".strip()
 
ASK_NEW_DISPLAY_NAME = """
✏️ *Edit Nama Tampilan*
 
Nama kamu saat ini: *{current_name}*
 
Masukkan nama baru, atau /skip untuk lewati:
""".strip()
 
ASK_NEW_BIO = """
📝 *Edit Bio*
 
Bio kamu saat ini:
_{current_bio}_
 
Masukkan bio baru, atau /skip untuk lewati:
""".strip()
 
PROFILE_UPDATED = "✅ Profil berhasil diperbarui\!"
 
# ── Error & General ───────────────────────────────────────────────────────────
 
NOT_CONNECTED = """
🔒 *Akun belum terhubung*
 
Kamu belum menghubungkan akun Taskly ke Telegram\.
Gunakan /connect untuk memulai\.
""".strip()
 
CANCELLED = "❌ Aksi dibatalkan\."
 
UNEXPECTED_ERROR = """
⚠️ *Terjadi kesalahan*
 
Silakan coba lagi\. Jika masalah berlanjut, hubungi support\.
""".strip()
 
TASK_NOT_FOUND = "❌ Task tidak ditemukan atau sudah dihapus\."