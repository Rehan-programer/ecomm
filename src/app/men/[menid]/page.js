"use client";
import React, { useState } from "react";
import menProducts from "@/app/Commponents/Categories/men/MenData";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/slice/cartslice";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../redux/slice/favouriteslice";

export default function MenProductDetails({ params }) {
  const resolvedParams = React.use(params);
  const { menid } = resolvedParams;
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.items);
  const product = menProducts.find((p) => String(p.id) === menid);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    const itemWithSelection = {
      ...product,
      selectedSize,
      selectedColor,
    };
    dispatch(addItem(itemWithSelection));
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
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Select Size:
          </p>
          <div className="flex gap-2">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Select Color:
          </p>
          <div className="flex gap-2">
            {["Red", "Blue", "Gray", "White"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  selectedColor === color
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
        {(!selectedSize || !selectedColor) && (
          <p className="text-red-500 text-sm mt-2">
            ❌ Please select size and color before adding to cart.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Brand:</span> {product.brand}
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
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition ${
              selectedSize && selectedColor
                ? "bg-[#FF2020] text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
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
