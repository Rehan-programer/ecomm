"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../../../redux/slice/orderslice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      dispatch(fetchUserOrders(user._id));
    }
  }, [dispatch]);

  if (status === "loading") {
    return <div className="p-10 text-center text-gray-600">Loading your orders...</div>;
  }

  if (!orders.length) {
    return <div className="p-10 text-center text-gray-600">You haven't placed any orders yet.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-2 border text-black">{order.id}</td>
                <td className="p-2 border text-black">${order.totalAmount}</td>
                <td className="p-2 border text-black">{order.paymentMethod}</td>
                <td
                  className={`p-2 border font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-2 border text-black">
                  {new Date(order.placedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
