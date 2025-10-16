"use client";
import Link from "next/link";

const categories = [
  {
    name: "Men",
    image: "/img/fashion-img/fashion-1.webp",
    route: "/dashboard/men",
    description: "Explore a wide range of men's clothing and accessories."
  },
  {
    name: "Women",
    image: "/img/fashion-img/fashion-3.webp",
    route: "/dashboard/women",
    description: "Discover stylish collections for women."
  },
  {
    name: "Baby",
    image: "/images/baby.jpg",
    route: "/dashboard/baby",
    description: "Cute and comfy wear for your little ones."
  },
  {
    name: "Trending",
    image: "/images/trending.jpg",
    route: "/dashboard/trending",
    description: "Check out what's trending right now!"
  },
  {
    name: "Best Seller",
    image: "/images/bestseller.jpg",
    route: "/dashboard/bestseller",
    description: "Top-selling products loved by our customers."
  },
];

export default function CollectionPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Product Categories</h1>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex  flex-col md:flex-col bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Left 70% Section */}
            <div className=" relative group">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover bg-center"
              />
              <Link href={cat.route}>
                <button className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-opacity-90 transition">
                  {cat.name}
                </button>
              </Link>
            </div>

            {/* Right 30% Section */}
            <div className=" p-6 flex items-center">
              <p className="text-gray-700 text-base">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
