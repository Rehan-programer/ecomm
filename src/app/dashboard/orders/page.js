"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  selectOrder,
  updateOrderStatus,
} from "../../../redux/slice/orderslice";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { orders, status } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => {
        dispatch(fetchOrders());
        alert(`✅ Order ${newStatus} successfully!`);
      })
      .catch(() => alert("❌ Failed to update order"));
  };

  if (status === "loading") {
    return <div className="p-10 text-center text-gray-600">Loading orders...</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="p-10 text-center text-gray-600">No orders placed yet.</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
        All Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-md p-4 md:p-2 md:overflow-x-auto"
          >
            {/* 💻 Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full border text-left table-auto">
                <thead className="bg-gray-100 text-black">
                  <tr>
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Customer</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Payment</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Placed At</th>
                    <th className="p-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border text-black">{order.id}</td>
                    <td className="p-2 border text-black">{order.customer}</td>
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
                    <td className="p-2 border text-center space-x-2">
                      <button
                        onClick={() => router.push(`orders/${order.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      {order.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, "Completed")
                            }
                            className="text-green-600 hover:underline"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(order.id, "Cancelled")
                            }
                            className="text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 📱 Mobile Card Layout */}
            <div className="md:hidden flex flex-col justify-between space-y-1">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Customer:</strong> {order.customer}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p>
                <strong>Status:</strong>{" "}
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
              </p>
              <p>
                <strong>Placed At:</strong>{" "}
                {new Date(order.placedAt).toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => router.push(`/orders/${order.id}`)}


                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
                {order.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order.id, "Completed")}
                      className="text-green-600 hover:underline"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, "Cancelled")}
                      className="text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
