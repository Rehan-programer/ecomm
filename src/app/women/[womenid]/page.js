"use client";
import React from "react";
import { WomenData } from "../../Commponents/Categories/women/WomenData";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../redux/slice/favouriteslice";

export default function MenProductDetails({ params }) {
  const resolvedParams = React.use(params);
  const { womenid } = resolvedParams;
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.items);

  const product = WomenData.find((p) => String(p.id) === womenid);

  if (!product) {
    return <div className="p-8 text-red-500">❌ Product not found</div>;
  }

  const isFav = favourites.some((fav) => fav.id === product.id);

  const toggleFavourite = (item) => {
    const exists = favourites.find((fav) => fav.id === item.id);
    if (exists) {
      dispatch(removeFromFavourite(item.id));
    } else {
      dispatch(addToFavourite(item));
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="relative flex-shrink-0">
        <button
          onClick={() => toggleFavourite(product)}
          className={`absolute top-3 right-3 cursor-pointer z-10 p-2 rounded-full shadow-md transition border ${
            isFav
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          <Heart size={24} strokeWidth={2} />
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-72 h-72 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col justify-between space-y-4 flex-1">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-green-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg line-through text-gray-400">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {product.type}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {product.size}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {product.color}
          </p>
          <p>
            <span className="font-semibold">Material:</span> {product.material}
          </p>
          <p>
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> ⭐ {product.rating}
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className=" flex items-center justify-center gap-2 bg-[#FF2020] text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => dispatch(addItem(product))}
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button
            onClick={() => toggleFavourite(product)}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md border transition ${
              isFav
                ? "bg-red-500 text-white border-red-500"
                : "border-black text-black hover:bg-gray-100"
            }`}
          >
            <Heart size={18} /> {isFav ? "Remove Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
