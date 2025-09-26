"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../redux/slice/favouriteslice";
import { Heart } from "lucide-react";
import Link from "next/link";

const CategoriesCard = ({ data, route }) => {
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
    <div className="bg-white">
      <div className=" grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:w-[90%] m-auto w-full max-w-[2000px]  justify-center gap-6 mt-10 p-6">
        {data.map((item) => {
          const isFav = favourites.some((fav) => fav.id === item.id);

          return (
            <div
              key={item.id}
              className="relative  w-[100%]"
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
                  <Heart size={22} strokeWidth={2} />
                </button>
                <Link href={`${route}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[480px] md:w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110 hover:cursor-pointer"
                  />
                </Link>

                <div className="absolute bg-white bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    className="flex items-center gap-2 bg-[#FF2020] cursor-pointer text-white font-medium px-2 lg:px-5 py-2 shadow-md hover:bg-red-600 transition"
                    onClick={() => dispatch(addItem(item))}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between items-center bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-[#FF2020] transition">
                  <Link href={`/${route}/${item.id}`}>{item.title}</Link>
                </h3>
                <p className="text-gray-500 text-center text-sm mt-2">
                  {item.description.slice(0, 90)}...
                </p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Size: <span className="text-red-500">{item.size}</span>
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
    </div>
  );
};

export default CategoriesCard;
