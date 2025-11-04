"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const CategoryPage = () => {
  // const { category } = useParams();
  const params = useParams();
  const category = params?.category || "";

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`/api/subcategory?collection=${category}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        setSubcategories(data.data || []);
        console.log(`✅ ${category} Subcategories:`, data.data);
      } catch (error) {
        console.error(`🔥 Error fetching ${category} subcategories:`, error);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchSubcategories();
  }, [category]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading {category} subcategories...
        </p>
      </div>
    );

  return (
    <section className="w-full bg-[#F3EAD8]">
      <div className="container max-w-[2000px] mx-auto py-10 bg-[#F3EAD8] px-4">
        {/* Page Header */}
        <div className="flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize">
            {category}&apos;s Collection
          </h1>
          <p className="text-[#747691] text-[14px] flex gap-x-3 mt-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>|</span>
            <span className="capitalize">{category}</span>
          </p>
        </div>

        {/* Subcategory Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col items-center"
            >
              {/* ✅ Clickable Subcategory Area */}
              <Link
                href={`/${String(category)}/${sub.slug}`}
                className="w-full"
              >
                {/* Image */}
                <div className="w-full h-48 bg-gray-100 rounded-xl flex justify-center items-center overflow-hidden">
                  <img
                    src={sub.image || "/img/placeholder.png"}
                    alt={sub.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Subcategory Title */}
                <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize text-center hover:text-red-500 transition">
                  {sub.name}
                </h2>
              </Link>

              {/* ✅ Product Types Section (separate links) */}
              {sub.productTypes?.length > 0 ? (
                <div className="mt-3 w-full text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-sm mb-2">Product Types</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {sub.productTypes.map((pt) => (
                      <Link
                        key={pt._id}
                        href={`/${category}/${sub.slug}/${pt.name}`}
                        className="px-3 py-1 text-sm border rounded-full bg-white text-gray-700 hover:bg-gray-200 transition"
                      >
                        {pt.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm mt-2">No product types</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
