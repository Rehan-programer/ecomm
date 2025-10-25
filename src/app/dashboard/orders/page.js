"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  fetchOrderItems,
  selectOrder,
  clearOrder,
  updateOrderStatus,
} from "../../../redux/slice/orderslice";

const Orders = () => {
  const { orders, selectedOrder, orderItems, status } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (selectedOrder?.id) {
      dispatch(fetchOrderItems(selectedOrder.id));
    }
  }, [dispatch, selectedOrder]);

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
    return (
      <div className="p-10 text-center text-gray-600">Loading orders...</div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        No orders placed yet.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
        All Orders
      </h1>

      {/* Orders List */}
      {!selectedOrder && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-md p-4 md:p-2 md:overflow-x-auto"
            >
              {/* Desktop & Tablet Table */}
              <div className="hidden md:block">
                <table className="min-w-full border text-left table-auto">
                  <thead className="bg-gray-100 text-black">
                    <tr>
                      <th className="p-2 text-black border">Order ID</th>
                      <th className="p-2 text-black border">Customer</th>
                      <th className="p-2 text-black border">Total</th>
                      <th className="p-2 text-black border">Payment</th>
                      <th className="p-2 text-black border">Status</th>
                      <th className="p-2 text-black border">Placed At</th>
                      <th className="p-2 text-black border text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border text-black">{order.id}</td>
                      <td className="p-2 border text-black">{order.customer}</td>
                      <td className="p-2 border text-black">${order.totalAmount}</td>
                      <td className="p-2 border text-black">{order.paymentMethod}</td>
                      <td className={`p-2 border font-semibold ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}>{order.status}</td>
                      <td className="p-2 border text-black">{new Date(order.placedAt).toLocaleString()}</td>
                      <td className="p-2 border text-black text-center space-x-2">
                        <button
                          onClick={() => dispatch(selectOrder(order))}
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

              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-1">
                <p className="text-black"><strong>Order ID:</strong> {order.id}</p>
                <p className="text-black"><strong>Customer:</strong> {order.customer}</p>
                <p className="text-black"><strong>Total:</strong> ${order.totalAmount}</p>
                <p className="text-black"><strong>Payment:</strong> {order.paymentMethod}</p>
                <p className="text-black">
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}>{order.status}</span>
                </p>
                <p className="text-black"><strong>Placed At:</strong> {new Date(order.placedAt).toLocaleString()}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => dispatch(selectOrder(order))}
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
      )}

      {/* Single Order Details (same as before) */}
      {selectedOrder && (
        <div className="mt-6 md:mt-10">
          <button
            onClick={() => dispatch(clearOrder())}
            className="mb-2 md:mb-4 text-sm md:text-base text-blue-600 hover:underline"
          >
            ← Back to Orders
          </button>

          <h2 className="text-xl md:text-2xl text-black font-semibold mb-4">
            Order #{selectedOrder.id} Details
          </h2>

          <div className="space-y-2 mb-4 md:mb-6 text-black text-sm md:text-base">
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`font-semibold ${
                  selectedOrder.status === "Completed"
                    ? "text-green-600"
                    : selectedOrder.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p><strong>Placed At:</strong> {selectedOrder["Placed At"]}</p>
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-black mb-2 md:mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-black">Product</th>
                  <th className="p-2 border text-black">Price</th>
                  <th className="p-2 border text-black">Qty</th>
                  <th className="p-2 border text-black">Color</th>
                  <th className="p-2 border text-black">Size</th>
                </tr>
              </thead>
              <tbody>
                {(orderItems || []).map((item) => (
                  <tr key={item._id}>
                    <td className="p-2 border text-black">{item.productName}</td>
                    <td className="p-2 border text-black">${item.price}</td>
                    <td className="p-2 border text-black">{item.quantity}</td>
                    <td className="p-2 border text-black">{item.color}</td>
                    <td className="p-2 border text-black">{item.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
