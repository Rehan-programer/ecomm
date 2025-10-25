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
    return (
      <div className="p-10 text-center text-gray-600">
        Loading your orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="p-10 text-center text-gray-600">
        You haven&apos;t placed any orders yet.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        My Orders
      </h1>

      {/* ---------- Desktop Table ---------- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border text-sm font-semibold">Order ID</th>
              <th className="p-3 border text-sm font-semibold">Total</th>
              <th className="p-3 border text-sm font-semibold">Payment</th>
              <th className="p-3 border text-sm font-semibold">Status</th>
              <th className="p-3 border text-sm font-semibold">Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 border text-gray-800">{order.id}</td>
                <td className="p-3 border text-gray-800">
                  ${order.totalAmount}
                </td>
                <td className="p-3 border text-gray-800">
                  {order.paymentMethod}
                </td>
                <td
                  className={`p-3 border font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-3 border text-gray-800">
                  {new Date(order.placedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards ---------- */}
      <div className="md:hidden flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white"
          >
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Order ID:</span>
                <span className="text-gray-800">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Total:</span>
                <span className="text-gray-800">${order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Payment:</span>
                <span className="text-gray-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Status:</span>
                <span
                  className={`font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Placed At:</span>
                <span className="text-gray-800">
                  {new Date(order.placedAt).toLocaleDateString()}{" "}
                  {new Date(order.placedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
