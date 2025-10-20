"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../../redux/slice/favouriteslice";
import { addItem } from "../../redux/slice/cartslice";
import { Heart, ShoppingCart } from "lucide-react";

const Favourite = () => {
  const favourites = useSelector((state) => state.favourite.items);
  const dispatch = useDispatch();

  // ✅ color & size selection maps
  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [selectedSizeMap, setSelectedSizeMap] = useState({});

  const handleColorSelect = (productId, color) => {
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (item) => {
    const selectedColor = selectedColorMap[item._id] || null;
    const selectedSize = selectedSizeMap[item._id] || null;

    dispatch(
      addItem({
        ...item,
        selectedColor,
        selectedSize,
      })
    );
  };

  if (favourites.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No Favourites Added</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {favourites.map((item) => {
        const colors = item.color
          ? Array.isArray(item.color)
            ? item.color
            : item.color.split(",").map((c) => c.trim())
          : [];

        const sizes = item.size
          ? Array.isArray(item.size)
            ? item.size
            : item.size.split(",").map((s) => s.trim())
          : [];

        const selectedColor = selectedColorMap[item._id] || null;
        const selectedSize = selectedSizeMap[item._id] || null;

        return (
          <div
            key={item._id}
            className="relative bg-white shadow-md rounded-lg overflow-hidden group"
          >
            <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex lg:flex">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-2 bg-[#FF2020] text-white font-medium px-5 py-2 shadow-md hover:bg-red-600 transition disabled:opacity-50"
                  disabled={
                    (colors.length > 0 && !selectedColor) ||
                    (sizes.length > 0 && !selectedSize)
                  }
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>

            <div className="p-4 text-center space-y-3">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-base font-semibold text-gray-700">
                ${item.price}
              </p>

              {/* ✅ color selector */}
              {colors.length > 0 && (
                <div className="flex justify-center gap-2">
                  {colors.map((clr, i) => (
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

              {/* ✅ size selector */}
              {sizes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => handleSizeSelect(item._id, size)}
                      className={`px-3 py-1 rounded-md border text-sm transition ${
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

              {/* ✅ mobile button */}
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

            {/* ✅ remove favourite */}
            <button
              onClick={() => dispatch(removeFromFavourite(item))}
              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
            >
              <Heart size={18} fill="white" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Favourite;
