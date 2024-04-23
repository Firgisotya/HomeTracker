# HomeTracker (Aplikasi Administrasi Perumahan)

Aplikasi ini digunakan untuk melakukan pemesanan kendaraan dengan beberapa fitur utama, termasuk manajemen pemesanan, persetujuan berjenjang, dashboard grafik pemakaian kendaraan, dan laporan pemesanan yang dapat diexport dalam format Excel.

## Daftar Isi

- [RideRent App (Aplikasi Pemesanan Kendaraan)](#riderent-app-aplikasi-pemesanan-kendaraan)
  - [Daftar Isi](#daftar-isi)
  - [Informasi Proyek](#informasi-proyek)
  - [Persyaratan Sistem](#persyaratan-sistem)
  - [Instalasi](#instalasi)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Penggunaan](#penggunaan)
  - [Daftar Username-Password](#daftar-username-password)
  - [Framework](#framework)
    - [Backend (Laravel)](#backend-laravel)
    - [Frontend (React)](#frontend-react)
  - [Author](#author)

## Informasi Proyek

Aplikasi ini dibangun untuk memudahkan proses pemesanan kendaraan dengan fitur-fitur yang mencakup manajemen pemesanan, persetujuan berjenjang, dan pelaporan.

## Persyaratan Sistem

- PHP >=8.0.
- MySQL atau database relasional lainnya (XAMPP/LAMPP).
- Web server (contoh: Apache).
- Browser web modern (Chrome/Firefox).
- Composer
- NodeJS versi  >= 16

## Instalasi

Membuka terminal lalu
Clone repositori ini ke dalam direktori komputer anda

### Backend
- `cd backend`
- `composer install atau composer update` 
- `cp .env.example .env`
- `php artisan key:generate`
- silahkan membuat database dengan contoh
  <img src="./doc/create_db.png">
- `php artisan migrate --seed`
- `php artisan serve`

### Frontend
- buka dengan beda terminal (cmd/powershell)
- `cd frontend`
- `npm install`
- `npm run dev`

## Penggunaan

1. Akses aplikasi melalui browser dengan [http://localhost:5173](http://localhost:5173)
2. Login menggunakan akun admin.
3. Gunakan menu untuk melakukan pemesanan, persetujuan, dan melihat laporan.

## Daftar Username-Password

| Email             | Password    | Role      |
| ----------------- | ----------- | --------- |
| admin@gmail.com   | password    | Admin     |

## Framework

Aplikasi ini menggunakan kombinasi Laravel sebagai backend dan Angular sebagai frontend untuk memastikan kehandalan, keamanan, dan antarmuka pengguna yang responsif.

### Backend (Laravel)
- Framework: Laravel
- Versi Laravel: 9.0
- Dokumentasi Laravel: https://laravel.com/docs/9.x
### Frontend (React)
- Framework: React Js
- Versi React: 18
- Dokumentasi React: https://angular.io/docs

pastikan sudah menjalankan backend
- Api Postman dapat dilihat pada folder /doc/postman/*
- User Case Diagram <br/>
  <img src="./doc/use_case_diagram.png">
- Struktur Data Konsep <br/>
  <img src="./doc/schema_db.png">
  

## Author

Firgi Sotya Izzuddin | 2024
