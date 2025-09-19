"use client";
import React from "react";
import { Heart, Search, ShoppingCart } from "react-feather";

const Women = ({ products }) => {
  return (
    <section>
      <div className="container  max-w-[2000px]  mx-auto py-10 bg-[#F3EAD8]">
        <div className="flex flex-col justify-center items-center">
          <h5 className="text-black mb-4">Women's Products</h5>
          <p className="text-[#747691] text-[14px] flex gap-x-3">
            <a href="/">Home</a>
            <span>|</span>
            <span>Women</span>
          </p>
        </div>

        {/* Product Grid */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 bg-white p-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 bg-white w-[90%] sm:w-[70%] md:w-[30%] lg:w-[23%]"
            >
              <div className="relative group overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bg-white px-4 py-2 bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[Heart, Search, ShoppingCart].map((Icon, i) => (
                    <button
                      key={i}
                      className="bg-white text-black/80 font-light hover:scale-110 transition"
                    >
                      <Icon size={28} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 flex flex-col justify-center items-center">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Women;
