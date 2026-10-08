# Todayly – Make Today Better

Ứng dụng lập lịch và quản lý công việc full-stack, dùng React + Tailwind CSS ở frontend và Express + MongoDB ở backend.

## Cấu trúc

```text
Todayly/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── home/
│   │   │   ├── task/
│   │   │   ├── food/
│   │   │   ├── place/
│   │   │   └── outfit/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Tasks/
│   │   │   ├── Food/
│   │   │   ├── Places/
│   │   │   ├── Outfit/
│   │   │   ├── Planner/
│   │   │   ├── Favorites/
│   │   │   ├── Profile/
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   ├── context/
│   │   ├── data/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── server.js
```

Frontend chạy trực tiếp từ `src/main.jsx`. Dự án không còn sử dụng production bundle khôi phục trong `public/recovery`.

## Chạy dự án

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## Dữ liệu

- Đăng ký và đăng nhập sử dụng backend thật, không có tài khoản mẫu.
- Công việc của mỗi người dùng được phân tách bằng JWT và lưu trong MongoDB.
- `Lịch trình` và `Hôm nay làm gì?` dùng chung collection Task.
- Nếu MongoDB chưa kết nối, API trả lỗi `503`; hệ thống không tạo dữ liệu giả.
