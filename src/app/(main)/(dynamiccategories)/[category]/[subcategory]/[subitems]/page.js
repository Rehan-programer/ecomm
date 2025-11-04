"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategoriesCard from "../../../../../../Commponents/Categories/categoriesCard"; // ✅ adjust path if needed

export default function SubitemsPage() {
  const { category, subcategory, subitems } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/productType?collection=${category}&subcategory=${subcategory}&slug=${subitems}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch products");

        if (data?.data?.length > 0) {
          const type = data.data[0];
          setProducts(type.products || []);
          console.log("✅ Products for", subitems, ":", type.products);
        } else {
          setProducts([]);
          console.warn("⚠️ No products found for:", subitems);
        }
      } catch (error) {
        console.error("🔥 Error fetching subitems products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (subitems) fetchProducts();
  }, [subitems, category, subcategory]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-600">Loading {subitems} products...</p>
      </div>
    );

  if (!products.length)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-600">No products found for “{subitems}”.</p>
      </div>
    );

  return (
    <section className="w-full">
      <div className="container max-w-[2000px] mx-auto py-10 bg-[#F3EAD8]">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-10">
          <h5 className="text-3xl font-semibold text-black mb-4 capitalize">
            {subitems.replace("-", " ")} Products
          </h5>
          <p className="text-[#747691] text-[14px] flex gap-x-3">
            <a href="/" className="hover:text-[#FF2020]">
              Home
            </a>
            <span>|</span>
            <span className="capitalize text-black font-medium">
              {subitems.replace("-", " ")}
            </span>
          </p>
        </div>

        {/* ✅ Product Cards using CategoriesCard */}
        <CategoriesCard data={products} route={`${category}/${subcategory}/${subitems}`} />
      </div>
    </section>
  );
}
