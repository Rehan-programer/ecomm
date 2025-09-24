"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { navLinks, icons } from "./HeaderData";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
            className="h-9 md:h-8 w-auto object-contain"
          />
        </div>

        {/* 🖥️ Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 relative">
          {navLinks.map((link, index) => (
            <div key={index} className="group relative">
              <Link
                href={link.path}
                className="text-gray-700 text-lg font-semibold hover:text-[#FF2020] transition"
              >
                {link.name}
              </Link>

              {/* Desktop dropdown */}
              {link.dropdown && link.dropdown.length > 0 && (
                <div className="w-full left-0 top-10 bg-white pt-[2%] right-0 max-w-[2000px] m-auto lg:w-[87%] fixed hidden group-hover:flex shadow-lg mt-2 z-50 justify-between">
                  {/* Left side */}
                  <div className="flex flex-col gap-4 w-[30%] p-4 justify-center bg-gray-100">
                    <h4 className="text-xl font-bold text-gray-800">
                      {link.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{link.descripiton}</p>
                    <img
                      src={link.image || "/img/default-category.jpg"}
                      alt={link.name}
                      className="w-full h-48 object-cover rounded-md mt-2"
                    />
                  </div>

                  {/* Right side */}
                  <div className="flex items-center   flex-row gap-6 w-[70%] p-6 rounded-md">
                    {link.dropdown.map((item, i) => (
                      <div key={i} className="flex-1 p-2">
                        <h6 className="font-semibold text-gray-800 text-lg mb-2">
                          {item.name}
                        </h6>
                        <ul className="mt-2 text-gray-600 text-md space-y-1">
                          {item.subItems?.map((sub, index) => (
                            <li
                              key={index}
                              className="hover:text-[#FF2020] cursor-pointer transition"
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                        <button className="mt-6 text-sm font-medium hover:text-[#FF2020] transition">
                          View More →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons + Mobile Toggle */}
        <div className="flex  items-center space-x-4">
          <div className="hidden  lg:flex items-center space-x-4">
            {icons.map((item) => {
              const IconComp = item.icon;

              // Agar path hai to Link
              if (item.path) {
                return (
                  <Link key={item.id} href={item.path} className="relative">
                    {item.label === "Cart" && (
                      <div className="absolute  -top-2 -right-2 flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4">
                        {cartItems.length}
                      </div>
                    )}
                    {item.label === "Favourite" && (
                      <div className="absolute -top-2 -right-2 flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4">
                        {favouriteItems.length}
                      </div>
                    )}
                    <IconComp className="w-6 h-6 text-gray-700" />
                  </Link>
                );
              }

              // Agar path nahi hai to button
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

            <div className="flex space-x-3  border-t items-center">
            {icons.map((item) => {
              const IconComp = item.icon;

              if (item.path) {
                return (
                  <Link key={item.id} href={item.path} className="relative">
                    {item.label === "Cart" && (
                      <div className="absolute -top-2 -right-2 flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4">
                        {cartItems.length}
                      </div>
                    )}
                    {item.label === "Favourite" && (
                      <div className="absolute -top-2 -right-2 flex justify-center bg-red-500 text-white text-xs items-center rounded-full h-4 w-4">
                        {favouriteItems.length}
                      </div>
                    )}
                    <IconComp className="w-6 h-6 text-gray-700" />
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

          {/* Mobile menu toggle button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-18 right-0 h-screen bg-white w-[50%] border-l shadow-md px-6 py-4 space-y-4 overflow-y-auto">
          <nav className="flex flex-col  space-y-4">
            {navLinks.map((link, index) => (
              <div key={index} className="">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                  className="flex items-center justify-between w-full text-gray-700 text-base font-semibold hover:text-[#FF2020] transition"
                >
                  {link.name}
                  {link.dropdown &&
                    (openDropdown === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    ))}
                </button>
                

                {/* Mobile dropdown */}
                {link.dropdown && openDropdown === index && (
                  <div className="mt-2  grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1   space-y-4">
                    {link.dropdown.map((item, i) => (
                      <div key={i}>
                        <h6 className="font-semibold text-gray-800 text-md mb-1">
                          {item.name}
                        </h6>
                        <ul className=" text-gray-600 text-sm space-y-1">
                          {item.subItems?.map((sub, idx) => (
                            <li
                              key={idx}
                              className="hover:text-[#FF2020] cursor-pointer transition"
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Icons */}
        
        </div>
      )}
    </header>
  );
};

export default Header;
