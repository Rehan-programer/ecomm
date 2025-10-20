"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const orders = await res.json();

        if (!Array.isArray(orders)) {
          console.error("Invalid data format from API:", orders);
          return;
        }

        // ✅ Group orders by month
        const monthlyData = {};
        orders.forEach((order) => {
          const date = new Date(order.createdAt);
          const month = date.toLocaleString("default", { month: "short" }); // "Jan", "Feb" ...
          if (!monthlyData[month]) monthlyData[month] = 0;
          monthlyData[month] += Number(order.totalAmount) || 0;
        });

        // ✅ Format same as your salesData
        const formattedData = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((m) => ({
          month: m,
          sales: monthlyData[m] || 0, // 0 if no sales that month
        }));

        setData(formattedData);
      } catch (error) {
        console.error("❌ Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading sales data...</p>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Monthly Sales
      </h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={10}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
          />
          <Tooltip cursor={{ fill: "#F1F5F9" }} formatter={(v) => [`$${v}`, "Sales"]} />
          <Bar dataKey="sales" fill="#3B82F6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
