"use client";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/store/store"; // 👈 updated import
import { PersistGate } from "redux-persist/integration/react"; // 👈 import this
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Sidebar from "../../Commponents/Dashboard/Sidebar";
import "./globals.css";
import { useState } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const sidebarWidth = isSidebarOpen ? "w-64" : "w-20";
  const marginLeft = isSidebarOpen ? "ml-64" : "ml-20";

  return (
    <html lang="en">
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="flex">
              <div
                className={`h-screen fixed left-0 top-0 bg-white shadow transition-all duration-300 ease-in-out ${sidebarWidth}`}
              >
                <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
              </div>

              <div
                className={`flex-1 transition-all duration-300 ease-in-out ${marginLeft}`}
              >
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
                  <div className="font-semibold text-gray-800">
                    User Profile
                  </div>
                </header>

                <main className="mt-16 p-4 h-[calc(100vh-4rem)] overflow-auto bg-gray-50">
                  {children}
                </main>
              </div>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
