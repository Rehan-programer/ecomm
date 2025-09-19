import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#171613] text-white px-6 md:px-12 lg:px-24 py-10">
      <div className="text-center  max-w-[2000px] lg:w-[90%] mx-auto   justify-between flex flex-col md:flex-col lg:flex-row  items-center md:items-start lg:items-center mb-10">
        <div className="flex-col items-start md:text-left text-center  ">
          <h2 className="text-xl font-semibold mb-1">Subscribe Newsletter</h2>
          <p className="text-sm text-white mb-4">
            Subscribe newsletter to get 5% on all products.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:mb-4  items-center space-y-2 md:space-y-0 md:space-x-2   p-2 rounded-md w-full max-w-xl">
          {/* Input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="h-[50px] md:h-[70px] md:flex-1 px-4 py-2 text-black   outline-none bg-white"
          />

          {/* Button */}
          <button className="bg-red-600 mb-4 md:mb-0 h-[50px] md:h-[70px] hover:bg-red-700 px-6 py-2 text-white font-medium">
            Subscribe
          </button>
        </div>

        <div className="flex justify-center md:justify-end  space-x-4 text-xl text-gray-300">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
        </div>
      </div>

      <hr className="border-gray-800 my-8" />
      <div className=" md:hidden col-span-1 md:col-span-1 flex items-center md:items-start md:justify-start justify-center">
        <img src="/img/logo2_footer.png.webp" alt="Logo" className="w-32" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6  max-w-[2000px] w-full lg:w-[90%] mx-auto px-6 py-10 text-sm text-[#7b7b7a]">
       
        <div className=" hidden  col-span-1 md:col-span-1 md:flex items-start">
          <img src="/img/logo2_footer.png.webp" alt="Logo" className="w-34 md:w-44 lg:w-40" />
        </div>
       
        <div>
          <p className="text-white font-semibold mb-3">Shop Men</p>
          <ul className="space-y-2 leading-relaxed">
            <li>Clothing Fashion</li>
            <li>Winter</li>
            <li>Summer</li>
            <li>Formal</li>
            <li>Casual</li>
          </ul>
        </div>

       
        <div>
          <p className="text-white font-semibold mb-3">Shop Women</p>
          <ul className="space-y-2 leading-relaxed">
            <li>Clothing Fashion</li>
            <li>Winter</li>
            <li>Summer</li>
            <li>Formal</li>
            <li>Casual</li>
          </ul>
        </div>


        <div>
          <p className="text-white font-semibold mb-3">Baby Collection</p>
          <ul className="space-y-2 leading-relaxed">
            <li>Clothing Fashion</li>
            <li>Winter</li>
            <li>Summer</li>
            <li>Formal</li>
            <li>Casual</li>
          </ul>
        </div>

     
        <div>
          <p className="text-white font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 leading-relaxed">
            <li>Track Your Order</li>
            <li>Support</li>
            <li>FAQ</li>
            <li>Carrier</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-800 my-8" />

      <div className="text-center text-[white] text-sm">
        <p>
          Copyright ©2025 All rights reserved | This template is made with{" "}
          <span className="text-red-600 inline-flex items-center">
            <FaHeart className="mx-1" /> by{" "}
            <span className="ml-1 text-white font-medium">Colorlib</span>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
