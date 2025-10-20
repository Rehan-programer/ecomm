"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../../Commponents/Header/Header";
import Footer from "../../Commponents/Footer/Footer";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../redux/store/store";
import Head from "next/head";
import { useEffect } from "react";
import { setUserFromLocalStorage } from "../../redux/slice/userslice";

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
  return (
    <html lang="en">
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>

      <body>
        <Provider store={store}>
          <ReduxInitializer>
            <Header />
            {children}
            <Footer />
          </ReduxInitializer>
        </Provider>
      </body>
    </html>
  );
}
