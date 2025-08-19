import React, { useMemo, useState } from 'react'

const nextMap = {
  'Chờ xử lý': 'Đang giao',
  'Đang giao': 'Đã thanh toán',
  'Đã thanh toán': 'Hoàn tất',
  'Hoàn tất': 'Hoàn tất'
}

function Badge({ status }) {
  const colors = {
    'Chờ xử lý': 'bg-blue-100 text-blue-600 border-blue-400',
    'Đang giao': 'bg-yellow-100 text-yellow-600 border-yellow-400',
    'Đã thanh toán': 'bg-green-100 text-green-600 border-green-400',
    'Hoàn tất': 'bg-purple-100 text-purple-600 border-purple-400'
  }
  return (
    <span
      className={`px-3 py-1 text-base rounded border ${
        colors[status] || 'bg-gray-100 text-gray-500 border-gray-400'
      }`}
    >
      {status}
    </span>
  )
}

export default function OrderList({ orders, onNextStatus, onPay, onDelete }) {
  const [status, setStatus] = useState('Tất cả')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return orders.filter(
      (o) =>
        (status === 'Tất cả' || o.status === status) &&
        (`${o.customer} ${o.product}`
          .toLowerCase()
          .includes(q.toLowerCase()) ||
          `${o.id || ''}`.includes(q))
    )
  }, [orders, status, q])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          📋 Danh sách đơn hàng
        </h3>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            placeholder="🔍 Tìm theo khách/sản phẩm..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Tất cả</option>
            <option>Chờ xử lý</option>
            <option>Đang giao</option>
            <option>Đã thanh toán</option>
            <option>Hoàn tất</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-500 text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 border">Khách</th>
              <th className="px-6 py-3 border">Sản phẩm</th>
              <th className="px-6 py-3 border">Giá</th>
              <th className="px-6 py-3 border">Trạng thái</th>
              <th className="px-6 py-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-200 text-gray-800">
                <td className="px-6 py-3 border">{o.customer}</td>
                <td className="px-6 py-3 border">{o.product}</td>
                <td className="px-6 py-3 border">
                  {Number(o.price).toLocaleString('vi-VN')} VND
                </td>
                <td className="px-6 py-3 border">
                  <Badge status={o.status} />
                </td>
                <td className="px-6 py-3 border flex flex-wrap gap-2">
                  {o.status !== 'Hoàn tất' && (
                    <button
                      onClick={() => onNextStatus(o.id, nextMap[o.status])}
                      className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Chuyển: {nextMap[o.status]}
                    </button>
                  )}
                  {o.status !== 'Đã thanh toán' && o.status !== 'Hoàn tất' && (
                    <button
                      className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
                      onClick={() => onPay(o.id)}
                    >
                      💳 Thanh toán
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(o.id)}
                    className="px-4 py-2 rounded text-sm border border-red-500 text-red-500 hover:bg-red-50 transition"
                  >
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-400 text-lg"
                >
                  Không có đơn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
