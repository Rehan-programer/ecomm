"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavouritesFromDB, clearFavourites } from "@/redux/slice/favouriteslice";

export default function FavouriteList() {
  const dispatch = useDispatch();
  // const favourites = useSelector(state => state.favourite.items);
  const favourites = Array.isArray(useSelector(state => state.favourite.items))
  ? useSelector(state => state.favourite.items)
  : [];

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    if (user?._id) {
      // Load favourites from localStorage first
      const stored = JSON.parse(localStorage.getItem(`favourites_${user._id}`)) || [];
      dispatch(fetchFavouritesFromDB(user._id));
    } else {
      // Clear favourites if user is logged out
      dispatch(clearFavourites());
    }
  }, [user, dispatch]);

  if (!user?._id)
    return <p className="text-center py-10 text-gray-500">Please login to see favourites.</p>;

  if (favourites.length === 0)
    return <p className="text-center py-10 text-gray-500">No favourites added yet.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favourites.map((item) => (
        <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
          <img
            src={item.image || "/fallback.jpg"}
            alt={item.title}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-700">${item.price}</p>
        </div>
      ))}
    </div>
  );
}
