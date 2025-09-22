"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  removeItem,
  decreaseQuantity,
  addItem,
  clearCart,
} from "../../../redux/slice/cartslice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className=" bg-white text-center py-20 text-gray-600 text-lg">
        Your cart is empty.
      </div>
    );

  return (
    <div className="mx-auto py-4 px-2">
      <div className="text-black hidden md:flex border-b m-auto max-w-7xl py-2 px-2">
        <div className="flex w-[62%] justify-between">
          <h6>Product</h6>
          <h6>Price</h6>
        </div>
        <div className="w-[31%]  flex items-center justify-center">
          <h6>Quantity</h6>
        </div>
      </div>

      <div className="max-w-7xl m-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center justify-between border-b border-black py-4 gap-4"
          >
            <div className="flex items-center gap-4 w-full md:w-[45%]">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <p className="font-medium text-gray-800">{item.name}</p>
            </div>

            <div className="text-gray-600 w-full md:w-auto text-left md:text-center">
              ${item.price}
            </div>

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
                className="text-white bg-red-500 px-3 py-2 rounded hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row justify-between text-black items-center mt-6 text-lg font-semibold gap-4">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
          <Link href="/check-out" className="w-full md:w-auto">
            <button className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition">
              Proceed to Checkout
            </button>
          </Link>

          <button
            className="w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
