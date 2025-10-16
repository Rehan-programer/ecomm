export default function StatsCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="bg-white w-[50%] rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col items-start justify-start gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 text-lg">
          {icon}
        </div>
        <p className="text-gray-500 font-medium">{title}</p>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-3xl font-semibold text-gray-800">{value}</p>
        <span
          className={`px-3 py-[2px] text-sm rounded-full font-semibold ${
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isPositive ? "↑" : "↓"} {change}%
        </span>
      </div>
    </div>
  );
}
