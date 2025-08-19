import axios from 'axios'

// Sử dụng biến môi trường cho API, fallback là chuỗi ví dụ.
const API_URL = import.meta.env.VITE_API_URL || 'https://668b17372c68eaf3211e992d.mockapi.io/orders'

export const orderService = {
  getAll: () => axios.get(API_URL),
  create: (order) => axios.post(API_URL, order),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/${id}`)
}
