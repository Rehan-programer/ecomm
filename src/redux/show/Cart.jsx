"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  decreaseQuantity,
  addItem,
  clearCart,
} from "../slice/cartslice";

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
    <div className="   mx-auto">
      <div className="text-black flex border-b justify-between  m-auto  max-w-7xl">
        <div className=" flex w-[36%] bprd justify-between">
          <h6>product</h6>
          <h6>price</h6>
        </div>
        <div>
          <h6>quantity</h6>
        </div>
      </div>
      <div className=" max-w-7xl m-auto ">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-black py-4  gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className=" ">
              <h4 className="font-medium text-gray-800">{item.title}</h4>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="bg-black px-3 py-1 rounded hover:bg-gray-300"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                −
              </button>
              <span className="min-w-[20px] text-black text-center">
                {item.quantity}
              </span>
              <button
                className="bg-black px-3 py-1 rounded hover:bg-gray-300"
                onClick={() => dispatch(addItem(item))}
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="text-black bg-red-500 px-2 py-2 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-between text-black items-center mt-6 text-lg font-semibold">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
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
