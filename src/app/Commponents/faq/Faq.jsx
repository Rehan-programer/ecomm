"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "How long does shipping take?",
            answer: "BCP fulfills all orders in-house, which means we're able to ship directly to you within 2-7 business days."
        },
        {
            question: "Is shipping really free?",
            answer: "Yes, we offer free shipping on all orders over $50. For orders below $50, a flat shipping rate of $5.99 applies."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay."
        },
        {
            question: "Are instruction manuals available online?",
            answer: "Yes, all our product instruction manuals are available for download on our website in the product support section."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h1>
                <p className="text-xl text-gray-600 mb-6">Answers to Your Questions</p>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Find our most frequently asked questions and answers here. For more questions that aren't so frequent, click below!
                </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 mb-12">
                {faqData.map((faq, index) => (
                    <div 
                        key={index} 
                        className="border border-gray-200 rounded-lg bg-white transition-all duration-200 hover:shadow-sm"
                    >
                        {/* Question Button */}
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

                        {/* Answer Section with Animation */}
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                activeIndex === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="px-6 pb-4">
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Questions Button */}
            <div className="text-center">
                <button className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md">
                    More Questions
                </button>
            </div>
        </div>
    );
};

export default Faq;