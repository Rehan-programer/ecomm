"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SubcategoryPage = () => {
const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => { 
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/subcategory?collection=${category}&subcategory=${subcategory}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setProducts(data);
      console.log("✅ Filtered Products:", data);
    } catch (err) {
      console.error("🔥 Error fetching subcategory products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (subcategory && category) fetchProducts();
}, [subcategory, category]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] bg-[#F3EAD8]">
        <p className="text-gray-700 text-lg font-medium animate-pulse">
          Loading {subcategory} products...
        </p>
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-[#F3EAD8] py-10">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 capitalize tracking-wide">
            {subcategory} Products
          </h1>
          <p className="text-[#747691] text-sm md:text-base mt-2 flex gap-x-3 items-center">
            <Link href="/" className="hover:underline hover:text-gray-800">
              Home
            </Link>
            <span>|</span>
            <span className="capitalize text-gray-600">{subcategory}</span>
          </p>
        </div>

        {/* Product Type Cards */}
        {products?.data?.map((sub) => (
          <div key={sub._id} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-yellow-600 pl-3">
              {sub.name}
            </h2>

            {sub.productTypes?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sub.productTypes.map((type) => (
                  <div
                    key={type._id}
                    className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                  >
                    {/* Image Section */}
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={
                          type.image && type.image !== ""
                            ? type.image
                            : "/img/placeholder.webp"
                        }
                        alt={type.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between h-[160px]">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {type.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {type.description || "No description available."}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600 mt-auto">
                        <span className="font-medium text-yellow-700">
                          {type.products?.length || 0} Products
                        </span>
                        <Link
                          href={`/${category}/${subcategory}/${type.slug}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No product types found.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubcategoryPage;
