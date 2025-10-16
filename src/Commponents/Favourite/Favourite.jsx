"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../../redux/slice/favouriteslice";
import { addItem } from "../../redux/slice/cartslice";
import { Heart, ShoppingCart } from "lucide-react";

const Favourite = () => {
  const favourites = useSelector((state) => state.favourite.items);
  const dispatch = useDispatch();

  if (favourites.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No Favourites Added</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {favourites.map((item) => (
        <div
          key={item.id}
          className="relative bg-white shadow-md rounded-lg overflow-hidden group"
        >
          <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex lg:flex">
              <button
                onClick={() => dispatch(addItem(item))}
                className="flex items-center gap-2 bg-[#FF2020] text-white font-medium px-5 py-2 shadow-md hover:bg-red-600 transition"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
          <div className="p-4 text-center space-y-2">
            <h3 className="text-base font-semibold text-gray-800 md:hidden">
              {item.name}
            </h3>
            <h3 className="text-lg hidden md:block font-bold text-gray-700">${item.name}</h3>
            <p className="text-lg font-bold text-gray-700">${item.price}</p>
            <div className="flex justify-center mt-3 md:hidden">
              <button
                onClick={() => dispatch(addItem(item))}
                className="flex items-center gap-2 bg-[#FF2020] text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeFromFavourite(item.id))}
            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
          >
            <Heart size={18} fill="white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favourite;
