"use client";

import { FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, persistor } from "../../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Sidebar from "../../Commponents/Dashboard/Sidebar";
import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { setUserFromLocalStorage } from "../../redux/slice/userslice";
import { usePathname } from "next/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function DashboardWithRedux({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // desktop
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // mobile/tablet
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isProfilePage = pathname === "/dashboard/profile";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      dispatch(setUserFromLocalStorage(JSON.parse(storedUser)));
    }
  }, [dispatch, user]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        There is no user
      </div>
    );
  }

  return (
    <div className="flex max-w-[2000px] m-auto">
      <div
        className={`hidden md:flex items-center h-screen fixed left-0 md:top-16 bg-red-500 shadow transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar
          open={isSidebarOpen}
          isMobile={true}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isMobileSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileSidebar}
      ></div>

      <div
        className={`md:hidden fixed top-0 left-0 h-full bg-red-500 shadow-lg z-50 transform transition-transform duration-300 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <Sidebar open={true} toggleSidebar={toggleMobileSidebar} />
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <header
          className={`h-16 fixed top-0 right-0 left-0 bg-white p-4 shadow flex justify-between items-center z-30 transition-all duration-300`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-md bg-gray-800 hover:bg-blue-600 text-white shadow-md transition-all duration-200"
            >
              {isSidebarOpen ? (
                <FiChevronLeft size={20} />
              ) : (
                <FiChevronRight size={20} />
              )}
            </button>

            <button
              onClick={toggleMobileSidebar}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-gray-800 hover:bg-blue-600 text-white shadow-md transition-all duration-200"
            >
              <FiMenu size={20} />
            </button>

            <span className="text-gray-600 font-medium">
              Search / Breadcrumb
            </span>
          </div>

          {user && (
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-3 py-2 text-black"
            >
              {user.profileImage && !isProfilePage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-black object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-black bg-white text-green-700 flex items-center justify-center font-bold">
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>
              )}
              <span>{user.firstName}</span>
            </Link>
          )}
        </header>

        <main className="mt-16 p-2 md:p-4 h-[calc(100vh-4rem)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate
            loading={<div>Loading Redux...</div>}
            persistor={persistor}
          >
            <QueryClientProvider client={queryClient}>
              <DashboardWithRedux>{children}</DashboardWithRedux>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
