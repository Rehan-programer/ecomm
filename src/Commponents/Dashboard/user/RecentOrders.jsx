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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-y-auto max-h-[85vh] relative border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              onClick={() => setSelectedOrder(null)}
            >
              <X size={26} />
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Order ID:{" "}
                  <span className="text-blue-600">{selectedOrder.id}</span>
                </h3>
                <p className="text-gray-500 text-sm mt-2 sm:mt-0">
                  Placed on{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(selectedOrder.placedAt).toLocaleString()}
                  </span>
                </p>
              </div>

              {/* Order Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700 mb-8">
                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="font-semibold text-gray-800 mb-1">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{selectedOrder.totalAmount}
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="font-semibold text-gray-800 mb-1">
                    Payment Method
                  </p>
                  <p className="text-gray-700">{selectedOrder.paymentMethod}</p>
                </div>

                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="font-semibold text-gray-800 mb-1">Status</p>
                  <p
                    className={`font-semibold ${
                      selectedOrder.status === "Pending"
                        ? "text-yellow-600"
                        : selectedOrder.status === "Completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedOrder.status}
                  </p>
                </div>
              </div>

              {/* Ordered Items */}
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Ordered Items
              </h4>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item._id || item.productId}
                    className="flex flex-row items-start gap-4 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 hover:border-gray-300 p-4"
                  >
                    {/* Product Image (optional, only if available) */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                      {item.Image ? (
                        <img
                          src={item.Image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 leading-tight">
                          {item.productName}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Brand:{" "}
                          <span className="font-medium text-gray-700">
                            {item.brand || "N/A"}
                          </span>
                        </p>
                      </div>

                      <div className="mt-3 text-sm text-gray-700">
                        <p className="mb-1">
                          <span className="font-medium">Price:</span> ₹
                          {item.price} × {item.quantity}
                        </p>
                        <div className="flex items-center gap-4">
                          <span>
                            <span className="font-medium">Size:</span>{" "}
                            {item.size || "N/A"}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="font-medium">Color:</span>
                            <span
                              className="inline-block w-5 h-5 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
