"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RecentOrders = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
const fetchOrders = async () => {
  try {
    setLoading(true);
    const res = await fetch(`/api/orders?userId=${currentUser._id}`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    console.log("Fetched Orders:", data); // ✅ Add this for debugging
    setOrders(data || []); // ✅ not data.orders
  } catch (err) {
    console.error("Order fetch error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    fetchOrders();
  }, [currentUser]);

  if (!currentUser)
    return <p className="text-red-500">Please log in to see your orders.</p>;
  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-4 mb-6 bg-gray-50 shadow-sm hover:shadow-md transition"
        >
          {/* Order Header */}
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Order ID:</span>{" "}
                {order._id}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Customer:</span>{" "}
                {order.customer}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Phone:</span>{" "}
                {order.phone}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Address:</span>{" "}
                {order.address}
              </p>
            </div>

            <div className="text-sm mt-3 md:mt-0">
              <p>
                <span className="font-medium text-gray-800">Total:</span> ₹
                {order.totalAmount}
              </p>
              <p>
                <span className="font-medium text-gray-800">Payment:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium text-gray-800">Status:</span>{" "}
                <span
                  className={`font-medium ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-500">
                Placed On: {new Date(order.placedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-3">
            <h3 className="font-semibold text-gray-800 mb-2">Ordered Items:</h3>
            {order.items && order.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-3 bg-white flex flex-col justify-between"
                  >
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-gray-600 text-sm">Brand: {item.brand}</p>
                    <p className="text-gray-600 text-sm">
                      Price: ₹{item.price} × {item.quantity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Size: {item.size} | Color:{" "}
                      <span
                        style={{
                          backgroundColor: item.color,
                          display: "inline-block",
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                          marginLeft: 5,
                        }}
                      ></span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No items in this order.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
