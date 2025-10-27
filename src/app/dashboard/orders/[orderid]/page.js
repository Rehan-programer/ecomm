"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailsPage() {
  const { orderid } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderid}`);
        const data = await res.json();
        console.log("orderiddata", data);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderid]);

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading...</div>;

  if (!order)
    return <div className="p-6 text-center text-red-600">Order not found</div>;

  return (
    <div className="p-4 md:p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard/orders")}
        className="text-blue-600 hover:underline mb-4 inline-flex items-center"
      >
        ← Back to Orders
      </button>

      {/* Main Container */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Order
        </h2>

        {/* ✅ Customer Info Section */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Customer Information
        </h3>

        {/* Mobile & Tablet View */}
        <div className="lg:hidden space-y-3 text-gray-700">
          {[
            ["Customer", order.customer],
            ["Phone", order.phone],
            ["Address", order.address],
            ["Total", `$${order.totalAmount}`],
            ["Payment", order.paymentMethod],
            [
              "Status",
              <span
                key="status"
                className={`font-semibold ${
                  order.status === "Completed"
                    ? "text-green-600"
                    : order.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </span>,
            ],
            ["Placed At", new Date(order.placedAt).toLocaleString()],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="border-b border-gray-200 pb-2 flex justify-between text-gray-700"
            >
              <span className="font-semibold">{label}:</span>
              <span className="text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* ✅ Desktop Table View */}
        <div className="hidden lg:block mt-4">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Field
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="text-black">
              <tr className="border-b text-black">
                <td className="p-3 font-semibold">Customer</td>
                <td className="p-3">{order.customer}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Phone</td>
                <td className="p-3">{order.phone}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Address</td>
                <td className="p-3">{order.address}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Total</td>
                <td className="p-3">${order.totalAmount}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Payment</td>
                <td className="p-3">{order.paymentMethod}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Status</td>
                <td
                  className={`p-3 font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Placed At</td>
                <td className="p-3">
                  {new Date(order.placedAt).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ✅ Items Section */}
        <h3 className="text-xl font-semibold mt-10 mb-3 text-gray-800">
          Order Items
        </h3>

        {/* Table (Desktop) */}
        <div className="hidden lg:block">
          <table className="min-w-full border-collapse overflow-hidden rounded-lg shadow-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Product
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Price
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-gray-800 border-b">
                      {item.productName || "N/A"}
                    </td>
                    <td className="p-3 text-gray-800 border-b">
                      ${item.price}
                    </td>
                    <td className="p-3 text-gray-800 border-b">
                      {item.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-4 text-center text-gray-500 border-b"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4 mt-4">
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, i) => (
              <div
                key={i}
                className="border-b border-gray-200 pb-2 text-gray-700"
              >
                <p>
                  <span className="font-semibold">Product:</span>{" "}
                  {item.productName || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${item.price}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center border-t pt-4">
              No items found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
