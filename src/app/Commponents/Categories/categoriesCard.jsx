"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../redux/slice/favouriteslice";

import { Heart } from "lucide-react";

const CategoriesCard = ({ data }) => {
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
    <div className="bg-white" >
      <div className="flex    flex-wrap justify-center gap-6 mt-10  p-6">
        {data.map((item) => {
          const isFav = favourites.some((fav) => fav.id === item.id);

          return (
            <div
              key={item.id}
              className="relative flex-shrink-0  w-[100%] md:w-[30%] lg:w-[25%]"
            >
              <div className="relative w-full bg-black group overflow-hidden">
                <button
                  onClick={() => toggleFavourite(item)}
                  className={`absolute top-3 right-3 z-10 p-2 cursor-pointer rounded-full shadow-md transition border ${
                    isFav
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  <Heart
                    size={22}
                    strokeWidth={2}
                  />
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[480px] md:w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110 hover:cursor-pointer"
                />
                <div className="absolute bg-white bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    className="flex items-center gap-2 bg-[#FF2020] cursor-pointer text-white font-medium px-2 lg:px-5 py-2 shadow-md hover:bg-red-600 transition"
                    onClick={() => dispatch(addItem(item))}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className="p-3 flex flex-col justify-center items-center">
                <h3 className="text-sm font-semibold text-black hover:text-[#FF2020] transition">
                  {item.title}
                </h3>
                <p className="text-gray-500">${item.price}</p>
                <button
                  className="mt-3 text-white block lg:hidden bg-red-500 px-4 py-2 hover:bg-red-600 transition"
                  onClick={() => dispatch(addItem(item))}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesCard;
