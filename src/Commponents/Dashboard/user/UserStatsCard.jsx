"use client";
import React, { useEffect, useState } from "react";
import { ShoppingBag, Clock, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../../../redux/slice/orderslice";

export default function UserStatsCard() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const allOrders = useSelector((state) => state.orders.orders) || [];
  const ordersStatus = useSelector((state) => state.orders.status);
console.log("orders" ,allOrders);

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    wishlistItems: 0,
  });

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchUserOrders(String(currentUser._id)));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    const userId = currentUser?._id ? String(currentUser._id) : null;
    if (!userId) return;
    console.log("userId", userId)

const userOrders = allOrders.filter(
  (order) => String(order.userId) === String(currentUser._id)
);



console.log("useroreders", userOrders)
const totalOrders = allOrders.length;
const pendingOrders = allOrders.filter((o) => o.status === "Pending").length;


    // wishlist fetch (if you have wishlist API)
    (async () => {
      try {
        // const wishlistRes = await fetch("/api/wishlist");
        // const wishlist = await wishlistRes.json();
        // const wishlistItems = (Array.isArray(wishlist) ? wishlist : []).filter(
          // (item) => String(item.userId) === userId
        // ).length;

        setStats({ totalOrders, pendingOrders,  });
        console.log("Stats updated:", { totalOrders, pendingOrders,  });
      } catch (err) {
        // fallback without wishlist
        setStats({ totalOrders, pendingOrders,});
        console.error(err);
      }
    })();
  }, [allOrders, currentUser]);

  if (ordersStatus === "loading") {
    return (
      <div className="bg-white w-[50%] rounded-2xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading user stats...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <StatCard icon={<ShoppingBag />} label="Total Orders" value={stats.totalOrders} />
      <StatCard icon={<Clock />} label="Pending Deliveries" value={stats.pendingOrders} />
      {/* <StatCard icon={<Heart />} label="Wishlist Items" value={stats.wishlistItems} /> */}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 text-lg">
          {icon}
        </div>
      </div>
      <p className="text-gray-500 font-medium mb-2">{label}</p>
      <p className="text-3xl font-semibold text-gray-800">{value || 0}</p>
    </div>
  );
}
