"use client";
import React, { useEffect, useState } from "react";
import CategoriesCard from "../categoriesCard";

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (res.ok) {
       
          const filtered = data.filter(
            (product) =>
              product.Category?.toLowerCase() === "men" ||
              product.category?.toLowerCase() === "men"
          );
          setMenProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching men products:", error);
      }
    };

    fetchProducts();
  }, []);
console.log('menProducts============>',menProducts);

  return (
    <section className="w-full">
      <div className="container max-w-[2000px] mx-auto py-10 bg-[#F3EAD8]">
        <div className="flex flex-col justify-center items-center">
          <h5 className="text-black mb-4">Men's Products</h5>
          <p className="text-[#747691] text-[14px] flex gap-x-3">
            <a href="/">Home</a>
            <span>|</span>
            <span>Men</span>
          </p>
        </div>

        <CategoriesCard data={menProducts} route={"men"} />
      </div>
    </section>
  );
};

export default Men;
