"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  decreaseQuantity,
  addItem,
  clearCart,
} from "../../redux/slice/cartslice";
import Checkout from "../check-out/Checkout";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showSummary, setShowSummary] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (checkout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [checkout]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );
  const subtotal = totalPrice;
  const servicefee = 150;
  const tax = 6.0;
  const totalpayable = subtotal + servicefee + tax;

  const handleCheckout = () => {
    if (window.innerWidth < 1024) {
      router.push("/check-out");
    } else {
      setCheckout(true);
    }
  };

  if (cartItems.length === 0)
    return (
      <div className=" bg-white text-center py-20 text-gray-600 text-lg">
        Your cart is empty.
      </div>
    );

  return (
    <section className="py-10 m-auto">
      <div className="container flex flex-col lg:flex-row w-[90%] justify-between m-auto items-start">
        {/* Cart Items */}
        <div className="w-full lg:w-[68%] p-4 rounded-md bg-white shadow-lg items-start">
          <div className="py-4 px-2">
            <div className="text-black hidden md:flex border-b border-black/10 pb-4 px-2">
              <div className="flex font-bold w-full items-center justify-between">
                <h6>My Cart ({cartItems.length}) </h6>
                <button
                  className="w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="m-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b border-black/10 py-4 gap-4"
                >
                  <div className="flex items-center gap-16 w-full md:w-[45%] lg:w-[85%]">
                    <img
                      src={item.Image}
                      alt={item.Product}
                      className="w-30 h-30 object-cover rounded"
                    />
                    <div className="flex-col items-center justify-start">
                      <h6 className="font-bold text-gray-800">{item.Title}</h6>
                      <div className="text-gray-600 text-left">
                        <span className="text-black font-bold">Brand:</span>{" "}
                        {item.Brand}
                      </div>
                      <div className="text-gray-600 text-left">
                        <span className="text-black font-bold">Color:</span>{" "}
                        {item.selectedColor ? (
                          <span
                            className="inline-block w-5 h-5 rounded-full border border-gray-400 ml-2 align-middle"
                            style={{ backgroundColor: item.selectedColor }}
                          ></span>
                        ) : (
                          "N/A"
                        )}
                      </div>

                      <div className="text-gray-600 text-left">
                        <span className="text-black font-bold">Size:</span>{" "}
                        {item.selectedSize || "N/A"}
                      </div>

                      <div className="text-gray-600 text-left">
                        <span className="text-black font-bold">Price:</span> $
                        {item.Price}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                      <button
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        −
                      </button>
                      <span className="min-w-[20px] text-black text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => dispatch(addItem(item))}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-full md:w-auto mt-2 md:mt-0 text-right">
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-red-500 px-3 py-2 rounded hover:underline text-sm"
                      >
                        X Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden mt-6">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
              >
                {showSummary ? "Hide Order Summary" : "Show Order Summary"}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`rounded-md sticky top-22 h-auto w-full lg:w-[30%] mt-6 lg:mt-0 transition-all duration-300 ${
            showSummary ? "block" : "hidden lg:block"
          }`}
        >
          <div className="w-full">
            <div className="mb-5 shadow-lg">
              <div className="p-4 flex bg-white rounded-md justify-center">
                <div className="space-y-2 flex flex-col w-full">
                  <h6 className="font-semibold text-gray-700">Coupons</h6>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                      APPLY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h6 className="font-semibold text-gray-700 pb-4 border-b border-black/10">
                Your Order
              </h6>
              <div className="flex justify-between text-gray-600 p-4 px-0 border-b border-black/10">
                <span>Subtotal ({cartItems.length})</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600 p-4 px-0 border-b border-black/10">
                <span>Service Fee</span>
                <span>${servicefee}</span>
              </div>

              <div className="flex justify-between text-gray-600 p-4 px-0 border-b border-black/10">
                <span>Tax</span>
                <span>${tax}</span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-2 p-4 px-0 border-b text-black border-black/10">
                <span>Total Payable</span>
                <span>${totalpayable}</span>
              </div>

              <div className="w-full md:w-auto p-4 px-0">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          {checkout && (
            <div className="fixed inset-0 top-18 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setCheckout(false)}
              >
                <button
                  onClick={() => setCheckout(false)}
                  className="absolute text-white bg-red-500 py-2 px-3 rounded-full top-3 z-100 right-18 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <div className="relative bg-white rounded-lg shadow-lg md:w-[90%] lg:w-[60%]  overflow-hidden z-50 overflow-y-auto ">
                <Checkout />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
