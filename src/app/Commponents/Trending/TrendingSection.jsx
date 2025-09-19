"use client";

import { useState, useRef, useEffect } from "react";
import { trendingData } from "./TrendingData";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/slice/cartslice";

import {
  Heart,
  Search,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const categories = ["men", "women", "baby", "fashion"];

const TrendingSection = () => {
  const [activeCategory, setActiveCategory] = useState("men");
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const filteredData = trendingData.filter(
    (item) => item.category === activeCategory
  );

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const card = container.querySelector("div");
    const cardWidth = card ? card.offsetWidth : 300;

    let itemsPerView = 1;
    if (window.innerWidth >= 1024) itemsPerView = 4;
    else if (window.innerWidth >= 768) itemsPerView = 3;

    const scrollAmount = cardWidth * itemsPerView;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        handleScroll("right");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeCategory]);

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[2000px] lg:w-[90%] m-auto ">
        <div className="md:flex items-center justify-between mb-6 border-b-2">
          <h2 className="text-2xl font-bold text-black  mb-4">
            Trending This Week
          </h2>

          <div className="flex gap-6 ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`capitalize font-medium leading-[3rem]   ${
                  activeCategory === cat
                    ? "text-[#BD7B2F] border-b-3 border-[#BD7B2F]"
                    : "text-gray-500 hover:text-[#BD7B2F] hover:border-[#BD7B2F] hover:border-b-3"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[2000px] lg:w-full m-auto">
          <button
            onClick={() => handleScroll("left")}
            className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2  z-10 hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-6 px-4"
          >
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="relative  flex-shrink-0 bg-white 
                   w-[90%] sm:w-[70%] md:w-[30%] lg:w-[23%]"
              >
                <div className="relative group overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
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
                  <h3 className="text-sm font-semibold text-black hover:text-[#FF2020] ">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2  p-3   z-10 hover:scale-110 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
