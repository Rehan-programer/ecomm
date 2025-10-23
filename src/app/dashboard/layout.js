"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, persistor } from "../../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../../Commponents/Dashboard/Sidebar";
import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { setUserFromLocalStorage } from "../../redux/slice/userslice";
import { usePathname } from "next/navigation"; // ✅ FIXED import

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function DashboardWithRedux({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const pathname = usePathname(); // ✅ Get current route path

  const isProfilePage = pathname === "/dashboard/profile"; // ✅ Check if on profile page

  // Initialize user from localStorage (for first load)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      dispatch(setUserFromLocalStorage(JSON.parse(storedUser)));
    }
  }, [dispatch, user]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const sidebarWidth = isSidebarOpen ? "w-64" : "w-20";
  const marginLeft = isSidebarOpen ? "ml-64" : "ml-20";

  // Wait for user to be loaded
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        There is no user
      </div>
    );
  }

  return (
    <div className="flex">
      {/* ✅ Sidebar */}
      <div
        className={`h-screen fixed left-0 top-0 bg-white shadow transition-all duration-300 ease-in-out ${sidebarWidth}`}
      >
        <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* ✅ Main content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${marginLeft}`}
      >
        {/* ✅ Header */}
        <header
          className={`h-16 fixed top-0 right-0 left-0 bg-white p-4 shadow flex justify-between items-center z-10 transition-all duration-300 ease-in-out ${marginLeft}`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-800 hover:bg-blue-600 text-white shadow-md transition-all duration-200"
            >
              {isSidebarOpen ? (
                <FiChevronLeft size={20} />
              ) : (
                <FiChevronRight size={20} />
              )}
            </button>
            <span className="text-gray-600 font-medium">
              Search / Breadcrumb
            </span>
          </div>

          {/* ✅ User profile icon */}
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

        {/* ✅ Page content */}
        <main className="mt-16 p-4 h-[calc(100vh-4rem)] overflow-auto bg-gray-50">
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
            <DashboardWithRedux>{children}</DashboardWithRedux>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
