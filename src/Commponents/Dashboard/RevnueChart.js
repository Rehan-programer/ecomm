"use client";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function StatisticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/orders");
        const orders = await res.json();

        if (!Array.isArray(orders)) return;

        const monthlyData = {};
        orders.forEach((order) => {
          const date = new Date(order.createdAt);
          const month = date.toLocaleString("default", { month: "short" });
          if (!monthlyData[month])
            monthlyData[month] = { totalOrders: 0, totalRevenue: 0 };
          monthlyData[month].totalOrders += 1;
          monthlyData[month].totalRevenue += Number(order.totalAmount) || 0;
        });

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const chartData = months.map((m) => ({
          month: m,
          orders: monthlyData[m]?.totalOrders || 0,
          revenue: monthlyData[m]?.totalRevenue || 0,
        }));

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      id: "stats-chart",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: { categories: data.map((d) => d.month) },
    yaxis: [
      { title: { text: "Orders" } },
      { opposite: true, title: { text: "Revenue" } },
    ],
    stroke: { curve: "smooth" },
    colors: ["#465fff", "#9cb9ff"],
    legend: { position: "top" },
    tooltip: { shared: true, intersect: false },
    responsive: [
      {
        breakpoint: 1024, // tablet
        options: {
          chart: { height: 250 },
          legend: { fontSize: "12px", position: "bottom" },
          yaxis: [{ labels: { style: { fontSize: "12px" } } }, { labels: { style: { fontSize: "12px" } } }],
        },
      },
      {
        breakpoint: 640, // mobile
        options: {
          chart: { height: 200 },
          legend: { fontSize: "10px", position: "bottom" },
          yaxis: [{ labels: { style: { fontSize: "10px" } } }, { labels: { style: { fontSize: "10px" } } }],
        },
      },
    ],
  };

  const series = [
    { name: "Orders", type: "area", data: data.map((d) => d.orders) },
    { name: "Revenue", type: "area", data: data.map((d) => d.revenue) },
  ];

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md mx-auto w-full max-w-[2000px]">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Statistics</h2>
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
}
