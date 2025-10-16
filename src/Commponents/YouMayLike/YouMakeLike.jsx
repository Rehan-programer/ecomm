"use client";
import React, { useRef } from "react";
import Card from "../Card/Card";
import products from "../ProductData.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const YouMakeLikess = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const card = container.firstElementChild;
    const cardWidth = card ? card.offsetWidth : 500;

    let itemsPerView = 1;
    if (window.innerWidth >= 1024) itemsPerView = 4;
    else if (window.innerWidth >= 768) itemsPerView = 2;
    else if (window.innerWidth <= 768) itemsPerView = 1;

    const scrollAmount = cardWidth * itemsPerView;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 px-4 bg-white relative">
      <div className=" relative max-w-[2000px] lg:w-[90%] m-auto">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          You May Like
        </h2>
        <button
          onClick={() => handleScroll("left")}
          className="text-black hover:cursor-pointer hidden md:flex absolute left-2 lg:-left-10 top-1/2 -translate-y-1/2 z-10 
                     p-3 rounded-full hover:scale-110 transition"
        >
          <ChevronLeft />
        </button>
        <div
          // ref={scrollRef}
          className="flex gap-4 lg:gap-8 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          <Card filteredData={products.youLikeData} scrollRef={scrollRef} />
        </div>
        <button
          onClick={() => handleScroll("right")}
          className=" text-black hover:cursor-pointer hidden md:flex absolute right-2 lg:-right-10 top-1/2 -translate-y-1/2 z-10 
                      p-3 rounded-full hover:scale-110 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
