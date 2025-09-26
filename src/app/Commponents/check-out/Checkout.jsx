"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slice/cartslice";

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
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  const handleChange = ({ target }) => {
    setForm((p) => ({ ...p, [target?.name]: target?.value }));
  };

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
      <div className="max-w-4xl mx-auto  bg-[#F3EAD8] rounded shadow text-center text-gray-600 ">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-[2000px] py-8 px-4 md:px-0  md:py-4  mx-auto   lg:px-10  bg-white rounded-2xl shadow-lg ">
      <h2 className="text-3xl font-bold mb-4 text-center border-b pb-4 text-black/80">
        Checkout
      </h2>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 md:gap-4 lg:gap-10">
    
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Shipping Information
          </h3>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-red-500 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block text-sm font-bold text-red-500 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block text-sm font-bold text-red-500 mb-2"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-bold text-red-500 mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

      
        <div className="bg-gray-50 flex flex-col justify-between p-6 rounded-xl border border-gray-200">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Order Summary
            </h3>
            <ul className="divide-y divide-gray-200 mb-6 max-h-80 overflow-y-auto pr-2 scrollbar-hide">
              {cartItems.map(({ id, title, image, price, name, quantity }) => (
                <li key={id} className="flex items-center  justify-between py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={image}
                      alt={title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{name}</p>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-900">
                        <span className="font-bold">Qty:</span> {quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium lg:mt-2 mt-10  text-gray-800">
                    ${(price * quantity).toFixed(2)}
                  </span>
                </li>
              ))}
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
