"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { fetchFavouritesFromDB } from "@/redux/slice/favouriteslice";

// Client-side only import
const Favourite = dynamic(
  () => import("../../../../Commponents/Favourite/Favourite"),
  { ssr: false }
);

export default function FavouritePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavouritesFromDB(user._id));
    }
  }, [user?._id, dispatch]);

  if (!user?._id)
    return (
      <p className="text-center py-10 text-gray-500">
        Please login to see your favourites.
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Favourites ❤️</h2>
      <Favourite />
    </div>
  );
}
