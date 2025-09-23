"use client";
import React from "react";
import { FaTruck, FaCreditCard, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const FeatureCard = ({ Icon, title, subtitle, }) => {
  return (
    <div
      className={` shadow-xl rounded-2xl flex flex-col justify-center items-center gap-2 p-8 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl`}
    >
      <div className="text-4xl lg:text-5xl  text-indigo-600">
        <Icon />
      </div>
      <div className="text-center">
        <h6 className="text-xl font-semibold text-gray-800">{title}</h6>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="w-full bg-whote  py-8">
      <div className="max-w-[2000px] lg:w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Our Services
          </h2>
          <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
            We provide top-notch services to make your shopping smooth and enjoyable.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            Icon={FaTruck}
            title="Fast & Free Delivery"
            subtitle="Get your orders delivered quickly"
            shadow="shadow-sm"
          />
          <FeatureCard
            Icon={FaCreditCard}
            title="Secure Payment"
            subtitle="Your transactions are safe with us"
            shadow="shadow-md"
          />
          <FeatureCard
            Icon={FaMoneyBillWave}
            title="Money Back Guarantee"
            subtitle="30-day hassle-free returns"
            shadow="shadow-lg"
          />
          <FeatureCard
            Icon={FaHeadset}
            title="24/7 Support"
            subtitle="Always here to assist you"
            shadow="shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
