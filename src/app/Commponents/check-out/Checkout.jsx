"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slice/cartslice";

const Checkout = () => {
  const cartItems = useSelector(({ cart }) => cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  const total = cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  const handleChange = ({ target: { name, value } }) => setForm((f) => ({ ...f, [name]: value }));

  const placeOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(clearCart());
    alert("Order placed successfully!");
    window.location.href = "/";
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-[#F3EAD8] rounded shadow text-center text-gray-600 py-20">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F3EAD8] mt-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-black">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Shipping Information</h3>
          {["name", "address", "phone"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field === "name" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-black text-black p-3 rounded mb-4"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Order Summary</h3>
          <ul className="divide-y divide-gray-200 mb-6 max-h-96 overflow-y-auto text-black">
            {cartItems.map(({ id, title, image, price,name, quantity }) => (
              <li key={id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-700">Qty: {quantity}</p>
                  </div>
                </div>
                <span>${(price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-black text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={placeOrder}
          className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
