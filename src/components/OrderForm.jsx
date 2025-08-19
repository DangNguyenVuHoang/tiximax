import React, { useState } from "react";

export default function OrderForm({ onCreate }) {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState(null); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Validate
    if (!customer.trim()) {
      setError("⚠️ Vui lòng nhập tên khách hàng");
      return;
    }
    if (!product.trim()) {
      setError("⚠️ Vui lòng nhập sản phẩm");
      return;
    }
    if (!price || Number(price) <= 0) {
      setError("⚠️ Giá phải lớn hơn 0");
      return;
    }

    try {
      await onCreate({
        customer,
        product,
        price: Number(price),
        status: "Chờ xử lý",
      });
      setMessage("✅ Tạo đơn hàng thành công!");
      setCustomer("");
      setProduct("");
      setPrice("");

      // Ẩn thông báo sau 3 giây
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError("❌ Không thể tạo đơn hàng. Vui lòng thử lại.");
      setTimeout(() => setError(null), 3000); // ẩn luôn lỗi sau 3s
    }
  };

  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-2">➕ Tạo đơn hàng</h3>
      <form onSubmit={handleSubmit} className="controls space-y-2">
        <input
          placeholder="Tên khách hàng"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <input
          placeholder="Sản phẩm"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <input
          type="number"
          placeholder="Giá (VND)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <button
          className="primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Tạo đơn
        </button>
      </form>

      {/* Hiển thị thông báo */}
      {message && (
        <p className="mt-3 text-green-600 font-medium animate-fade">{message}</p>
      )}
      {error && (
        <p className="mt-3 text-red-600 font-medium animate-fade">{error}</p>
      )}
    </div>
  );
}
