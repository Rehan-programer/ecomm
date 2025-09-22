"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks, icons } from "./HeaderData";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const favouriteItems = useSelector((state) => state.favourite.items);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container max-w-[2000px] w-[90%] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/img/logo.png.webp"
            alt="Logo"
            width={100}
            height={100}
            priority
            className="h-9 md:h-8 lg:h-10 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="text-gray-700 text-lg font-semibold hover:text-[#FF2020] transition duration-300 ease-in-out"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons (sirf lg par) + Toggle (sirf mobile/tablet par) */}
        <div className="flex items-center space-x-4">
          {/* Icons -> lg ke liye */}
          <div className="hidden lg:flex items-center space-x-4">
            {icons.map((item) => {
              const IconComp = item.icon;
              if (item.label === "Cart") {
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="p-2 rounded-full relative hover:bg-gray-100 transition"
                    aria-label={item.label}
                  >
                    <div className="absolute flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4 top-0 right-0">
                      {cartItems.length}
                    </div>
                    <IconComp className="w-5 h-5 text-gray-700" />
                  </Link>
                );
              }
              if (item.label === "Favourite") {
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="p-2 rounded-full relative hover:bg-gray-100 transition"
                    aria-label={item.label}
                  >
                    <div className="absolute flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4 top-0 right-0">
                      {favouriteItems.length}
                    </div>
                    <IconComp className="w-5 h-5 text-gray-700" />
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label={item.label}
                >
                  <IconComp className="w-6 h-6 text-gray-700" />
                </button>
              );
            })}
          </div>

          {/* Toggle Button -> sirf mobile aur tablet ke liye */}
          <button
            className="lg:hidden p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (sirf mobile/tablet par) */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          {/* Links */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-base font-semibold hover:text-[#FF2020] transition duration-300 ease-in-out"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons for mobile bhi show karo */}
          <div className="flex space-x-6 pt-4 border-t">
            {icons.map((item) => {
              const IconComp = item.icon;
              if (item.label === "Cart") {
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="relative"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="absolute -top-2 -right-2 flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4">
                      {cartItems.length}
                    </div>
                    <IconComp className="w-6 h-6 text-gray-700" />
                  </Link>
                );
              }
              if (item.label === "Favourite") {
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="relative"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="absolute -top-2 -right-2 flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4">
                      {favouriteItems.length}
                    </div>
                    <IconComp className="w-6 h-6 text-gray-700" />
                  </Link>
                );
              }
              return (
                <button key={item.id} aria-label={item.label}>
                  <IconComp className="w-6 h-6 text-gray-700" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
