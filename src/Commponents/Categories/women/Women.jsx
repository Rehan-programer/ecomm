"use client";
import React, { useEffect, useState } from "react";
import CategoriesCard from "../categoriesCard";

const Women = () => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (res.ok) {
       
          const filtered = data.filter(
            (product) =>
              product.Category?.toLowerCase() === "women" ||
              product.category?.toLowerCase() === "women"
          );
          setWomenProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching women products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <div className="container max-w-[2000px] mx-auto py-10 bg-[#F3EAD8]">
        <div className="flex flex-col justify-center items-center">
          <h5 className="text-black mb-4">Women's Products</h5>
          <p className="text-[#747691] text-[14px] flex gap-x-3">
            <a href="/">Home</a>
            <span>|</span>
            <span>Women</span>
          </p>
        </div>

        <CategoriesCard data={womenProducts} route={"women"} />
      </div>
    </section>
  );
};

export default Women;
