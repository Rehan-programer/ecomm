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
  // Get the current user from Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  const isAdmin = currentUser?.role === "admin";
  const isUser = currentUser?.role === "user";

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <main className="p-8 h-auto overflow-auto">
          {/* ----------------- Admin View ------------------ */}
          {isAdmin && (
            <>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[60%] space-y-6">
                  <div className="flex w-full gap-6">
                    <StatsCard />
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <SalesChart />
                  </div>
                </div>

                <div className="w-full lg:w-[40%] h-full">
                  <TargetCard />
                </div>
              </div>

              <div className="w-full mt-6">
                <RevnueChart />
              </div>
            </>
          )}

          {/* ----------------- User View ------------------ */}
          {isUser && (
            <>
              <div className="flex flex-col gap-6">
                <div className="flex w-full gap-6">
                  <UserStatsCard />
                </div>
                {/* Add more user-specific components here if needed */}
              </div>
            </>
          )}
        </main>
        {isUser && (
          <>
            <div className="flex flex-col gap-6">
              <div className="flex w-full gap-6">
                <RecentOrders />
              </div>
              {/* Add more user-specific components here if needed */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
