# Index.html Module Map

Version : 1.0

Status : OFFICIAL

State : ACTIVE

---

# PURPOSE

Dokumen ini mendefinisikan pembagian resmi modul pada `Index.html`.

Module Map menjadi acuan selama proses modularisasi.

Seluruh fungsi hanya boleh dimiliki oleh satu module owner.

---

# DESIGN PRINCIPLE

Pembagian module mengikuti tanggung jawab (Single Responsibility).

Satu module memiliki satu tujuan.

Module tidak boleh saling menduplikasi tanggung jawab.

---

# MODULE HIERARCHY

Index.html

↓

Application Bootstrap

↓

Core Services

↓

Application Modules

↓

Shared Components

↓

Utilities

---

# MODULE LIST

| Module | Purpose | Status |
|---------|----------|--------|
| Bootstrap | Startup aplikasi | Planned |
| Configuration | Konfigurasi client | Planned |
| State | Global application state | Planned |
| Navigation | Navigasi halaman | Planned |
| Dashboard | Dashboard UI | Planned |
| Produksi | Modul produksi | Planned |
| Penjualan | Modul penjualan | Planned |
| Pemupukan | Modul pemupukan | Planned |
| Perawatan | Modul perawatan | Planned |
| Inventory | Modul inventori | Planned |
| Forecast | Forecast & perhitungan | Planned |
| Target | Target produksi | Planned |
| Reporting | Laporan | Planned |
| Grafik | Chart & visualisasi | Planned |
| Backup | Backup client | Planned |
| Admin | Administrasi | Planned |
| Dialog | Modal & dialog | Planned |
| Notification | Alert & toast | Planned |
| Validation | Validasi input | Planned |
| API Client | google.script.run wrapper | Planned |
| Formatter | Formatting data | Planned |
| DOM Helper | DOM helper | Planned |
| Event Handler | Event binding | Planned |
| Utility | Shared utility | Planned |

---

# MODULE OWNERSHIP

Setiap fungsi hanya boleh dimiliki oleh satu module.

Shared logic dipindahkan ke Utility.

Shared UI dipindahkan ke Shared Components.

---

# MODULE DEPENDENCY

Dependency diperbolehkan mengikuti arah berikut.

Bootstrap

↓

Configuration

↓

State

↓

Core Services

↓

Business Modules

↓

Shared Components

↓

Utilities

Dependency terbalik tidak diperbolehkan.

---

# EXTRACTION ORDER

Tahapan ekstraksi dilakukan dengan urutan berikut.

1. Bootstrap
2. Configuration
3. Utility
4. Formatter
5. Validation
6. DOM Helper
7. API Client
8. Event Handler
9. Shared Components
10. Navigation
11. Dashboard
12. Produksi
13. Penjualan
14. Pemupukan
15. Perawatan
16. Inventory
17. Forecast
18. Target
19. Reporting
20. Grafik
21. Backup
22. Admin

---

# MODULE RULES

Selama ekstraksi:

- Tidak memindahkan business rule.
- Tidak mengubah parameter fungsi.
- Tidak mengubah nama fungsi tanpa dokumentasi.
- Tidak mengubah event flow.
- Tidak mengubah struktur HTML.

---

# MODULE INTERFACE

Setiap module nantinya hanya boleh memiliki:

Public API

Internal Function

Private Helper

Tidak diperbolehkan mengakses internal module lain secara langsung.

---

# MODULE STATUS

| Module | Extraction |
|---------|------------|
| Bootstrap | Pending |
| Configuration | Pending |
| State | Pending |
| Navigation | Pending |
| Dashboard | Pending |
| Produksi | Pending |
| Penjualan | Pending |
| Pemupukan | Pending |
| Perawatan | Pending |
| Inventory | Pending |
| Forecast | Pending |
| Target | Pending |
| Reporting | Pending |
| Grafik | Pending |
| Backup | Pending |
| Admin | Pending |
| Dialog | Pending |
| Notification | Pending |
| Validation | Pending |
| API Client | Pending |
| Formatter | Pending |
| DOM Helper | Pending |
| Event Handler | Pending |
| Utility | Pending |

---

# NEXT DOCUMENT

Dokumen berikutnya:

03_FUNCTION_REGISTRY.md

Dokumen ini akan menjadi inventaris resmi seluruh fungsi pada `Index.html`, lengkap dengan module owner, dependency, dan status ekstraksi.