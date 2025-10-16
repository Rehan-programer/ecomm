"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../../Commponents/Header/Header";
import Footer from "../../Commponents/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import Head from "next/head"; 

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
        {/* <script src="https://apis.google.com/js/api.js"></script> */}
      </Head>

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
