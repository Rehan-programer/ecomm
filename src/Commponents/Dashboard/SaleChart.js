"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data }) {
  return (
    <div>
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
          <Tooltip cursor={{ fill: "#F1F5F9" }} />
          <Bar dataKey="sales" fill="#3B82F6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
