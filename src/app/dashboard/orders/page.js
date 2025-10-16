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

  // 🔹 When selectedOrder changes, fetch its items
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>

      {/* 🔹 All Orders List */}
      {!selectedOrder && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Payment</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Placed At</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border text-black">{order.id}</td>
                  <td className="p-2 border text-black">{order.Customer}</td>
                  <td className="p-2 border text-black">
                    ${order.total_amount}
                  </td>
                  <td className="p-2 border text-black">
                    {order.payment_method}
                  </td>
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
                    {order["Placed At"]}
                  </td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Single Order Details */}
      {selectedOrder && (
        <div className="mt-10">
          <button
            onClick={() => dispatch(clearOrder())}
            className="mb-4 text-sm text-blue-600 hover:underline"
          >
            ← Back to Orders
          </button>

          <h2 className="text-2xl text-black font-semibold mb-4">
            Order #{selectedOrder.id} Details
          </h2>

          <div className="space-y-2 mb-6 text-black">
            <p>
              <strong>Customer:</strong> {selectedOrder.Customer}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.Phone}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
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
            <p>
              <strong>Placed At:</strong> {selectedOrder["Placed At"]}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-black mb-2">Order Items</h3>
          <table className="min-w-full border">
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
                <tr key={item.id}>
                  <td className="p-2 border text-black">{item.product_name}</td>
                  <td className="p-2 border text-black">${item.price}</td>
                  <td className="p-2 border text-black">{item.quantity}</td>
                  <td className="p-2 border text-black">{item.color}</td>
                  <td className="p-2 border text-black">{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
