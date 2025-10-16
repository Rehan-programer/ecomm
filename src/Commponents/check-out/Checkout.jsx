"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartslice";
// import { addOrder } from "../../redux/slice/orderslice";

const Checkout = () => {
  const cartItems = useSelector(({ cart }) => cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const total = cartItems.reduce(
    (sum, { Price, quantity }) => sum + Price * quantity,
    0
  );

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

const placeOrder = async () => {
  if (!form.name || !form.address || !form.phone) {
    alert("⚠️ Please fill all the fields before placing order");
    return;
  }

  // ✅ Match backend route.js structure exactly
  const orderData = {
    Customer: form.name,
    Address: form.address,
    Phone: form.phone,
    items: cartItems,
  };

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Order placed successfully!");
      console.log("✅ Order saved to DB:", data); 

      // 🟢 Update Redux
     
      dispatch(clearCart());
    } else {
      console.error("❌ Backend error:", data);
      alert("Failed to place order. Try again later!");
    }
  } catch (error) {
    console.error("❌ Error placing order:", error);
    alert("Something went wrong while placing order.");
  }
};


  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-[#F3EAD8] rounded shadow text-center text-gray-600">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] py-8 px-4 md:px-4 md:py-4 mx-auto lg:px-10 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center border-b pb-4 text-black/80">
        Checkout
      </h2>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 px-4 md:gap-4 lg:gap-10">
        {/* Left side - Shipping Info */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Shipping Information
          </h3>

          {["name", "email", "address", "phone"].map((field) => (
            <div className="mb-5" key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-bold text-red-500 mb-2"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                placeholder={`Enter your ${field}`}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
        </div>

        {/* Right side - Order Summary */}
        <div className="bg-gray-50 flex flex-col justify-between p-6 rounded-xl border border-gray-200">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Order Summary
            </h3>
            <ul className="divide-y divide-gray-200 mb-6 max-h-80 overflow-y-auto pr-2 scrollbar-hide">
              {cartItems.map(
                ({
                  id,
                  Title,
                  Image,
                  Price,
                  Brand,
                  selectedColor,
                  selectedSize,
                  quantity,
                }) => (
                  <li
                    key={id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={Image}
                        alt={Title}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{Title}</p>
                        <span className="font-medium text-gray-900 block">
                          Brand: {Brand}
                        </span>
                        <span className="font-medium text-gray-900 block">
                          Color: {selectedColor || "N/A"}
                        </span>
                        <span className="font-medium text-gray-900 block">
                          Size: {selectedSize || "N/A"}
                        </span>
                        <p className="text-sm text-gray-900">
                          <span className="font-bold">Qty:</span> {quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium lg:mt-2 mt-10 text-gray-800">
                      ${(Price * quantity).toFixed(2)}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex justify-between font-semibold text-lg text-gray-900 border-t pt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={placeOrder}
          className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition font-semibold shadow-md"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
