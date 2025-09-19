"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Search, Phone, Menu, X } from "lucide-react";
import { navLinks, icons } from "./HeaderData";
import Link from "next/link";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container max-w-[2000px] w-[90%] mx-auto px-4 py-4 flex items-center justify-between">
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

        <div className="flex items-center space-x-4">
          {icons.map((item) => {
            const IconComp = item.icon;
            if (item.path) {
          
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className="p-2 rounded-full hidden md:block hover:bg-gray-100 transition"
                  aria-label={item.label}
                >
                  <IconComp className="w-6 h-6 text-gray-700" />
                </Link>
              );
            }

          
            return (
              <button
                key={item.id}
                className="p-2 rounded-full hidden md:block hover:bg-gray-100 transition"
                aria-label={item.label}
              >
                <IconComp className="w-6 h-6 text-gray-700" />
              </button>
            );
          })}
          <button
            className="lg:hidden p-2 rounded-lg bg-red-500 hover:bg-gray-100"
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

      <div className="bg-black flex flex-col max-w-[2000px]  m-auto md:flex-row justify-center items-center py-2 text-white space-y-2 md:space-y-0 md:space-x-2">
        <p className="text-center md:text-left hidden md:block">
          Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer
        </p>
        <a
          href="#"
          className="text-[#BD7B2F] border-b hover:tracking-wide text-center"
        >
          Shop Now
        </a>
      </div>
      <div></div>
      <div className="absolute  md:hidden z-100 flex bottom-0  top-[100%] right-0 ">
        {icons.map((item) => {
          const IconComp = item.icon;
          return (
            <button
              key={item.id}
              className="p-2 rounded-full block md:hidden hover:bg-gray-100 transition"
              aria-label={item.label}
            >
              <IconComp className="w-6 h-6 text-gray-700" />
            </button>
          );
        })}
      </div>

      <div
        className={`lg:hidden absolute w-full overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col space-y-3 py-4 bg-white border-t shadow">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.path}
              className="text-gray-700 text-base font-medium hover:text-[#FF2020] transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
