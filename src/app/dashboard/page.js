"use client";
export const dynamic = "force-dynamic";

import { useSelector } from "react-redux";
import StatsCard from "../../Commponents/Dashboard/StatsCard";
import SalesChart from "../../Commponents/Dashboard/SaleChart";
import TargetCard from "../../Commponents/Dashboard/TargetCard";
import RevnueChart from "../../Commponents/Dashboard/RevnueChart";
import UserStatsCard from "../../Commponents/Dashboard/user/UserStatsCard";
import RecentOrders from "../../Commponents/Dashboard/user/RecentOrders";

export default function DashboardPage() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const isAdmin = currentUser?.role === "admin";
  const isUser = currentUser?.role === "user";

  return (
    <div className="flex flex-col lg:flex-row max-w-[2000px] m-auto">
      <div className="flex-1 flex flex-col">
        <main className="p-2  md:p-4 h-auto overflow-auto">
          {/* ----------------- Admin View ------------------ */}
          {isAdmin && (
            <>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Section (Stats + SalesChart) */}
                <div className="w-full lg:w-[60%] space-y-6">
                  {/* Stats Cards */}
                   <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <StatsCard />
                </div>

                  {/* Sales Chart */}
                  <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                    <SalesChart />
                  </div>
                </div>

                {/* Right Section (Target Card) */}
                <div className="w-full lg:w-[40%] h-full mt-4 lg:mt-0">
                  <TargetCard />
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="w-full mt-6">
                <RevnueChart />
              </div>
            </>
          )}

          {/* ----------------- User View ------------------ */}
          {isUser && (
            <>
              <div className="flex flex-col gap-6">
                {/* User Stats */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <UserStatsCard />
                </div>
              </div>
            </>
          )}
        </main>

        {/* ----------------- User Recent Orders ------------------ */}
        {isUser && (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <RecentOrders />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
