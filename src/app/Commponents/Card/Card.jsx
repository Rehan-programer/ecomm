"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../redux/slice/favouriteslice";

import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

const Card = ({ filteredData, scrollRef , route  }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.items);

  const toggleFavourite = (item) => {
    const exists = favourites.find((fav) => fav.id === item.id);
    if (exists) {
      dispatch(removeFromFavourite(item.id));
    } else {
      dispatch(addToFavourite(item));
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-8"
    >
      {filteredData.map((item) => {
        const isFav = favourites.some((fav) => fav.id === item.id);
        return (
          <div
            key={item.id}
            className="relative bg-white duration-300 flex-shrink-0 w-[280px] md:w-[320px] lg:w-[320px]"
          >
            <div className="overflow-hidden relative">
              <button
                onClick={() => toggleFavourite(item)}
                className={`absolute top-3 right-3 cursor-pointer z-10 p-2 rounded-full shadow-md transition border ${
                  isFav
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                <Heart
                  size={24}
                  strokeWidth={2}
                />
              </button>

              <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover bg-center transition-transform duration-500 group-hover:scale-110 hover:cursor-pointer"
                />
                <div className="absolute bottom-4 cursor-pointer left-1/2 -translate-x-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    className="flex items-center gap-2 bg-[#FF2020] cursor-pointer text-white font-medium px-5 py-2 shadow-md hover:bg-red-600 transition"
                    onClick={() => dispatch(addItem(item))}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>

               <div className="p-4 flex flex-col justify-between items-center bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-[#FF2020] transition">
                  <Link href={`/${route}/${item.id}`}>{item.title}</Link>
                </h3>
                {/* <p className="text-gray-500 text-center text-sm mt-2">
                  {item.description.slice(0, 90)}...
                </p> */}
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Size: <span className="text-red-500">{item.size}</span>
                </p>
                <p className="text-gray-500 text-center text-sm mt-2">
                  {item.description?.slice(0, 100)}...
                </p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  ${item.price}
                </p>
                <button
                  className="mt-4 w-full lg:hidden text-white bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition duration-300 shadow-sm"
                  onClick={() => dispatch(addItem(item))}
                >
                  Add To Cart
                </button>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
