import React, { useEffect, useState } from "react";
import OrderForm from "./components/OrderForm.jsx";
import OrderList from "./components/OrderList.jsx";
import Report from "./components/Report.jsx";
import { orderService } from "./services/orderService.js";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setError("");
      const res = await orderService.getAll();
      setOrders(res.data);
    } catch (e) {
      setError("❌ Không tải được dữ liệu. Kiểm tra VITE_API_URL trong .env");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreate = async (order) => {
    await orderService.create(order);
    await fetchOrders();
  };

  const handleNext = async (id, status) => {
    await orderService.update(id, { status });
    await fetchOrders();
  };

  const handlePay = async (id) => {
    await orderService.update(id, { status: "Đã thanh toán" });
    await fetchOrders();
  };

  const handleDelete = async (id) => {
    await orderService.delete(id);
    await fetchOrders();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* HEADER */}
      <header className="shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="https://tiximax.net" className="flex items-center space-x-2">
            <img
              src="//theme.hstatic.net/200000925715/1001388913/14/logo.png?v=283"
              alt="TIXIMAX LOGISTICS"
              className="h-10"
            />
            <span className="font-bold text-lg text-blue-600">
              Tiximax Logistics
            </span>
          </a>
          <nav className="hidden md:flex space-x-6">
            <span>🏆 Đấu giá</span>
            <span>🛒 Mua hộ</span>
            <span>🚚 Vận chuyển</span>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          📦 Hệ thống quản lý đơn hàng (MockAPI)
        </h2>

        {/* Form + Report */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Form */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <OrderForm onCreate={handleCreate} />
          </div>

          {/* Report */}
          <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <Report orders={orders} onRefresh={fetchOrders} />
          </div>
        </div>

        {/* Error + Loading */}
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {loading ? (
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-600">
            ⏳ Đang tải dữ liệu...
          </div>
        ) : (
          <OrderList
            orders={orders}
            onNextStatus={handleNext}
            onPay={handlePay}
            onDelete={handleDelete}
          />
        )}

        {/* Report
        <div className="mt-8">
          <Report orders={orders} onRefresh={fetchOrders} />
        </div> */}
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6 mt-8">
        <p className="text-2xl font-semibold">
          © {new Date().getFullYear()} Tiximax Logistics – Kết nối Mỹ, Hàn,
          Nhật, Indonesia ↔ Việt Nam
        </p>
        <p className="mt-2 text-lg italic">
          👨‍💻 Lập trình viên: <a href="https://www.facebook.com/angnguyenvuhoang.2025">Đặng Nguyễn Vũ Hoàng</a> 
        </p>
      </footer>
    </div>
  );
}
