"use client";
import StatsCard from "../../Commponents/Dashboard/StatsCard";
import SalesChart from "../../Commponents/Dashboard/SaleChart";
import TargetCard from "../../Commponents/Dashboard/TargetCard";
import RevnueChart from "../../Commponents/Dashboard/RevnueChart";

export default function DashboardPage() {
  return (
    <div className="flex  ">
      <div className="flex-1 flex flex-col">
        <main className="p-8 h-auto overflow-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[60%] space-y-6">
              <div className=" flex w-full gap-6">
                <StatsCard />
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <SalesChart />
              </div>
            </div>

            <div className="w-full lg:w-[40%]   h-full  ">
              <TargetCard />
            </div>
          </div>
              <div className="w-full     ">
              <RevnueChart />
            </div>
        </main>
      </div>
    </div>
  );
}
