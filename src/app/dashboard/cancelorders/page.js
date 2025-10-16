"use client";
import { useEffect, useState } from "react";

export default function CancelOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders?status=Cancelled")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Cancelled Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}

function OrdersTable({ orders }) {
  if (!orders.length)
    return <p className="text-black">No cancelled orders.</p>;

  return (
    <table className="min-w-full border text-left">
      <thead className="bg-red-100">
        <tr className="text-black">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Customer</th>
          <th className="p-2 border">Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="text-black">
            <td className="p-2 border">{order.id}</td>
            <td className="p-2 border">{order.Customer}</td>
            <td className="p-2 border">${order.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
