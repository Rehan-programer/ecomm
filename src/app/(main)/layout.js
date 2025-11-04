"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../../Commponents/Header/Header";
import Footer from "../../Commponents/Footer/Footer";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../redux/store/store";
import Head from "next/head";
import { useEffect, useState } from "react";
import { setUserFromLocalStorage } from "../../redux/slice/userslice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// ✅ Custom wrapper to restore user from localStorage
function ReduxInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUserFromLocalStorage(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return children;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // ✅ Initialize React Query Client (once)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // don’t refetch when switching tabs
            retry: 1, // retry failed requests once
            staleTime: 1000 * 60 * 5, // cache valid for 5 mins
          },
        },
      })
  );

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
      <Toaster position="top-center" reverseOrder={false} />
        {/* ✅ Wrap everything in React Query + Redux */}
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ReduxInitializer>
              <Header />
              {children}
              <Footer />
            </ReduxInitializer>
          </Provider>

          {/* Optional Devtools — disable in production if you want */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
