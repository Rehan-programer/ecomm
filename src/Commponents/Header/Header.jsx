"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  User,
} from "lucide-react";
import { icons } from "./HeaderData";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { openProductModal } from "../../redux/slice/productslice";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const favouriteItems = useSelector((state) => state.favourite.items);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  // ==================== FETCH DATA ====================
  const { data: collections = [], isLoading: loadingCollections } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/collection");
      if (!res.ok) throw new Error("Failed to fetch collections");
      const json = await res.json();
      return json.data || [];
    },
  });

  const { data: subcategories = [], isLoading: loadingSub } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const res = await fetch("/api/subcategory");
      if (!res.ok) throw new Error("Failed to fetch subcategories");
      const json = await res.json();
      return json.data || [];
    },
  });

  const { data: producttypes = [], isLoading: loadingPT } = useQuery({
    queryKey: ["producttypes"],
    queryFn: async () => {
      const res = await fetch("/api/productType");
      if (!res.ok) throw new Error("Failed to fetch product types");
      const json = await res.json();
      return json.data || [];
    },
  });

  // ==================== COMBINE DATA ====================
  const navLinks = collections.map((collection) => {
    const dropdownItems = subcategories
      .filter(
        (sub) =>
          sub.categoryId?._id?.toString() === collection._id?.toString() ||
          sub.categoryId?.toString() === collection._id?.toString()
      )
      .map((sub) => {
        const relatedProductTypes = producttypes
          .filter(
            (pt) =>
              pt.subcategoryId?._id?.toString() === sub._id?.toString() ||
              pt.subcategoryId?.toString() === sub._id?.toString()
          )
          .map((pt) => pt.name);

        return {
          name: sub.name,
          subItems: relatedProductTypes,
          image: sub.image || "/img/default-subcategory.jpg",
          slug: sub.slug,
        };
      });

    return {
      name: collection.name,
      path: `/${collection.slug || collection.name?.toLowerCase()}`,
      image: collection.image || "/img/default-category.jpg",
      description: collection.description,
      dropdown: dropdownItems,
    };
  });

  navLinks.unshift({ name: "Home", path: "/" });
  navLinks.push({ name: "Contact", path: "/contact" });

  // ==================== SEARCH HANDLER ====================
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    const found = navLinks.find((link) => link.name.toLowerCase() === term);
    if (found) router.push(found.path);
    else alert("Page not found");
    setSearchTerm("");
  };

  // ==================== EFFECTS ====================
  useEffect(() => {
    function handleClickOutside(event) {
      if (openDropdown !== null && !event.target.closest(".desktop-dropdown")) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  // ==================== LOADING STATE ====================
  if (loadingCollections || loadingSub || loadingPT)
    return <p className="text-center py-10 text-gray-500">Loading header...</p>;

  // ==================== RENDER ====================
  return (
    <header className="bg-white shadow-md sticky z-50 top-0">
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

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 relative">
          {navLinks.map((link, index) => (
            <div key={index} className="relative desktop-dropdown">
              {link.path === "/" || link.path === "/contact" ? (
                <Link
                  href={link.path}
                  className="text-gray-700 cursor-pointer text-lg font-semibold hover:text-[#FF2020] transition-colors duration-300 ease-in-out"
                >
                  {link.name}
                </Link>
              ) : (
                <>
                  <div
                    className="text-gray-700 cursor-pointer text-lg font-semibold hover:text-[#FF2020] flex items-center gap-1"
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  >
                    {link.name}
                    {link.dropdown &&
                      (openDropdown === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      ))}
                  </div>

                  {link.dropdown &&
                    link.dropdown.length > 0 &&
                    openDropdown === index && (
                      <div className="w-full transition-all duration-300 ease-in-out left-0 top-[4rem] bg-white pt-[2%] right-0 max-w-[2000px] m-auto lg:w-[87%] fixed shadow-lg mt-2 z-50 flex justify-between">
                        <div className="flex flex-col gap-4 w-[30%] p-4 justify-center bg-gray-100">
                          <h4 className="text-xl font-bold text-gray-800">
                            {link.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {link.description}
                          </p>
                          <img
                            src={link.image}
                            alt={link.name}
                            className="w-full h-48 object-cover rounded-md mt-2"
                          />
                          <Link href={link.path}>
                            <button className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition">
                              View More
                            </button>
                          </Link>
                        </div>

                        <div className="flex items-start flex-row gap-6 w-[70%] p-6 flex-wrap">
                          {link.dropdown.map((item, i) => (
                            <div key={i} className="flex-1 p-2 min-w-[150px]">
                              <h6 className="font-semibold text-gray-800 text-lg mb-2">
                                {item.name}
                              </h6>
                              <ul className="mt-2 text-gray-600 text-md space-y-1">
                                {item.subItems.length > 0 ? (
                                  item.subItems.map((sub, idx) => (
                                    <li
                                      key={idx}
                                      className="hover:text-[#FF2020] cursor-pointer"
                                    >
                                      <Link href={`/${link.name}/${item.name}/${sub}`}>{sub}</Link>
                                    </li>
                                  ))
                                ) : (
                                  <li className="text-gray-400 italic">
                                    No product types
                                  </li>
                                )}
                              </ul>
                              <button
                                className="mt-4 text-sm text-black font-medium hover:text-[#FF2020]"
                                onClick={() =>
                                  router.push(`/${link.name}/${item.slug}`)
                                }
                              >
                                View More →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Right Icons + Auth */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden lg:flex">
            <form onSubmit={handleSearchSubmit} className="w-full flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="border rounded-[8px] px-4 py-2 text-sm text-black focus:outline-none focus:border-red-500 w-full"
              />
              <Search className="absolute right-3 text-black top-[18%]" />
            </form>
          </div>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            {icons.map((item) => {
              const IconComp = item.icon;
              const handleClick = () => {
                if (item.label === "ProductModal") dispatch(openProductModal());
              };
              return item.path ? (
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
                    className="w-6 h-6 text-gray-700 hover:text-[#FF2020]"
                    onClick={handleClick}
                  />
                </Link>
              ) : (
                <button
                  key={item.id}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label={item.label}
                  onClick={handleClick}
                >
                  <IconComp className="w-6 h-6 text-gray-700" />
                </button>
              );
            })}

            {user ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Dashboard
              </button>
            ) : (
              <Link href="/auth" className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-6 h-6 text-gray-700 hover:text-[#FF2020]" />
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ==================== MOBILE MENU ==================== */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-white overflow-y-auto p-6 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-6">
            <Image src="/img/logo.png.webp" width={100} height={100} alt="logo" />
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 hover:text-red-500"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.path === "/" || link.path === "/contact" ? (
                  <Link
                    href={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block text-lg font-semibold text-gray-700 hover:text-[#FF2020]"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <>
                    <div
                      onClick={() =>
                        setMobileDropdown((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <span className="text-lg font-semibold text-gray-700">
                        {link.name}
                      </span>
                      {mobileDropdown[index] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>

                    {mobileDropdown[index] && link.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {link.dropdown.map((sub, i) => (
                          <div key={i}>
                            <div className="font-medium text-gray-800">
                              {sub.name}
                            </div>
                            <ul className="ml-3 mt-1 text-gray-600 text-sm space-y-1">
                              {sub.subItems.map((pt, idx) => (
                                <li key={idx}>• {pt}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Mobile Dashboard/Auth */}
            {user ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-6 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Dashboard
              </button>
            ) : (
              <Link
                href="/auth"
                className="mt-6 w-full py-2 flex justify-center bg-gray-200 rounded-md"
              >
                <User className="w-6 h-6 text-gray-700" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
