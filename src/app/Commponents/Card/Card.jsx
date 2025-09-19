"use client"
import React from 'react'
import { useDispatch } from "react-redux";

import { addItem } from "../../../redux/slice/cartslice";
import {Heart,Search,ShoppingCart,} from "lucide-react";

 const Card = ({filteredData,scrollRef}) => {
    const dispatch = useDispatch();
  return (
    <div
            ref={scrollRef}
            className="flex lg:gap-8 gap-4  overflow-x-auto scroll-smooth scrollbar-hide py-6 px-4"
          >
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="relative  flex-shrink-0 bg-white 
                   w-[100%]  md:w-[30%] lg:w-[24%]"
              >
                <div className="relative w-full bg-black  group overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[480px] md:w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute bg-white    bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="bg-white text-black/80 font-light px-4 py-2 hover:bg-[#FF2020] transition">
                      <Heart size={28} />
                    </button>
                    <button className="bg-white text-black/80 font-light px-2  py-2  hover:bg-[#FF2020] transition">
                      <Search size={28} />
                    </button>
                    <button
                      className="bg-white text-black/80 font-ligh px-4 py-2  hover:bg-[#FF2020] transition"
                      onClick={() => dispatch(addItem(item))}
                    >
                      <ShoppingCart size={28} />
                    </button>
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-center items-center">
                  <h3 className="text-sm font-semibold text-black hover:text-[#FF2020] ">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">${item.price}</p>
                  <button
                    className=" text-black/80 block lg:hidden bg-red-500 font-ligh px-4 py-2  hover:bg-red-600 transition"
                    onClick={() => dispatch(addItem(item))}
                  >
                   Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
  )
}

export default Card
