"use client";
import React, { useState, useEffect } from "react";
import { bannerData } from "./BannerData";
const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = bannerData.length;

  useEffect(() => {
    const interval = setInterval(() => {
       setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1)) 
      ;
    }, 3000);

    return () => clearInterval(interval);
  }, [length]);

  return (
    <section>
      <div className="relative w-full overflow-hidden  m-auto">
        <div className="relative h-[40vh]  md:h-[50vh] lg:h-[50vh]  2xl:h-[90vh]  w-full">
          {bannerData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover  bg-center transition-all duration-1000 ease-in-out
                ${
                  index === current
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-100 scale-105 z-0"
                }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="relative  z-20 flex items-center h-full container mx-auto px-6">
                <div
                  className={`max-w-full  w-full lg:w-[38%]  text-black ${
                    slide.align === "right"
                      ? "ml-auto lg:mr-[2rem] text-left"
                      : "mr-auto lg:ml-[3rem] text-left"
                  }`}
                >
                  <p className="text-sm uppercase tracking-widest mb-2">
                    {slide.miniHeading}
                  </p>
                  <h2 className=" font-bold mb-4">{slide.bigHeading}</h2>
                  <p className=" mb-6">{slide.description}</p>
                  <button className="px-6 py-3 bg-black border-2 text-white hover:bg-transparent hover:border-2 hover:text-black rounded-sm shadow-md transition duration-500">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
     
      </div>
    </section>
  );
};

export default Banner;
