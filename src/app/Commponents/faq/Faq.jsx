"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How long does shipping take?",
      answer:
        "BCP fulfills all orders in-house, which means we're able to ship directly to you within 2-7 business days.",
    },
    {
      question: "Is shipping really free?",
      answer:
        "Yes, we offer free shipping on all orders over $50. For orders below $50, a flat shipping rate of $5.99 applies.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
    },
    {
      question: "Are instruction manuals available online?",
      answer:
        "Yes, all our product instruction manuals are available for download on our website in the product support section.",
    },
    {
      question: "Are instruction manuals available online?",
      answer:
        "Yes, all our product instruction manuals are available for download on our website in the product support section.",
    },
    {
      question: "Are instruction manuals available online?",
      answer:
        "Yes, all our product instruction manuals are available for download on our website in the product support section.",
    },
    {
      question: "Are instruction manuals available online?",
      answer:
        "Yes, all our product instruction manuals are available for download on our website in the product support section.",
    },
    {
      question: "Are instruction manuals available online?",
      answer:
        "Yes, all our product instruction manuals are available for download on our website in the product support section.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-[2000px] lg:w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h1>
        <p className="text-xl text-gray-600 mb-6">Answers to Your Questions</p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Find our most frequently asked questions and answers here. For more
          questions that aren't so frequent, click below!
        </p>
      </div>

      <div className="flex items-start flex-wrap gap-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="w-full md:w-full lg:w-[48%] border border-gray-200 rounded-lg bg-white transition-all duration-200 hover:shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <span className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
              )}
            </button>

            <div
              id={`content-${index}`}
              className={`transition-max-height ${
                activeIndex === index ? "open" : ""
              } px-6`}
            >
              <p className="text-gray-600 leading-relaxed py-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
