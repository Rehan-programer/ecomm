"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slice/cartslice";
import {
  toggleFavouriteInDB,
  fetchFavouritesFromDB,
} from "@/redux/slice/favouriteslice";
import { useRouter, useParams } from "next/navigation";

export default function WomenProductDetails() {
  const { womenid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.currentUser);
  const favourites = useSelector((state) => state.favourite.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${womenid}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (res.ok) {
          setProduct(data);
        } else {
          console.error("Product fetch error:", data.error);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (womenid) fetchProduct();
  }, [womenid]);

  // ✅ Fetch favourites for logged-in user
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchFavouritesFromDB(user._id));
    }
  }, [user?._id, dispatch]);

  if (loading)
    return (
      <div className="p-8 text-gray-500 text-center">⏳ Loading product...</div>
    );

  if (!product)
    return (
      <div className="p-8 text-red-500 text-center">❌ Product not found</div>
    );

  const isFav = favourites.some((fav) => fav._id === product._id);

  // ✅ Toggle Favourite
  const toggleFavourite = (item) => {
    if (!user?._id) {
      alert("Please login to add wishlist!");
      router.push("/auth");
      return;
    }
    dispatch(
      toggleFavouriteInDB({ userId: user._id, productId: item._id, item })
    );
  };

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color!");
      return;
    }
    const itemWithSelection = { ...product, selectedSize, selectedColor };
    dispatch(addItem(itemWithSelection));
  };

  // ✅ Convert DB arrays to usable format
  const sizes = Array.isArray(product.size) ? product.size : [];
  const colors = Array.isArray(product.color) ? product.color : [];

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
      {/* ✅ Product Image + Wishlist */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => toggleFavourite(product)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md border transition ${
            isFav
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          <Heart size={24} strokeWidth={2} />
        </button>

        <img
          src={product.image || "/fallback.jpg"}
          alt={product.title}
          className="w-80 h-80 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ✅ Product Details */}
      <div className="flex flex-col justify-between space-y-4 flex-1">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            {product.description || "No description available."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-green-600">
            ${product.price}
          </span>
        </div>

        {/* ✅ Sizes */}
        {sizes.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Select Size:
            </p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
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
        )}

        {/* ✅ Colors */}
   {colors.length > 0 && (
  <div>
    <p className="text-sm font-semibold text-gray-700 mb-2">
      Select Color:
    </p>
    <div className="flex gap-3 flex-wrap">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`w-16 h-10 rounded-md border text-xs font-medium transition-all flex items-center justify-center
            ${
              selectedColor === color
                ? "border-black scale-105 shadow-md"
                : "border-gray-300 hover:scale-105"
            }`}
          style={{
            backgroundColor: color.toLowerCase(),
            color:
              color.toLowerCase() === "black" ||
              color.toLowerCase() === "#000000"
                ? "white"
                : "black", // text visible even on dark colors
          }}
          title={color}
        >
          {color}
        </button>
      ))}
    </div>
  </div>
)}


        {/* ✅ Action Buttons */}
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
