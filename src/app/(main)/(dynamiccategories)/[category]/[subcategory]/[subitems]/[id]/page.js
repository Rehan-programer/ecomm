"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Heart } from "lucide-react";
import { addItem } from "@/redux/slice/cartslice";
import {
  fetchFavouritesFromDB,
  toggleFavouriteInDB,
  toggleLocalFavourite,
  clearFavourites,
} from "@/redux/slice/favouriteslice";

export default function ProductDetailsPage() {
  const { id, category, subcategory, subitems } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user?.currentUser);
  const favourites = useSelector((state) => state.favourite?.items) || [];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // 🧠 Load favourites when user logs in
  useEffect(() => {
    if (user?._id) dispatch(fetchFavouritesFromDB(user._id));
    else dispatch(clearFavourites());
  }, [user?._id, dispatch]);

  // 🧠 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `/api/products?categoryId=${category}&subcategory=${subcategory}&producttype=${subitems}&productTitle=${id}`
        );
        const data = await res.json();

        if (data?.data?.length > 0) setProduct(data.data[0]);
        else setProduct(null);
      } catch (error) {
        console.error("🔥 Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, category, subcategory, subitems]);

  // 🧠 Add to Cart
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItem({ ...product, selectedColor, selectedSize }));
  };

  // 🧠 Toggle Favourite
  const toggleFavourite = () => {
    if (!user?._id) {
      alert("Please login to add favourites");
      router.push("/auth");
      return;
    }
    dispatch(toggleLocalFavourite(product));
    dispatch(toggleFavouriteInDB({ userId: user._id, productId: product._id }));
  };

  // 🧠 Check if already favourite
  const isFav = favourites.some((fav) => fav._id === product?._id);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading product details...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );

  // ✅ Normalize color/size arrays
  const colors = Array.isArray(product.color)
    ? product.color
    : product.color?.split(",") || [];
  const sizes = Array.isArray(product.size)
    ? product.size
    : product.size?.split(",") || [];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* ✅ Left: Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.image || "/img/placeholder.png"}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* ✅ Right: Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize">
            {product.title}
          </h1>
          <p className="text-gray-500">
            {product.description || "No description available."}
          </p>

          <div className="text-2xl font-bold text-[#FF2020]">
            ${product.price}
          </div>

          {/* Sizes */}
          {sizes.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-1">Available Sizes:</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded-lg text-sm transition ${
                      selectedSize === size
                        ? "bg-[#FF2020] text-white border-[#FF2020]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-1">Colors:</p>
              <div className="flex gap-2">
                {colors.map((clr, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(clr)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === clr
                        ? "border-[#FF2020] scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: clr }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <p
            className={`font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#FF2020] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-600 transition"
              disabled={
                (colors.length > 0 && !selectedColor) ||
                (sizes.length > 0 && !selectedSize)
              }
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <button
              onClick={toggleFavourite}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 border transition ${
                isFav
                  ? "bg-[#FF2020] text-white border-[#FF2020]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Heart className="w-5 h-5" />
              {isFav ? "Favourited" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
