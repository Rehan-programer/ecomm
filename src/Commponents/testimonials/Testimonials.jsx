"use client";

import React, { useState } from "react";
import testimonials from "../testimonials/TestimonialData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-[#F3EAD8] py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-black mb-8">
          Customer Testimonials
        </h2>
        <div className="relative max-w-2xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-6 py-8"
              >
                <p className="text-gray-800 text-lg mb-6 text-center">
                  "{item.message}"
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full border-4"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-black">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 left-0 ml-2 text-gray-500 p-2 rounded-full text-[30px] z-20 "
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 right-0 mr-2 text-gray-500 p-2 rounded-full text-[30px] z-20 "
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
