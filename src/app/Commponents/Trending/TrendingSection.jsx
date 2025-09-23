"use client";

import { useState, useRef, useEffect } from "react";
import { trendingData } from "./TrendingData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../Card/Card";

const categories = ["men", "women", "baby", "fashion"];

const TrendingSection = () => {
  const [activeCategory, setActiveCategory] = useState("men");
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const filteredData = trendingData.filter(
    (item) => item.category === activeCategory
  );
const handleScroll = (direction) => {
  if (!scrollRef.current) return;

  const container = scrollRef.current;
  const card = container.querySelector("div");
  const cardWidth = card ? card.offsetWidth : 400;

  let itemsPerView = 1;
  if (window.innerWidth >= 1024) itemsPerView = 4;
  else if (window.innerWidth >= 768) itemsPerView = 2;


  const scrollAmount = cardWidth * itemsPerView;

  container.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};


  useEffect(() => {
    if (isHovered) return;

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
  }, [activeCategory, isHovered]);

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[2000px] lg:w-[90%] md:w-[90%] m-auto">
        <div className="md:flex items-center justify-between mb-6 border-b-2">
          <h2 className="text-2xl font-bold text-black mb-4">
            Trending This Week
          </h2>

          <div className="flex gap-6 hover:cursor-pointer">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`capitalize font-medium hover:cursor-pointer leading-[3rem] border-b-2 
                  ${
                    activeCategory === cat
                      ? "text-red-500 border-red-500"
                      : "text-gray-500 border-transparent hover:text-red-500 hover:border-red-500"
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
            className=" text-black text-5xl hidden hover:cursor-pointer md:flex absolute -left-8 top-[40%] -translate-y-[40%] z-10 hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Card filteredData={filteredData} scrollRef={scrollRef} />
          </div>

          <button
            onClick={() => handleScroll("right")}
            className=" text-black hover:cursor-pointer text-5xl hidden md:flex absolute -right-8 top-[40%] -translate-y-[30%]  z-10 hover:scale-110 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
