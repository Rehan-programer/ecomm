"use client"
import React from 'react';
import {
  FaTruck,
  FaCreditCard,
  FaMoneyBillWave,
  FaHeadset
} from 'react-icons/fa';

const FeatureCard = ({ Icon, title, subtitle }) => (
  <div className="flex flex-col items-center text-center px-4 py-8">
    <Icon className="text-4xl text-blue-900 mb-4" />
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
  </div>
);

const Features = () => {
  return (
    <section className="w-full bg-white ">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 lg:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
          <FeatureCard
            Icon={FaTruck}
            title="Fast & Free Delivery"
            subtitle="Free delivery on all orders"
          />
          <FeatureCard
            Icon={FaCreditCard}
            title="Secure Payment"
            subtitle="Free delivery on all orders"
          />
          <FeatureCard
            Icon={FaMoneyBillWave}
            title="Money Back Guarantee"
            subtitle="Free delivery on all orders"
          />
          <FeatureCard
            Icon={FaHeadset}
            title="Online Support"
            subtitle="Free delivery on all orders"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
