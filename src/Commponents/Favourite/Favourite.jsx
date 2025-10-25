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

  const favourites = Array.isArray(
    useSelector((state) => state.favourite.items)
  )
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
    dispatch(
      toggleFavouriteInDB({ userId: user._id, productId: item._id, item })
    );
  };

  const handleColorSelect = (id, color) => {
    setSelectedColorMap((prev) => ({ ...prev, [id]: color }));
  };

  const handleSizeSelect = (id, size) => {
    setSelectedSizeMap((prev) => ({ ...prev, [id]: size }));
  };

  // ✅ UI
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
      {favourites
        .filter((item) => item) // remove null / undefined
        .map((item) => {
          const colors = Array.isArray(item.color)
            ? item.color
            : item.color?.split(",") || [];
          const sizes = Array.isArray(item.size)
            ? item.size
            : item.size?.split(",") || [];

          const selectedColor = selectedColorMap[item._id];
          const selectedSize = selectedSizeMap[item._id];

          return (
            <div key={item._id || item.id} className="...">
              {/* Your card JSX */}
            </div>
          );
        })}
    </div>
  );
}
