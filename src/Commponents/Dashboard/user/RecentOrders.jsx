"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const RecentOrders = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // modal order

  useEffect(() => {
    if (!currentUser) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders?userId=${currentUser._id}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex justify-between items-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-5  w-[90%] text-sm text-gray-700">
              <p className="font-medium">ID: {order._id}</p>
              <p>Total: ₹{order.totalAmount}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p
                className={`font-medium ${
                  order.status === "Pending"
                    ? "text-yellow-600"
                    : order.status === "Completed"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </p>
              <p>Placed: {new Date(order.placedAt).toLocaleDateString()}</p>
            </div>

            <button
              className=" text-[14px] text-black hover:underline "
              onClick={() => setSelectedOrder(order)}
            >
              View More 
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg overflow-y-auto max-h-[80vh] relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedOrder(null)}
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order ID: {selectedOrder._id}
              </h3>
              <div className="mb-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Total:</span> ₹{selectedOrder.totalAmount}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Payment:</span> {selectedOrder.paymentMethod}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Status:</span>{" "}
                  <span
                    className={`font-medium ${
                      selectedOrder.status === "Pending"
                        ? "text-yellow-600"
                        : selectedOrder.status === "Completed"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="text-gray-500">Placed: {new Date(selectedOrder.placedAt).toLocaleDateString()}</p>
              </div>

              <h4 className="font-semibold text-gray-800 mb-3">Ordered Items:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md flex flex-col justify-between transition"
                  >
                    <p className="font-medium text-gray-800 text-lg">{item.productName}</p>
                    <p className="text-gray-500 text-sm mt-1">Brand: {item.brand}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Price: ₹{item.price} × {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <span>Size: {item.size}</span>
                      <span>Color: 
                        <span
                          style={{
                            backgroundColor: item.color,
                            display: "inline-block",
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            marginLeft: 5,
                            border: "1px solid #ccc"
                          }}
                        ></span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
