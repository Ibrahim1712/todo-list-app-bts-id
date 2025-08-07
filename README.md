# Take Home Test React JS Programmer - PT Nutech Integrasi

Repositori ini merupakan bagian dari Take Home Test untuk posisi React JS Programmer di PT Nutech Integrasi. Aplikasi ini adalah **To-Do List Application** yang dibangun dengan React, TypeScript, dan Vite.

## Daftar Isi

- [Overview](#overview)
- [Fitur yang Telah Diimplementasi](#fitur-yang-telah-diimplementasi)
- [Technology Stack](#technology-stack)
- [Persyaratan](#persyaratan)
- [Development Setup](#development-setup)
- [API Documentation](#api-documentation)
- [Testing Guide](#testing-guide)

## Overview

To-Do List Application adalah aplikasi web yang memungkinkan pengguna untuk:

- Membuat dan mengelola checklist
- Menambah, mengedit, dan menghapus item dalam checklist
- Melacak progress completion
- Mengubah status item (completed/pending)
- Mengorganisir tugas-tugas dalam checklist terstruktur

## Fitur yang Telah Diimplementasi

### ✅ Authentication Module

- [x] **Halaman Login** - Autentikasi pengguna dengan username/password
- [x] **Halaman Register** - Registrasi pengguna baru dengan email, username, password
- [x] **Protected Routes** - Proteksi halaman yang memerlukan autentikasi
- [x] **Bearer Token Authentication** - Implementasi token-based authentication

### ✅ Checklist Management Module

- [x] **Halaman Daftar Checklist** - Menampilkan semua checklist milik pengguna
- [x] **Membuat Checklist Baru** - Form untuk membuat checklist dengan nama
- [x] **Menghapus Checklist** - Action untuk menghapus checklist dengan confirmation
- [x] **Progress Tracking** - Progress bar menampilkan completion percentage

### ✅ Checklist Item Management Module

- [x] **Halaman Detail Checklist** - Menampilkan semua item dalam checklist
- [x] **Membuat Item Baru** - Form untuk menambah item ke dalam checklist
- [x] **Halaman Detail Item** - Informasi lengkap item (nama, status, tanggal)
- [x] **Mengubah Status Item** - Toggle status completed/pending
- [x] **Rename Item** - Edit nama item secara inline
- [x] **Menghapus Item** - Action untuk menghapus item dengan confirmation

### ✅ Technical Features

- [x] **Form Validation** - Validasi input pada semua form
- [x] **Redux State Management** - Menggunakan Redux Toolkit
- [x] **Responsive Design** - Desain yang responsive untuk desktop dan mobile
- [x] **Error Handling** - Penanganan error dengan user-friendly messages
- [x] **Loading States** - Loading indicators untuk semua async operations
- [x] **TypeScript** - Full TypeScript implementation untuk type safety

## Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + React Query
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM v7
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React

## Persyaratan

### Requirements dari Dokumen Guide

1. ✅ Halaman login
2. ✅ Halaman daftar baru
3. ✅ Halaman untuk membuat checklist
4. ✅ Action untuk menghapus checklist
5. ✅ Halaman untuk menampilkan checklist-checklist yang sudah dibuat
6. ✅ Halaman Detail Checklist (Berisi item-item to-do yang sudah dibuat)
7. ✅ Halaman untuk membuat item-item to-do di dalam checklist
8. ✅ Halaman detail item
9. ✅ Action untuk mengubah item-item di dalam checklist
10. ✅ Action untuk mengubah status dari item di dalam checklist
11. ✅ Action untuk menghapus item dari checklist

### Technical Requirements

- ✅ Fitur nomor 3-11 hanya bisa diakses setelah login
- ✅ Implementasi API yang disediakan
- ✅ Bearer token authentication
- ✅ Redux untuk state management
- ✅ Form validation
- ✅ Clean, structured, dan maintainable code

## Development Setup

### Prerequisites

- Node.js 18+
- npm atau yarn
- Git

### Installation

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd todolist-test-case
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   File `.env` sudah dikonfigurasi dengan API base URL:

   ```
   VITE_API_BASE_URL=http://94.74.86.174:8080/api
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**

   ```bash
   npm run build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   ```

## API Documentation

### Base URL

```
http://94.74.86.174:8080/api
```

### Swagger Documentation

```
http://94.74.86.174:8080/api/swagger-ui.html#/
```

### Authentication Endpoints

- `POST /login` - Login dengan username/password
- `POST /register` - Register pengguna baru

### Checklist Endpoints

- `GET /checklist` - Ambil semua checklist
- `POST /checklist` - Buat checklist baru
- `DELETE /checklist/{checklistId}` - Hapus checklist

### Checklist Item Endpoints

- `GET /checklist/{checklistId}/item` - Ambil semua item dalam checklist
- `POST /checklist/{checklistId}/item` - Buat item baru
- `GET /checklist/{checklistId}/item/{itemId}` - Ambil detail item
- `PUT /checklist/{checklistId}/item/{itemId}` - Update status item
- `PUT /checklist/{checklistId}/item/rename/{itemId}` - Rename item
- `DELETE /checklist/{checklistId}/item/{itemId}` - Hapus item

## Testing Guide

### Manual Testing Flow

1. **Registration & Authentication**

   ```
   1. Buka aplikasi di browser (http://localhost:5173)
   2. Register akun baru dengan email, username, password
   3. Login dengan credentials yang sudah dibuat
   4. Verifikasi redirect ke dashboard
   ```

2. **Checklist Management**

   ```
   1. Dari dashboard, klik "My Checklists"
   2. Klik "New Checklist" untuk membuat checklist baru
   3. Isi nama checklist dan submit
   4. Verifikasi checklist muncul di daftar
   ```

3. **Item Management**
   ```
   1. Klik "View Details" pada checklist yang sudah dibuat
   2. Klik "Add New Item" untuk menambah item
   3. Toggle status item dengan klik checkbox
   4. Edit nama item dengan klik icon edit
   5. Hapus item dengan klik icon trash
   6. Verifikasi progress bar update otomatis
   ```

### API Testing

Gunakan Postman/Insomnia untuk test API:

1. Register user baru via POST /register
2. Login via POST /login untuk mendapat token
3. Test semua checklist endpoints dengan Bearer token
4. Test semua item endpoints dengan Bearer token

## Project Structure

```
src/
├── components/
│   ├── auth/                  # Authentication components
│   ├── dashboard/             # Dashboard & checklist components
│   ├── providers/             # React providers
│   └── ui/                    # Reusable UI components
├── hooks/
│   ├── api/                   # API hooks (React Query)
│   └── auth/                  # Authentication hooks
├── services/                  # API services
├── types/                     # TypeScript type definitions
├── redux/                     # Redux store & slices
├── constants/                 # App constants
├── helper/                    # Utility functions
└── lib/                       # Library configurations
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contact

Untuk pertanyaan atau feedback mengenai implementasi ini, silakan hubungi developer.

---

**Status**: ✅ Implementasi Lengkap - Semua requirements telah dipenuhi
