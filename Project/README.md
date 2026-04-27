# 🌌 ELYSIUM — Integrated Event Management Platform

> **Elysium** là nền tảng quản lý và kết nối sự kiện hiện đại, giúp người dùng tìm kiếm, đăng ký và theo dõi các hoạt động văn hóa, học thuật, giải trí một cách trực quan và chuyên nghiệp.

🔗 **Live Demo:** [https://dieuthao02.github.io/elysium.github.io/](https://dieuthao02.github.io/elysium.github.io/)

---

## 👥 1. Đội ngũ thực hiện

| STT | Họ và Tên | Vai trò | Nhiệm vụ chính |
|-----|-----------|---------|----------------|
| 1 | Nhữ Thị Diệu Thảo | Project Manager & Core Developer | Chủ trì thiết kế kiến trúc hệ thống; Trực tiếp phát triển các module hạt nhân (Admin Dashboard, Lịch tương tác, Hệ thống Booking); Thiết lập nền tảng dữ liệu (Firebase & Local Storage). Kiểm soát chất lượng mã nguồn (Code Review) và hoàn thiện phần lớn hạ tầng giao diện toàn hệ thống. Xây dựng hệ thống tài liệu kỹ thuật (README). |
| 2 | Nguyễn Phan Trà My | Frontend Developer | Phát triển module danh mục và chi tiết sự kiện (Events); Phối hợp xây dựng hệ thống tài liệu kỹ thuật (README). |
| 3 | Phạm Minh Anh | Thành viên | Thiết kế và xây dựng giao diện các trang thông tin bổ trợ (About Us, Contact). |
| 4 | Đỗ Tiến Thịnh | Frontend Developer | Hỗ trợ phát triển hiển thị sự kiện (Detail) và tối ưu hóa trải nghiệm người dùng trên trang danh sách. |
| 5 | Đỗ Việt Công | Frontend Developer | Xây dựng giao diện trang chủ (Index) và khung hình bảng điều khiển người dùng (Dashboard). |
| 6 | Trần Đình Minh Đạt | Logic Developer | Phụ trách hệ thống xác thực người dùng (Auth) và chuẩn hóa cấu trúc Footer toàn trang. |

> **Phương thức làm việc:** Nhóm áp dụng quy trình phân chia nhiệm vụ rõ ràng, quản lý phiên bản bằng GitHub, phối hợp phát triển theo từng module và kiểm thử định kỳ để đảm bảo tính nhất quán, ổn định của toàn bộ hệ thống.

---

## 🚀 2. Công nghệ sử dụng

| Hạng mục | Chi tiết |
|----------|----------|
| **Frontend** | HTML5 (Semantic Tags), CSS3 (Flexbox, Grid, Responsive Design) |
| **Logic** | JavaScript (DOM Manipulation, Form Validation, Local Storage) |
| **Framework / Library** | Tailwind CSS |
| **Công cụ** | VS Code, Git/GitHub, Figma (Wireframe & UI Design) |

### 2.1. 💾 Quản lý dữ liệu

- **Firebase:** Sử dụng cho xác thực người dùng và cấu hình hệ thống.
- **Local Storage:** Lưu trữ tạm thời trạng thái giỏ hàng, thông tin booking và tùy chỉnh giao diện người dùng để đảm bảo tốc độ phản hồi tức thì.

### 2.2. 🎨 Ngôn ngữ thiết kế

- **Chủ đề:** Modern Luxury / Minimalist
- **Màu sắc chủ đạo:** Pastel Pink & Cyan
- **UI Components:** Các Card sự kiện được thiết kế bo góc, đổ bóng tạo cảm giác chiều sâu

---

## ✨ 3. Tính năng cốt lõi

Dự án đáp ứng đầy đủ các tiêu chí của **Cấp độ 3**, bao gồm:

| Tính năng | Mô tả |
|-----------|-------|
| 📅 **Lịch tương tác** | Theo dõi sự kiện theo ngày tháng một cách trực quan |
| 🔍 **Tìm kiếm & Lọc** | Bộ lọc nâng cao theo danh mục, thời gian và từ khóa |
| 🎟️ **Hệ thống Đặt vé** | Quy trình đặt vé mượt mà với kiểm tra dữ liệu theo thời gian thực |
| 📊 **Trang Quản trị** | Quản lý người dùng, sự kiện và thống kê hệ thống |
| 📱 **Responsive Design** | Tối ưu trên Mobile, Tablet và Desktop |

---

## 📂 4. Cấu trúc thư mục

```
Elysium_Group_Project/
├── index.html              # Trang chủ
├── about.html
├── blog.html
├── contact.html
├── events.html
├── detail.html
├── booking.html
├── calendar.html
├── create.html
├── auth.html
├── dashboard.html
├── admin.html
│
├── css/                    # Stylesheet
│   ├── index.css
│   ├── about.css
│   ├── blog.css
│   ├── contact.css
│   ├── events.css
│   ├── detail.css
│   ├── booking.css
│   ├── calendar.css
│   ├── create.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── admin.css
│   └── responsive.css
│
├── js/                     # JavaScript logic
│   ├── index.js
│   ├── about.js
│   ├── blog.js
│   ├── contact.js
│   ├── events.js
│   ├── detail.js
│   ├── booking.js
│   ├── calendar.js
│   ├── create.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── admin.js
│   └── firebase-config.js
│
├── img/                    # Tài nguyên hình ảnh
├── video/                  # Tài nguyên video
└── README.md               # Tài liệu dự án
```

---

## 🛠️ 5. Hướng dẫn cài đặt & Chạy dự án

### Bước 1 — Clone repository

```bash
git clone https://github.com/dieuthao02/elysium.github.io.git
```

### Bước 2 — Mở thư mục dự án

```bash
cd elysium.github.io
```

### Bước 3 — Chạy dự án

**Cách 1: Dùng Live Server (khuyến nghị)**

1. Mở thư mục dự án bằng **VS Code**
2. Cài extension **Live Server** (nếu chưa có)
3. Click chuột phải vào `index.html` → chọn **"Open with Live Server"**

> 💡 Lợi ích: Trang web sẽ tự động làm mới khi bạn thay đổi code.

**Cách 2: Mở trực tiếp bằng trình duyệt**

Mở file `index.html` bằng Chrome, Edge, Firefox hoặc bất kỳ trình duyệt hiện đại nào.

---

## ✅ 6. Tiêu chuẩn chất lượng

| Tiêu chí | Chi tiết |
|----------|----------|
| **W3C Validation** | HTML/CSS được kiểm tra theo chuẩn W3C |
| **Accessibility** | Sử dụng thuộc tính `alt` cho hình ảnh và cấu trúc heading chuẩn SEO |
| **Performance** | Hình ảnh được tối ưu, JavaScript hoạt động ổn định, không phát sinh lỗi trong Console |

---

## 📝 7. Vấn đề đã biết & Hạn chế

Mặc dù dự án đã hoàn thiện về mặt giao diện và trải nghiệm người dùng, hệ thống hiện vẫn còn một số hạn chế do **chưa tích hợp Backend và cơ sở dữ liệu tập trung**.

### 🔒 Lưu trữ dữ liệu

- Dữ liệu sự kiện và người dùng hiện được lưu bằng **Local Storage**
- Dữ liệu có thể bị mất khi xóa cache trình duyệt hoặc khi chuyển sang thiết bị khác

### 💳 Quy trình thanh toán

- Hệ thống hỗ trợ **QR Code thanh toán thực tế**
- Tuy nhiên, việc xác nhận thanh toán hiện vẫn được thực hiện **thủ công**
- Chưa tích hợp API ngân hàng hoặc Webhook để xác minh giao dịch tự động
- Người dùng vẫn có thể nhấn nút "Xác nhận" mà chưa hoàn tất giao dịch thực tế

### 🔄 Đồng bộ dữ liệu (Admin & Dashboard)

- **Duyệt sự kiện:** Hiện mới thay đổi trạng thái trong trang Admin
- Chưa tích hợp cơ chế đồng bộ dữ liệu tự động với Google Sheets hoặc cơ sở dữ liệu để cập nhật trực tiếp lên danh sách sự kiện

---

## 📌 Kết luận

**Elysium** là một dự án web quản lý sự kiện toàn diện, tập trung mạnh vào trải nghiệm người dùng, giao diện hiện đại và khả năng tương tác. Dự án thể hiện tốt việc ứng dụng **HTML, CSS và JavaScript** trong xây dựng một nền tảng quản lý sự kiện thực tế, đáp ứng đầy đủ các yêu cầu kỹ thuật và chức năng của đồ án môn học.

---

<div align="center">
  Made with ❤️ by <strong>Elysium Team</strong>
</div>