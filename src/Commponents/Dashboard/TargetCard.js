"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function TargetCard({ target }) {
  const chartData = [
    { name: "Progress", value: target.percent, fill: "#6366F1" },
  ];

  return (
    <div className="flex flex-col rounded-[20px]  shadow-lg bg-[#0000000f] h-auto ">
      <div className="bg-white p-[20px] mb-4 rounded-[20px] shadow-lg ">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Monthly Target
        </h2>
        <p className="text-gray-500 text-sm mb-2">
          Target you’ve set for each month
        </p>

        <div className="flex justify-center items-center relative">
          <ResponsiveContainer width="100%"  height={200} >
            <RadialBarChart
              innerRadius="90%"
              outerRadius="100%"
              data={chartData}
              startAngle={180}
              endAngle={0}
              height={200}
            >
              <RadialBar dataKey="value" cornerRadius={50} />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="absolute top-[30%] text-center">
            <h5 className=" font-semibold text-gray-800">
              {target.percent}%
            </h5>
            <p className="text-green-500 text-sm font-semibold">
              +{target.change}%
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 ">
          You earn ${target.earn} today, it’s higher than last month.
          <br />
          Keep up your good work!
        </p>
      </div>
      <div className="  pt-4 py-8  rounded-b-[20px]  flex justify-between text-sm text-gray-600">
        <div className="text-center flex-1">
          <p>Target</p>
          <p className="font-semibold text-red-500">${target.target}K</p>
        </div>
        <div className="text-center flex-1">
          <p>Revenue</p>
          <p className="font-semibold text-green-500">${target.revenue}K</p>
        </div>
        <div className="text-center flex-1">
          <p>Today</p>
          <p className="font-semibold text-green-500">${target.today}K</p>
        </div>
      </div>
    </div>
  );
}
