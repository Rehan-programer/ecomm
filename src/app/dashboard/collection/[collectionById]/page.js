"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function CollectionPage() {
  const {collectionById}=useParams();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    image: "",
    title: "",
    categoryId: "",
    subcategoryId: "",
    productTypeId: "",
    price: "",
    size: [],
    color: [],
    brand: "",
    stock: 0,
    status: "In Stock",
    active: true,
  });

  const [collections, setCollections] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  // 🔹 Fetch Dropdowns


  useEffect(() => {
    async function fetchDropdownData() {
      try {
        const [colRes, subRes, typeRes] = await Promise.all([
          fetch("/api/collection"),
          fetch("/api/subcategory"),
          fetch("/api/productType"),
        ]);
        const [colData, subData, typeData] = await Promise.all([
          colRes.json(),
          subRes.json(),
          typeRes.json(),
        ]);
        setCollections(colData.data);
        setSubcategories(subData.data);
        setProductTypes(typeData.data);
      } catch (err) {
        console.error("Dropdown fetch failed:", err);
      }
    }
    fetchDropdownData();
  }, []);

  // 🔹 Fetch Products (v5 object syntax)
const { data: products = [], isLoading, isError } = useQuery({
  queryKey: ["products", collectionById],
  queryFn: async () => {
    if (!collectionById) return []; // 🚨 If no collection, return empty array

    const res = await fetch(`/api/products?categoryId=${collectionById}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    return json.data || [];
  },
  enabled: !!collectionById, // ⚡ Only fetch if collectionById exists
});


  // 🔹 Add / Update Product Mutation
  const saveMutation = useMutation({
    mutationFn: async (product) => {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `/api/products?id=${editingProduct._id}`
        : `/api/products`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to save product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", collectionById] });
      resetForm();
      setEditingProduct(null);
      setShowModal(false);
    },
  });

  // 🔹 Delete Product Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      return id;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products", collectionById] }),
  });

  // 🔹 Toggle Active Mutation
  const toggleMutation = useMutation({
    mutationFn: async ({ id, active }) => {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products", collectionById] }),
  });

  const resetForm = () => {
    setForm({
      image: "",
      title: "",
      categoryId: "",
      subcategoryId: "",
      productTypeId: "",
      price: "",
      size: [],
      color: [],
      brand: "",
      stock: 0,
      status: "In Stock",
      active: true,
    });
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm(product);
    setShowModal(true);
  };

if (isLoading) return <div>Loading products...</div>;
if (isError) return <div>Failed to load products</div>;


  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {collectionById?.toUpperCase()} Products
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingProduct(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Size</th>
              <th className="p-3">Color</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Active</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      src={item.image || "/img/no-image.png"}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-semibold text-black">{item.title}</td>
                  <td className="p-3">${item.price}</td>
                  <td className="p-3">{item.brand}</td>
                  <td className="p-3">{item.size?.join(", ")}</td>
                  <td className="p-3">{item.color?.join(", ")}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        toggleMutation.mutate({ id: item._id, active: !item.active })
                      }
                      className={`px-3 py-1 rounded-full text-white ${
                        item.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(item._id)}
                      className="ml-2 text-red-600 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[450px] relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(form);
              }}
              className="space-y-3"
            >
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, categoryId: e.target.value }))
                }
                className="w-full border p-2 rounded-md text-black"
                required
              >
                <option value="">Select Category</option>
                {collections?.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.name}
                  </option>
                ))}
              </select>

              <select
                name="subcategoryId"
                value={form.subcategoryId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, subcategoryId: e.target.value }))
                }
                className="w-full border p-2 rounded-md text-black"
                required
              >
                <option value="">Select Subcategory</option>
                {subcategories?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <select
                name="productTypeId"
                value={form.productTypeId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, productTypeId: e.target.value }))
                }
                className="w-full border p-2 rounded-md text-black"
                required
              >
                <option value="">Select Product Type</option>
                {productTypes?.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Product Title"
                className="w-full border p-2 rounded-md text-black"
                required
              />

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                placeholder="Image URL"
                className="w-full border p-2 rounded-md text-black"
              />

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="Price"
                className="w-full border p-2 rounded-md text-black"
                required
              />

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
                placeholder="Brand"
                className="w-full border p-2 rounded-md text-black"
              />

              <input
                type="text"
                name="size"
                value={form.size.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    size: e.target.value.split(",").map((s) => s.trim()),
                  }))
                }
                placeholder="Enter sizes (e.g. S, M, L, XL)"
                className="w-full border p-2 rounded-md text-black"
              />

              <input
                type="text"
                name="color"
                value={form.color.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    color: e.target.value.split(",").map((c) => c.trim()),
                  }))
                }
                placeholder="Enter colors (e.g. Red, Blue, Black)"
                className="w-full border p-2 rounded-md text-black"
              />

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
                placeholder="Stock Quantity"
                className="w-full border p-2 rounded-md text-black"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, active: e.target.checked }))
                  }
                />
                <span>Active</span>
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingProduct ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
