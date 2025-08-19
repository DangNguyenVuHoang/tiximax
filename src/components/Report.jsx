import React, { useEffect, useState } from 'react'

export default function Report({ orders, onRefresh }){
  const [time, setTime] = useState(new Date())

  useEffect(()=>{
    const t = setInterval(()=>{
      setTime(new Date())
      onRefresh && onRefresh() // poll để trông như real-time
    }, 10000)
    return ()=>clearInterval(t)
  },[])

  const total = orders.length
  const done = orders.filter(o=>o.status==='Hoàn tất').length
  const paidRevenue = orders
    .filter(o=>o.status==='Đã thanh toán' || o.status==='Hoàn tất')
    .reduce((s,o)=>s+Number(o.price||0),0)

  return (
    <div className="card">
      <h3>📊 Báo cáo thời gian thực</h3>
      <div className="row">
        <div>⏰ Cập nhật: {time.toLocaleTimeString()}</div>
        <div>🧾 Tổng đơn: <b>{total}</b></div>
        <div>✅ Hoàn tất: <b>{done}</b></div>
        <div>💵 Doanh thu đã thu: <b>{paidRevenue.toLocaleString('vi-VN')}</b> VND</div>
      </div>
      <footer>Mỗi 10 giây tự refresh dữ liệu từ MockAPI.</footer>
    </div>
  )
}
