"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavouritesFromDB,
  toggleFavouriteInDB,
  toggleLocalFavourite,
  clearFavourites,
} from "@/redux/slice/favouriteslice";
import { addItem } from "@/redux/slice/cartslice";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavouriteList() {
  const dispatch = useDispatch();
  const router = useRouter();

const user = useSelector((state) => state.user?.currentUser);
const favourites = useSelector((state) => state.favourite?.items) || [];


  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [selectedSizeMap, setSelectedSizeMap] = useState({});

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavouritesFromDB(user._id));
    } else {
      dispatch(clearFavourites());
    }
  }, [user, dispatch]);

  const handleAddToCart = (item) => {
    if (!user?._id) {
      alert("Please login to add to cart");
      router.push("/auth");
      return;
    }
    const selectedColor = selectedColorMap[item._id] || null;
    const selectedSize = selectedSizeMap[item._id] || null;
    dispatch(addItem({ ...item, selectedColor, selectedSize }));
  };

  const handleToggleFavourite = (item) => {
    if (!user?._id) {
      alert("Please login to manage favourites");
      router.push("/auth");
      return;
    }
    dispatch(toggleLocalFavourite(item));
    dispatch(toggleFavouriteInDB({ userId: user._id, productId: item._id }));
  };

  const handleColorSelect = (id, color) =>
    setSelectedColorMap((prev) => ({ ...prev, [id]: color }));
  const handleSizeSelect = (id, size) =>
    setSelectedSizeMap((prev) => ({ ...prev, [id]: size }));

  if (!user?._id)
    return (
      <p className="text-center py-10 text-gray-500">
        Please login to see favourites.
      </p>
    );
  if (favourites.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">
        No favourites added yet.
      </p>
    );

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {favourites.map((item) => {
        const colors = Array.isArray(item.color)
          ? item.color
          : item.color?.split(",") || [];
        const sizes = Array.isArray(item.size)
          ? item.size
          : item.size?.split(",") || [];

        const selectedColor = selectedColorMap[item._id];
        const selectedSize = selectedSizeMap[item._id];

        return (
          <div
            key={item._id}
            className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Image + Heart */}
            <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
              <img
                src={item.image || "/fallback.jpg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => handleToggleFavourite(item)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full shadow-md bg-white border hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Heart
                  className={`transition-colors duration-300 ${
                    favourites.find((f) => f._id === item._id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                  size={22}
                />
              </button>
            </div>

            {/* Details */}
            <div className="p-5 text-center flex flex-col gap-3">
              <Link href={`/product/${item._id}`}>
                <h3 className="text-lg font-semibold hover:text-red-500 transition-all duration-300">
                  {item.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500">{item.brand || "Unknown Brand"}</p>

              {/* Colors */}
              {colors.length > 0 && (
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                  {colors.map((clr, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorSelect(item._id, clr)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 ${
                        selectedColor === clr
                          ? "border-red-500 scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: clr }}
                    />
                  ))}
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                  {sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => handleSizeSelect(item._id, size)}
                      className={`px-3 py-1 rounded-md border text-sm transition-colors duration-200 ${
                        selectedSize === size
                          ? "bg-red-500 text-white border-red-500"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {/* Price */}
              <p className="mt-2 text-xl font-bold text-gray-900">${item.price}</p>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-3 flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                disabled={(colors.length > 0 && !selectedColor) || (sizes.length > 0 && !selectedSize)}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
