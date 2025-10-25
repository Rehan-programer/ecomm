"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavouritesFromDB,
  clearFavourites,
  toggleFavouriteInDB,
} from "@/redux/slice/favouriteslice";
import { addItem } from "@/redux/slice/cartslice";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavouriteList() {
  const dispatch = useDispatch();
  const router = useRouter();

  const favourites = Array.isArray(useSelector((state) => state.favourite.items))
    ? useSelector((state) => state.favourite.items)
    : [];

  const user = useSelector((state) => state.user.currentUser);

  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [selectedSizeMap, setSelectedSizeMap] = useState({});

  // ✅ Load user's favourites
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavouritesFromDB(user._id));
    } else {
      dispatch(clearFavourites());
    }
  }, [user, dispatch]);

  // ✅ Handlers
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

  const handleRemoveFavourite = (item) => {
    if (!user?._id) {
      alert("Please login to manage favourites");
      router.push("/auth");
      return;
    }
    dispatch(toggleFavouriteInDB({ userId: user._id, productId: item._id, item }));
  };

  const handleColorSelect = (id, color) => {
    setSelectedColorMap((prev) => ({ ...prev, [id]: color }));
  };

  const handleSizeSelect = (id, size) => {
    setSelectedSizeMap((prev) => ({ ...prev, [id]: size }));
  };

  // ✅ UI
  if (!user?._id)
    return <p className="text-center py-10 text-gray-500">Please login to see favourites.</p>;

  if (favourites.length === 0)
    return <p className="text-center py-10 text-gray-500">No favourites added yet.</p>;

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
            className="relative bg-white shadow-md rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full h-60 overflow-hidden">
              <img
                src={item.image || "/fallback.jpg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Remove Favourite Button */}
              <button
                onClick={() => handleRemoveFavourite(item)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full shadow-md bg-white border hover:bg-red-500 hover:text-white transition"
              >
                <Heart className="text-red-500" size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold hover:text-red-500 transition">
                <Link href={`/product/${item._id}`}>{item.title}</Link>
              </h3>
              <p className="text-gray-600 mt-1">{item.brand || "Unknown Brand"}</p>

              {/* Colors */}
              {colors.length > 0 && (
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
                  {colors.map((clr, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorSelect(item._id, clr)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColor === clr
                          ? "border-red-500 scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: clr }}
                    ></button>
                  ))}
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => handleSizeSelect(item._id, size)}
                      className={`px-3 py-1 rounded-md border text-sm ${
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
              <p className="mt-3 text-lg font-bold text-gray-900">${item.price}</p>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:bg-gray-400"
                disabled={
                  (colors.length > 0 && !selectedColor) ||
                  (sizes.length > 0 && !selectedSize)
                }
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
