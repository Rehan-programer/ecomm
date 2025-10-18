"use client";
import React, { useEffect, useState } from "react";
import CategoriesCard from "../categoriesCard";


const Baby = () => {
   const [babyProducts, setBabyProducts] = useState([]);
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch("/api/products?category=baby");
          const data = await res.json();
          if (res.ok) {
            setBabyProducts(data);
          }
        } catch (error) {
          console.error("Error fetching men products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  
  return (
    <section>
      <div className="container  max-w-[2000px]  mx-auto py-10 bg-[#F3EAD8]">
        <div className="flex flex-col justify-center items-center">
          <h5 className="text-black mb-4">Baby Products</h5>
          <p className="text-[#747691] text-[14px] flex gap-x-3">
            <a href="/">Home</a>
            <span>|</span>
            <span>Baby</span>
          </p>
        </div>

        <CategoriesCard data={babyProducts} route={"baby"} />
      </div>
    </section>
  );
};

export default Baby;
