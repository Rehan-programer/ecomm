"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../../../redux/slice/favouriteslice"; // ✅ sahi import
import { Heart } from "lucide-react";

const Favourite = () => {
  const favourites = useSelector((state) => state.favourite.items);
  const dispatch = useDispatch();

  if (favourites.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No Favourites Added</p>
    );
  }

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {favourites.map((item) => (
        <div
          key={item.id}
          className="relative bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 object-cover"
          />

          <div className="p-4 text-center space-y-2">
            <h3 className="text-base font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-lg font-bold text-gray-700">${item.price}</p>
          </div>

          <button
            onClick={() => dispatch(removeFromFavourite(item.id))} // ✅ updated
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
