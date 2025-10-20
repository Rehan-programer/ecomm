"use client";
import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Clock } from "lucide-react";

export default function StatsCard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    orderChange: 0,
    revenueChange: 0,
    pendingChange: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();

        if (!Array.isArray(data)) return;

        const monthlyOrders = {};
        data.forEach((order) => {
          const date = new Date(order.createdAt);
          const key = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          if (!monthlyOrders[key]) monthlyOrders[key] = [];
          monthlyOrders[key].push(order);
        });

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const currentKey = `${currentYear}-${String(currentMonth).padStart(
          2,
          "0"
        )}`;
        const prevKey = `${prevYear}-${String(prevMonth).padStart(2, "0")}`;

        const currentMonthOrders = monthlyOrders[currentKey] || [];
        const prevMonthOrders = monthlyOrders[prevKey] || [];

        const totalOrders = currentMonthOrders.length;
        const totalRevenue = currentMonthOrders.reduce(
          (sum, o) => sum + (o.totalAmount || 0),
          0
        );
        const pendingOrders = currentMonthOrders.filter(
          (o) => o.status === "Pending"
        ).length;

        const prevTotalOrders = prevMonthOrders.length || 0;
        const prevRevenue = prevMonthOrders.reduce(
          (sum, o) => sum + (o.totalAmount || 0),
          0
        );
        const prevPending = prevMonthOrders.filter(
          (o) => o.status === "Pending"
        ).length;

        const calcChange = (curr, prev) =>
          prev === 0 ? 0 : ((curr - prev) / prev) * 100;

        setStats({
          totalOrders,
          totalRevenue,
          pendingOrders,
          orderChange: calcChange(totalOrders, prevTotalOrders),
          revenueChange: calcChange(totalRevenue, prevRevenue),
          pendingChange: calcChange(pendingOrders, prevPending),
        });
      } catch (error) {
        console.error("❌ Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

  }, []);

  if (loading) {
    return (
      <div className="bg-white w-[50%] rounded-2xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading stats...</p>
      </div>
    );
  }

  // ✅ Helper for % label color and arrow
  const getChangeLabel = (value) => {
    const isPositive = value >= 0;
    return (
      <span
        className={`px-3 py-[2px] text-sm rounded-full font-semibold ${
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        {isPositive ? "↑" : "↓"} {Math.abs(value).toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {/* Total Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
       <div className="flex flex-col items-start gap-3 mb-4">
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 text-lg">
              <ShoppingBag />
            </div>
            {getChangeLabel(stats.orderChange)}
          </div>
          <p className="text-gray-500 font-medium">Total Orders</p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-semibold text-gray-800">
            {stats.totalOrders}
          </p>
          
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col items-start gap-3 mb-4">
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 text-lg">
              <DollarSign />
            </div>
            <div>{getChangeLabel(stats.revenueChange)}</div>
          </div>
          <p className="text-gray-500 font-medium">Total Revenue</p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-semibold text-gray-800">
            ${stats.totalRevenue.toFixed(2).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pending Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col items-start gap-3 mb-4">
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 text-lg">
              <Clock />
            </div>
            {getChangeLabel(stats.pendingChange)}
          </div>
          <p className="text-gray-500 font-medium">pending Orders</p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-semibold text-gray-800">
            {stats.pendingOrders}
          </p>
          
        </div>
      </div>
    </div>
  );
}
