"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  deleteProduct,
  addProduct,
  updateProduct,
  fetchBabyProducts,
} from "../../../redux/slice/babyproductslice";

export default function BabyProductsPage() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.babyProducts);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    image: "",
    title: "",
    category: "Baby",
    price: "",
    size: [],
    color: [],
    brand: "",
    stock: "",
    status: "In Stock",
    active: true,
  });

  useEffect(() => {
    if (status === "idle") dispatch(fetchBabyProducts());
  }, [dispatch, status]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return alert("Title & Price required!");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(addProduct(data));
        setForm({
          image: "",
          title: "",
          category: "Baby",
          price: "",
          size: [],
          color: [],
          brand: "",
          stock: "",
          status: "In Stock",
          active: true,
        });
        setShowModal(false);
      } else alert("Failed to add product!");
    } catch (err) {
      console.error(err);
      alert("Error adding product!");
    }
  };

  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) setSelectedProducts(products.map((p) => p._id));
    else setSelectedProducts([]);
  };

  const handleDelete = async () => {
    if (!confirm("Delete selected products?")) return;
    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`/api/products?id=${id}`, { method: "DELETE" })
        )
      );
      selectedProducts.forEach((id) => dispatch(deleteProduct(id)));
      setSelectedProducts([]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete products!");
    }
  };

  const handleToggleActive = async (product) => {
    const updated = { ...product, active: !product.active };
    try {
      const res = await fetch(`/api/products?id=${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: updated.active }),
      });
      const data = await res.json();
      if (res.ok) dispatch(updateProduct(data));
    } catch (err) {
      console.error(err);
      alert("Failed to update product!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Baby Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
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
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((item) => (
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
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-gray-600">{item.category}</td>
                  <td className="p-3 font-semibold">${item.price}</td>
                  <td className="p-3 text-gray-600">{item.stock}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`px-4 py-1 rounded-full text-white ${
                        item.active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[450px] relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
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
                type="number"
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
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border text-black p-2 rounded-md"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border text-black p-2 rounded-md"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />
                <span>Active</span>
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
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
