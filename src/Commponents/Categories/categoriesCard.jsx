"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../redux/slice/favouriteslice";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function CategoriesCard({ data, route }) {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.items);

  // 🔹 State to track selected color & size per product
  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [selectedSizeMap, setSelectedSizeMap] = useState({});

  const toggleFavourite = (item) => {
    const exists = favourites.find((fav) => fav.id === item.id);
    if (exists) {
      dispatch(removeFromFavourite(item.id));
    } else {
      dispatch(addToFavourite(item));
    }
  };

  // 🔹 Handle color select
  const handleColorSelect = (productId, color) => {
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  // 🔹 Handle size select
  const handleSizeSelect = (productId, size) => {
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="bg-white py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:w-[90%] m-auto w-full max-w-[2000px] px-6">
        {Array.isArray(data) &&
          data.map((item) => {
            const isFav = favourites.some((fav) => fav.id === item.id);

            // ✅ Convert backend strings into arrays
            const sizes = item.size
              ? Array.isArray(item.size)
                ? item.size
                : item.size.split(",").map((s) => s.trim())
              : [];

            const colors = item.color
              ? Array.isArray(item.color)
                ? item.color
                : item.color.split(",").map((c) => c.trim())
              : [];

            const selectedColor = selectedColorMap[item.id] || null;
            const selectedSize = selectedSizeMap[item.id] || null;
            console.log("col", colors);

            return (
              <div
                key={item._id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="relative w-full bg-black group overflow-hidden">
                  {/* ❤️ Favourite Button */}
                  <button
                    onClick={() => toggleFavourite(item)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition border ${
                      isFav
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    <Heart size={20} strokeWidth={2} />
                  </button>

                  {/* 🖼️ Product Image */}
                  <Link href={`${route}/${item.id}`}>
                    <img
                      src={item.image || "/fallback.jpg"}
                      alt={item.product}
                      className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>

                  {/* 🛒 Hover Add to Cart */}
                  <div className="absolute bg-white bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl shadow-lg">
                    <button
                      className="flex items-center gap-2 bg-[#FF2020] cursor-pointer text-white font-medium px-4 lg:px-6 py-2 rounded-xl hover:bg-red-600 transition"
                      onClick={() =>
                        dispatch(
                          addItem({
                            ...item,
                            selectedColor,
                            selectedSize,
                          })
                        )
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

                {/* 📦 Product Info */}
                <div className="p-4 flex flex-col justify-between items-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-[#FF2020] transition">
                    <Link href={`${route}/${item.id}`}>
                      {item.product || "Unnamed Product"}
                    </Link>
                  </h3>

                  <p className="text-sm mt-1 text-gray-600">
                    Brand:{" "}
                    <span className="text-red-500">{item.brand || "N/A"}</span>
                  </p>

                  {colors?.length > 0 && (
                    <div className="mt-3 flex justify-center gap-2">
                      {colors?.map((clr, i) => (
                        <button
                          key={i}
                          onClick={() => handleColorSelect(item.id, clr)}
                          className={`w-6 h-6 rounded-full border-2 ${
                            selectedColor === clr
                              ? "border-red-500 scale-110"
                              : "border-gray-300"
                          } transition`}
                          style={{ backgroundColor: clr }}
                        ></button>
                      ))}
                    </div>
                  )}

                  {sizes.length > 0 && (
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {sizes.map((size, i) => (
                        <button
                          key={i}
                          onClick={() => handleSizeSelect(item.id, size)}
                          className={`px-3 py-1 rounded-md border text-sm ${
                            selectedSize === size
                              ? "bg-red-500 text-white border-red-500"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-lg font-bold text-gray-900">
                    ${item.price}
                  </p>

                  <button
                    className="mt-4 w-full lg:hidden text-white bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition duration-300 shadow-sm"
                    disabled={
                      (colors.length > 0 && !selectedColor) ||
                      (sizes.length > 0 && !selectedSize)
                    }
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
}
