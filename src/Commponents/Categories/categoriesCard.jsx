"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../redux/slice/favouriteslice";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesCard({ data, route }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user?.currentUser);
  const favourites = useSelector((state) => state.favourite.items);

  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [selectedSizeMap, setSelectedSizeMap] = useState({});

  // ✅ FIX: Correct toggle logic
  const toggleFavourite = (item) => {
    const exists = favourites.find((fav) => fav._id === item._id);
    if (exists) dispatch(removeFromFavourite(item)); // pass full item
    else dispatch(addToFavourite(item));
  };

  const handleColorSelect = (productId, color) => {
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (item) => {
    const selectedColor = selectedColorMap[item._id] || null;
    const selectedSize = selectedSizeMap[item._id] || null;

    if (!user) {
      router.push("/auth");
      return;
    }

    dispatch(
      addItem({
        ...item,
        selectedColor,
        selectedSize,
      })
    );
  };

  return (
    <div className="bg-white py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:w-[90%] m-auto w-full max-w-[2000px] px-6">
        {Array.isArray(data) &&
          data.map((item) => {
            // ✅ FIX: Use _id, not id
            const isFav = favourites.some((fav) => fav._id === item._id);

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

            const selectedColor = selectedColorMap[item._id] || null;
            const selectedSize = selectedSizeMap[item._id] || null;

            return (
              <div
                key={item._id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="relative w-full bg-black group overflow-hidden">
                  {/* ✅ FIX: Toggle works properly per item */}
                  <button
                    onClick={() => toggleFavourite(item)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition border ${
                      isFav
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    <Heart
                      size={20}
                      strokeWidth={2}
                      className={`${isFav ? "fill-white" : ""}`}
                    />
                  </button>

                  <Link href={`${route}/${item._id}`}>
                    <img
                      src={item.image || "/fallback.jpg"}
                      alt={item.title}
                      className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex lg:flex">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 bg-[#FF2020] cursor-pointer text-white font-medium px-2 py-2 shadow-md hover:bg-red-600 transition disabled:opacity-50"
                      disabled={
                        (colors.length > 0 && !selectedColor) ||
                        (sizes.length > 0 && !selectedSize)
                      }
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between items-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-[#FF2020] transition">
                    <Link href={`${route}/${item._id}`}>
                      {item.title || "Unnamed Product"}
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
                          onClick={() => handleColorSelect(item._id, clr)}
                          className={`w-6 h-6 rounded-full border-2 cursor-pointer transition ${
                            selectedColor === clr
                              ? "border-red-500 scale-110"
                              : "border-gray-300"
                          }`}
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
                          onClick={() => handleSizeSelect(item._id, size)}
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

                  <div className="flex justify-center mt-3 md:hidden">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 bg-[#FF2020] text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                      disabled={
                        (colors.length > 0 && !selectedColor) ||
                        (sizes.length > 0 && !selectedSize)
                      }
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
