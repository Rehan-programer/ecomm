"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteProduct, addProduct, updateProduct } from "../../../redux/slice/menproductslice";

export default function MenProductsPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.menProducts);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productStates, setProductStates] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
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

  useEffect(() => {
    const initialStates = {};
    products.forEach((p) => (initialStates[p._id] = p.active));
    setProductStates(initialStates);
  }, [products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      alert("⚠️ Please fill in product title and price.");
      return;
    }

    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `/api/products?id=${editingProduct._id}`
      : `/api/products?category=${form.category}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(editingProduct ? "✅ Product updated!" : "✅ Product added!");
        editingProduct
          ? dispatch(updateProduct(data.product))
          : dispatch(addProduct(data.product));

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
        setEditingProduct(null);
        setShowModal(false);
      } else alert("❌ Something went wrong.");
    } catch (err) {
      console.error("Error saving product:", err);
      alert("❌ Error saving product.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete selected products?")) return;
    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`/api/products?id=${id}`, { method: "DELETE" })
        )
      );
      selectedProducts.forEach((id) => dispatch(deleteProduct(id)));
      alert("🗑️ Products deleted!");
      setSelectedProducts([]);
    } catch (err) {
      console.error("Error deleting products:", err);
    }
  };

  const handleToggleState = async (item) => {
    const newActive = !item.active;
    setProductStates((prev) => ({ ...prev, [item._id]: newActive }));

    try {
      const res = await fetch(`/api/products?id=${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, active: newActive }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(updateProduct(data.product));
      }
    } catch (err) {
      console.error("Error updating state:", err);
    }
  };

  const toggleSelect = (id) =>
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = (e) =>
    setSelectedProducts(e.target.checked ? products.map((p) => p._id) : []);

  const openEditModal = (item) => {
    setEditingProduct(item);
    setForm(item);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl text-black font-bold">Men Products</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingProduct(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-3 mb-4 bg-white shadow-md rounded-lg p-3">
          <p className="font-medium text-gray-700">{selectedProducts.length} selected</p>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={products.length > 0 && selectedProducts.length === products.length}
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
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr key={item._id} className={`transition-all duration-150 ${selectedProducts.includes(item._id) ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                  <td className="p-3 text-center">
                    <input type="checkbox" checked={selectedProducts.includes(item._id)} onChange={() => toggleSelect(item._id)} />
                  </td>
                  <td className="p-3">
                    <img src={item.image || "/img/no-image.png"} alt={item.title} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                  </td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-gray-600">{item.category}</td>
                  <td className="p-3 text-gray-700 font-semibold">${item.price}</td>
                  <td className="p-3 text-gray-600">{Array.isArray(item.size) ? item.size.join(", ") : item.size}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {Array.isArray(item.color)
                        ? item.color.map((clr, i) => <div key={i} className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: clr }}></div>)
                        : item.color}
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{item.brand}</td>
                  <td className="p-3 text-gray-600">{item.stock}</td>
                  <td className="p-3 text-center">
                    <span className={`${item.stock > 0 ? "text-green-600" : "text-red-600"} font-semibold`}>
                      {item.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggleState(item)}
                      className={`w-24 py-1 rounded-full text-white font-semibold transition ${productStates[item._id] ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                    >
                      {productStates[item._id] ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => openEditModal(item)} className="text-blue-600 font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center p-6 text-gray-500">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {products.map((item) => (
          <div key={item._id} className="bg-white text-black rounded-lg shadow-sm p-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{item.title}</span>
              <input type="checkbox" checked={selectedProducts.includes(item._id)} onChange={() => toggleSelect(item._id)} />
            </div>
            <img src={item.image || "/img/no-image.png"} alt={item.title} className="w-full h-40 object-cover rounded-md" />
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Sizes:</strong> {Array.isArray(item.size) ? item.size.join(", ") : item.size}</p>
            <p className="flex items-center gap-1">
              <strong>Colors:</strong>
              {Array.isArray(item.color) ? item.color.map((clr, i) => (
                <div key={i} className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: clr }}></div>
              )) : item.color}
            </p>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Qty:</strong> {item.stock}</p>
            <p className={`font-semibold ${item.stock > 0 ? "text-green-600" : "text-red-600"}`}>{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            <div className="flex gap-2 justify-between mt-2">
              <button
                onClick={() => handleToggleState(item)}
                className={`flex-1 py-1 rounded-full text-white font-semibold transition ${productStates[item._id] ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
              >
                {productStates[item._id] ? "Active" : "Inactive"}
              </button>
              <button
                onClick={() => openEditModal(item)}
                className="flex-1 text-blue-600 font-semibold hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border text-black p-2 rounded-md" />
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Product Name" className="w-full border text-black p-2 rounded-md" />
              <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border text-black p-2 rounded-md" />
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border text-black p-2 rounded-md" />

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Select Sizes:</p>
                <div className="flex gap-2 flex-wrap">
                  {["S","M","L","XL","XXL"].map(size => (
                    <button type="button" key={size} onClick={() => setForm(prev => ({...prev, size: prev.size.includes(size) ? prev.size.filter(s => s!==size) : [...prev.size, size]}))} className={`px-3 py-1 rounded-md border ${form.size.includes(size) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"}`}>{size}</button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Select Colors:</p>
                <div className="flex gap-3 flex-wrap items-center">
                  {["#000","#fff","#00f","#f00","#008000","#808080","beige"].map(clr => (
                    <div key={clr} onClick={() => setForm(prev => ({...prev, color: prev.color.includes(clr) ? prev.color.filter(c => c!==clr) : [...prev.color, clr]}))} className={`w-8 h-8 rounded-full border-2 cursor-pointer ${form.color.includes(clr) ? "border-blue-600 scale-110" : "border-gray-300"}`} style={{backgroundColor: clr}}></div>
                  ))}
                </div>
              </div>

              <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="w-full border text-black p-2 rounded-md" />
              <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Quantity" className="w-full border text-black p-2 rounded-md" />
              <select name="status" value={form.status} onChange={handleChange} className="w-full border text-black p-2 rounded-md">
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
                <span>Active</span>
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingProduct(null); }} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">{editingProduct ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
