"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartslice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // redux se products lao
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id == id);

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8">
      {/* Left: Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-[400px] h-[400px] object-cover rounded-lg shadow"
        />
      </div>

      {/* Right: Details */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2 text-lg">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        <button
          onClick={() => dispatch(addItem(product))}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
