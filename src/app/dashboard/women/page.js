"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  deleteProduct,
  addProduct,
} from "../../../redux/slice/womenproductslice"; // ✅ Correct slice

export default function WomenProductsPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.womenProducts); // ✅ Correct state
  console.log("products======>", products);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productStates, setProductStates] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    image: "",
    title: "",
    category: "Women",
    price: "",
    size: [],
    color: [],
    brand: "",
    stock: "",
    status: "In Stock",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

const handleAddProduct = async (e) => {
  e.preventDefault();

  // validation
  if (!form.title || !form.price) {
    alert("⚠️ Please fill in product title and price.");
    return;
  }

  try {
    const res = await fetch(`/api/products?category=${form.category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "✅ Product added successfully!");
      dispatch(addProduct(data.product));

      setForm({
        image: "",
        title: "",
        category: "",
        price: "",
        size: [],
        color: [],
        brand: "",
        stock: "",
        status: "In Stock",
        active: true,
      });

      setShowModal(false);
    } else {
      alert("❌ Failed to add product.");
    }
  } catch (err) {
    console.error("Error adding product:", err);
    alert("❌ Error adding product.");
  }
};


  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((p) => p._id)); // ✅ Use _id
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete selected products?")) {
      try {
        console.log("Deleting IDs:", selectedProducts);

        await Promise.all(
          selectedProducts.map((id) =>
            fetch(`/api/products?id=${id}`, { method: "DELETE" })
          )
        );

        selectedProducts.forEach((id) => dispatch(deleteProduct(id)));

        alert("🗑️ Selected products deleted successfully!");
        setSelectedProducts([]);
      } catch (error) {
        console.error("Error deleting products:", error);
        alert("❌ Failed to delete products.");
      }
    }
  };

  const handleToggleState = (id) => {
    setProductStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-black font-bold">Women Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-3 mb-4 bg-white shadow-md rounded-lg p-3">
          <p className="font-medium text-gray-700">
            {selectedProducts.length} item
            {selectedProducts.length > 1 ? "s" : ""} selected
          </p>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={
                    products.length > 0 &&
                    selectedProducts.length === products.length
                  }
                />
              </th>
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Size</th>
              <th className="p-3">Color</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Qty</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Active</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((item) => {
                const currentState = productStates[item._id] ?? true;
                return (
                  <tr
                    key={item._id}
                    className={`transition-all duration-150 ${
                      selectedProducts.includes(item._id)
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>
                    <td className="p-3">
                      <img
                        src={item.image || "/img/no-image.png"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="p-3 font-medium text-black">{item.title}</td>
                    <td className="p-3 text-gray-600">{item.category}</td>
                    <td className="p-3 text-gray-700 font-semibold">
                      ${item.price}
                    </td>
                    <td className="p-3 text-gray-600">
                      {Array.isArray(item.size)
                        ? item.size.join(", ")
                        : item.size}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {Array.isArray(item.color)
                          ? item.color.map((clr, i) => (
                              <div
                                key={i}
                                className="w-5 h-5 rounded-full border border-gray-300"
                                style={{ backgroundColor: clr }}
                                title={clr}
                              ></div>
                            ))
                          : item.color}
                      </div>
                    </td>

                    <td className="p-3 text-gray-600">{item.brand}</td>
                    <td className="p-3 text-gray-600">{item.stock}</td>
                    <td className="p-3 text-center">
                      <span
                        className={
                          item.stock > 0
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {item.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggleState(item._id)}
                        className={`w-24 py-1 rounded-full text-white font-semibold transition-colors duration-200 ${
                          currentState
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {currentState ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[450px] relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Add New Product
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-3">
              {/* ✅ Same inputs as Baby/Men */}
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border text-black p-2 rounded-md"
              />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border text-black p-2 rounded-md"
              />
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border text-black p-2 rounded-md"
              />
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full border text-black p-2 rounded-md"
              />

              <input
                type="text"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border text-black p-2 rounded-md"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
