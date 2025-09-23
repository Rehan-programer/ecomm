"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Commponents/Header/Header";
import Footer from "./Commponents/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

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
      <body>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
