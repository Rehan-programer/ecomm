"use client";
import { useEffect, useState } from "react";

export default function PendingOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders?status=Pending")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-4 md:mb-6">
        Pending Orders
      </h1>
      <OrdersTable orders={orders} />
    </div>
  );
}

function OrdersTable({ orders }) {
  if (!orders.length)
    return <p className="text-gray-500">No pending orders.</p>;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 md:p-2 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Desktop / Tablet Table */}
          <div className="hidden md:block">
            <table className="min-w-full border text-left table-auto">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Customer</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.Customer}</td>
                  <td className="p-2 border">${order.total_amount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-1">
            <p>
              <strong>ID:</strong> {order.id}
            </p>
            <p>
              <strong>Customer:</strong> {order.Customer}
            </p>
            <p>
              <strong>Amount:</strong> ${order.total_amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
