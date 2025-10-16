"use client";

import Sidebar from "../../Commponents/Dashboard/Sidebar";
import StatsCard from "../../Commponents/Dashboard/StatsCard";
import SalesChart from "../../Commponents/Dashboard/SaleChart";
import TargetCard from "../../Commponents/Dashboard/TargetCard";
import { stats } from "../../Commponents/Dashboard/data/StatsData";
import { salesData } from "../../Commponents/Dashboard/data/SalesData";
import { target } from "../../Commponents/Dashboard/data/TargetData";


export default function DashboardPage() {
  return (
    <div className="flex  ">
      <div className="flex-1 flex flex-col">
        
        <main className="p-8 h-auto overflow-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[60%] space-y-6">
              <div className=" flex w-full gap-6">
                {stats.map((item, i) => (
                  <StatsCard key={i} {...item} />
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <SalesChart data={salesData} />
              </div>
            </div>
           
            <div className="w-full lg:w-[40%]   h-full  ">
              <TargetCard target={target} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
