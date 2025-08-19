# Order Demo (MockAPI + React + Vite)

Demo đơn giản để phỏng vấn: quản lý đơn hàng, cập nhật trạng thái, thanh toán và báo cáo thời gian thực (poll mỗi 10s).

## 1) Cài đặt
```bash
npm i
npm run dev
```

> Yêu cầu Node 18+

## 2) Cấu hình MockAPI
1. Truy cập https://mockapi.io → tạo project mới.
2. Tạo **Resource** tên `orders` với các trường:
   - `customer` (string)
   - `product` (string)
   - `price` (number)
   - `status` (string) — giá trị khởi tạo là "Chờ xử lý"
3. Lấy endpoint ví dụ: `https://YOUR-MOCKAPI-ID.mockapi.io/orders`

Tạo file `.env` ở thư mục gốc:
```
VITE_API_URL=https://YOUR-MOCKAPI-ID.mockapi.io/orders
```

> Nếu không tạo `.env`, app sẽ dùng giá trị mặc định ở `src/services/orderService.js` (hãy sửa trực tiếp URL đó cho nhanh).

## 3) Chức năng
- ➕ Tạo đơn hàng (customer, product, price)
- 📋 Danh sách đơn hàng (lọc theo trạng thái, tìm kiếm)
- ⏭️ Chuyển trạng thái: Chờ xử lý → Đang giao → Đã thanh toán → Hoàn tất
- 💳 Thanh toán nhanh (đặt trạng thái "Đã thanh toán")
- 🗑️ Xóa đơn
- 📊 Báo cáo thời gian thực: Tổng đơn, số đơn hoàn tất, doanh thu đã thu (auto refresh mỗi 10s)

## 4) Tech
- React 18 + Vite
- Axios gọi MockAPI
- CSS thuần (1 file)

Chúc bạn demo thuận lợi! ✨
