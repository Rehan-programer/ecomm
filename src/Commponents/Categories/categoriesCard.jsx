"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "@/redux/slice/cartslice";
import {
  fetchFavouritesFromDB,
  toggleFavouriteInDB,
  toggleLocalFavourite,
  clearFavourites,
} from "@/redux/slice/favouriteslice";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesCard({ data, route }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const favourites = useSelector((state) => state.favourite.items);

  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [selectedSizeMap, setSelectedSizeMap] = useState({});

  // Load favourites for logged-in user
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavouritesFromDB(user._id));
    } else {
      dispatch(clearFavourites());
    }
  }, [user?._id, dispatch]);

  const toggleFavourite = (item) => {
    if (!user?._id) {
      alert("Please login to add favourites");
      router.push("/auth");
      return;
    }
    dispatch(toggleLocalFavourite(item));
    dispatch(toggleFavouriteInDB({ userId: user._id, productId: item._id }));
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
    dispatch(addItem({ ...item, selectedColor, selectedSize }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 py-10">
      {data.map((item) => {
        const isFav = favourites.some((fav) => fav._id === item._id);
        const colors = Array.isArray(item.color) ? item.color : item.color?.split(",") || [];
        const sizes = Array.isArray(item.size) ? item.size : item.size?.split(",") || [];
        const selectedColor = selectedColorMap[item._id] || null;
        const selectedSize = selectedSizeMap[item._id] || null;

        return (
          <div
            key={item._id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            {/* Image + Heart */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={item.image || "/fallback.jpg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button
                onClick={() => toggleFavourite(item)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md border transition ${
                  isFav ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                <Heart size={20} />
              </button>

              {/* Add to Cart — Large screens, visible on hover */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  disabled={(colors.length > 0 && !selectedColor) || (sizes.length > 0 && !selectedSize)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold hover:text-red-500 transition">
                <Link href={`/${route}/${item._id}`}>{item.title}</Link>
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.brand}</p>

              {/* Colors */}
              {colors.length > 0 && (
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                  {colors.map((clr, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorSelect(item._id, clr)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColor === clr ? "border-red-500 scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: clr }}
                    />
                  ))}
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => handleSizeSelect(item._id, size)}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        selectedSize === size ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {/* Price */}
              <p className="mt-3 text-lg font-bold text-gray-900">${item.price}</p>

              {/* Add to Cart — Mobile/Tablet, always visible */}
              <div className="mt-3 flex lg:hidden justify-center">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full max-w-[200px] justify-center"
                  disabled={(colors.length > 0 && !selectedColor) || (sizes.length > 0 && !selectedSize)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
