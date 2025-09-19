"use client";

import { useState, useRef, useEffect } from "react";
import { trendingData } from "./TrendingData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";
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
    <section className="py-10 px-4  bg-white">
      <div className="max-w-[2000px] lg:w-[90%] m-auto ">
        <div className="md:flex items-center justify-between mb-6 border-b-2">
          <h2 className="text-2xl font-bold text-black  mb-4">
            Trending This Week
          </h2>

          <div className="flex gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`capitalize font-medium leading-[3rem] border-b-2 
        ${
          activeCategory === cat
            ? "text-[#BD7B2F] border-[#BD7B2F]"
            : "text-gray-500 border-transparent hover:text-[#BD7B2F] hover:border-[#BD7B2F]"
        }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-full m-auto">
          <button
            onClick={() => handleScroll("left")}
            className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2  z-10 hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          <Card filteredData={filteredData} scrollRef={scrollRef} />

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
