# Todayly – Make Today Better

Nền tảng đồng hành giúp bạn bắt đầu ngày mới thảnh thơi, quản lý công việc và khám phá phong cách sống thông minh.

---

## 🏗 Cấu Trúc Hệ Thống (Full-Stack Architecture)

Dự án được cấu trúc tách biệt hoàn toàn giữa **Frontend** và **Backend**:

```
todayly/
├── frontend/                 # Giao diện người dùng (React, Vite, Tailwind CSS)
│   ├── public/               # Static assets & Production bundle
│   ├── src/                  # Mã nguồn React (Components, Pages, Services, Context)
│   │   ├── components/       # Common, Home, Task, Food, Place, Outfit
│   │   ├── pages/            # Home, Tasks, Food, Drinks, Places, Outfit, Planner, Profile, Login, Register
│   │   ├── services/         # Axios API services (api.js, authService.js, taskService.js...)
│   │   ├── context/          # React Context (AuthContext.jsx...)
│   │   └── data/             # Mock datasets dự phòng
│   ├── index.html
│   └── package.json
│
├── backend/                  # RESTful API Server (Node.js, Express, Mongoose)
│   ├── config/               # Cấu hình Database MongoDB Atlas (db.js)
│   ├── controllers/          # Business logic (authController.js, taskController.js...)
│   ├── middleware/           # authMiddleware (JWT), errorMiddleware
│   ├── models/               # Mongoose Schemas (User.js, Task.js...)
│   ├── routes/               # API routes (authRoutes.js, taskRoutes.js...)
│   ├── .env                  # Biến môi trường & MongoDB URI
│   ├── server.js             # Express Server entry point (Port 5000)
│   └── package.json
│
└── README.md
```

---

## ⚡ Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Khởi động Backend (Express API)

```bash
cd backend
npm install
npm start
```
- Server chạy tại: `http://localhost:5000`
- Kiểm tra trạng thái: `http://localhost:5000/api/health`

### 2. Cấu hình MongoDB Atlas

Mở file `backend/.env` và cập nhật mật khẩu MongoDB của bạn:
```env
PORT=5000
MONGO_URI=mongodb+srv://duy43976_db_user:<db_password>@cluster0.ro1wkuh.mongodb.net/?appName=Cluster0
JWT_SECRET=todayly_super_secure_jwt_secret_key_2026
```

> 💡 **Cơ chế Fallback thông minh:** Nếu bạn chưa thay thế `<db_password>`, Backend sẽ tự động chuyển sang chế độ **In-Memory Store**. Toàn bộ tính năng Đăng nhập, Đăng ký, Lấy profile và Cập nhật hồ sơ đều hoạt động 100% trơn tru ngay cả khi offline!

### 3. Khởi động Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
- Truy cập ứng dụng tại: `http://localhost:5173` (hoặc port do Vite cấp).

---

## 🔑 Giai Đoạn 1: Xác Thực & Hồ Sơ Cá Nhân (Đã hoàn thiện)

### Tài khoản mẫu thử nghiệm sẵn:
- **Email:** `mailinh@todayly.vn`
- **Mật khẩu:** `123456`

### Danh sách API Giai Đoạn 1:
- `POST /api/auth/register`: Đăng ký tài khoản mới (mã hóa mật khẩu bằng `bcrypt`, cấp JWT token).
- `POST /api/auth/login`: Đăng nhập, trả về JWT token và thông tin cá nhân.
- `GET /api/auth/me`: Lấy thông tin người dùng hiện tại (yêu cầu Header `Authorization: Bearer <token>`).
- `PUT /api/auth/preferences`: Cập nhật nhịp sinh học (giờ thức dậy, giờ ngủ), khẩu vị ăn uống, phong cách trang phục, phương tiện di chuyển.
