"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp,Search, } from "lucide-react";
import { navLinks, icons } from "./HeaderData";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { openProductModal } from "../../../redux/slice/productslice";
import Products from "../ProductData.json"

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const cartItems = useSelector((state) => state.cart.items);
  const favouriteItems = useSelector((state) => state.favourite.items);
  const dispatch = useDispatch();
  const mobileMenuRef = useRef(null);
  const router = useRouter();

const handleSearchSubmit = (e) => {
  e.preventDefault();
  const term = searchTerm.trim().toLowerCase();

  const found = navLinks.find(
    (link) => link.name.toLowerCase() === term
  );

  if (found) {
    router.push(found.path);
  } else {
  alert("Page not found");
}


  setSearchTerm("");
};

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    }

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

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
            className="h-9 md:h-8 w-auto object-contain"
          />
        </div>

        <nav className="hidden lg:flex space-x-8 relative">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="group relative transition-all duration-300 ease-in-out"
            >
              <Link
                href={link.path}
                className="text-gray-700 cursor-pointer text-lg font-semibold hover:text-[#FF2020] transition-colors duration-300 ease-in-out"
              >
                {link.name}
              </Link>
              {link.dropdown && link.dropdown.length > 0 && (
                <div className="w-full transition-all duration-300 ease-in-out left-0 top-10 bg-white pt-[2%] right-0 max-w-[2000px] m-auto lg:w-[87%] fixed opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transform hidden group-hover:flex shadow-lg mt-2 z-50 justify-between">
                  <div className="flex flex-col gap-4 w-[30%] p-4 justify-center bg-gray-100 transition-all duration-300 ease-in-out">
                    <div className="flex items-center gap-2 w-full justify-between">
                      <h4 className="text-xl font-bold text-gray-800">
                        {link.name}
                      </h4>
                      <Link
                        href={link.path}
                        className="cursor-pointer border-1 p-2 text-sm font-medium text-black hover:text-[#FF2020] transition-colors duration-300"
                      >
                        View collection
                      </Link>
                    </div>
                    <p className="text-gray-600 text-sm">{link.descripiton}</p>
                    <img
                      src={link.image || "/img/default-category.jpg"}
                      alt={link.name}
                      className="w-full h-48 object-cover rounded-md mt-2 transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex items-center flex-row gap-6 w-[70%] p-6 rounded-md transition-all duration-300 ease-in-out">
                    {link.dropdown.map((item, i) => (
                      <div key={i} className="flex-1 p-2">
                        <h6 className="font-semibold text-gray-800 text-lg mb-2">
                          {item.name}
                        </h6>
                        <ul className="mt-2 text-gray-600 text-md space-y-1">
                          {item.subItems?.map((sub, index) => (
                            <li
                              key={index}
                              className="hover:text-[#FF2020] cursor-pointer transition-colors duration-300"
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                        <button className="mt-6 text-sm text-black font-medium hover:text-[#FF2020] transition-colors duration-300">
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

    
        <div className="flex items-center space-x-4">
          
          <div className="relative hidden lg:flex">
            <form onSubmit={handleSearchSubmit} className="w-full flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="border rounded-[8px] px-4 py-2 text-sm text-black focus:outline-none focus:border-red-500 w-full"
                />
           
                <Search className="absolute right-3 text-black top-[18%] -translate-y-1/" />
           
            </form>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {icons.map((item) => {
              const IconComp = item.icon;
              const handleClick = () => {
                if (item.label === "ProductModal") dispatch(openProductModal());
              };
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
                    <IconComp
                      className="w-6 h-6 text-gray-700 transition-colors duration-300 ease-in-out hover:text-[#FF2020]"
                      onClick={handleClick}
                    />
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out"
                  aria-label={item.label}
                  onClick={handleClick}
                >
                  <IconComp className="w-6 h-6 text-gray-700" />
                </button>
              );
            })}
          </div>

 
          <div className="space-x-3 flex lg:hidden border-t items-center">
            {icons.map((item) => {
              const IconComp = item.icon;
              const handleClick = () => {
                if (item.label === "ProductModal") dispatch(openProductModal());
              };
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
                    <IconComp
                      className="w-6 h-6 text-gray-700 transition-colors duration-300 ease-in-out hover:text-[#FF2020]"
                      onClick={handleClick}
                    />
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out"
                  aria-label={item.label}
                  onClick={handleClick}
                >
                  <IconComp className="w-6 h-6 text-gray-700" />
                </button>
              );
            })}
          </div>

  
          <button
            className="lg:hidden p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

    
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed top-16 right-0 h-screen bg-white w-[75%] sm:w-[60%] border-l shadow-md px-6 py-6 space-y-6 overflow-y-auto z-50 transition-all duration-300 ease-in-out"
        >
      
         <form onSubmit={handleSearchSubmit} className="w-full ">
              <div className="flex justify-center w-full items-center border border-black/80  rounded-[8px] focus:border-red-500">
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="  px-4 py-2 text-sm text-black focus:outline-none focus:border-red-500 w-full"
                />
                <Search className="  text-black mr-2" />
           
              </div>
           
            </form>

          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="space-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center justify-between w-full">
                  <Link
                    href={link.path}
                    className="text-gray-700 text-base font-semibold hover:text-[#FF2020] transition-colors duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>

                  {link.dropdown && (
                    <div
                      className="flex items-center gap-1 cursor-pointer flex-1 px-3 py-2 hover:bg-gray-100 rounded justify-end transition-all duration-300 ease-in-out"
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                    >
                      {openDropdown === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-700 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-700 transition-transform duration-300" />
                      )}
                    </div>
                  )}
                </div>

                {link.dropdown && openDropdown === index && (
                  <div className="mt-4 space-y-4 grid grid-cols-2 transition-all duration-300 ease-in-out">
                    {link.dropdown.map((item, i) => (
                      <div key={i} className="space-y-2">
                        <h6 className="font-semibold text-gray-800 text-md">
                          {item.name}
                        </h6>
                        <ul className="text-gray-600 text-sm space-y-1 pl-2">
                          {item.subItems?.map((sub, idx) => (
                            <li
                              key={idx}
                              className="hover:text-[#FF2020] cursor-pointer transition-colors duration-300"
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
        </div>
      )}
    </header>
  );
};

export default Header;
