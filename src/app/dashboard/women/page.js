// "use client";

// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import {
//   deleteProduct,
//   addProduct,
//   updateProduct,
// } from "../../../redux/slice/womenproductslice";

// export default function WomenProductsPage() {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.womenProducts);

//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [productStates, setProductStates] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const [form, setForm] = useState({
//     image: "",
//     title: "",
//     category: "",
//     price: "",
//     size: [],
//     color: [],
//     brand: "",
//     stock: "",
//     status: "In Stock",
//     active: true,
//   });

//   // Initialize product states
//   useEffect(() => {
//     const initialStates = {};
//     products.forEach((p) => (initialStates[p._id] = p.active));
//     setProductStates(initialStates);
//   }, [products]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   // Save or Update product
//   const handleSaveProduct = async (e) => {
//     e.preventDefault();
//     if (!form.title || !form.price) {
//       alert("⚠️ Please fill in product title and price.");
//       return;
//     }

//     const { _id, __v, createdAt, updatedAt, ...cleanForm } = form;
//     const method = editingProduct ? "PUT" : "POST";
//     const url = editingProduct
//       ? `/api/products?id=${editingProduct._id}`
//       : `/api/products?category=${form.category}`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cleanForm),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert(editingProduct ? "✅ Product updated!" : "✅ Product added!");
//         editingProduct
//           ? dispatch(updateProduct(data.product))
//           : dispatch(addProduct(data.product));

//         setForm({
//           image: "",
//           title: "",
//           category: "",
//           price: "",
//           size: [],
//           color: [],
//           brand: "",
//           stock: "",
//           status: "In Stock",
//           active: true,
//         });

//         setEditingProduct(null);
//         setShowModal(false);
//       } else alert("❌ Something went wrong.");
//     } catch (err) {
//       console.error("❌ Error saving product:", err);
//       alert("❌ Error saving product.");
//     }
//   };

//   // Delete multiple products
//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete selected products?")) return;
//     try {
//       await Promise.all(
//         selectedProducts.map((id) =>
//           fetch(`/api/products?id=${id}`, { method: "DELETE" })
//         )
//       );
//       selectedProducts.forEach((id) => dispatch(deleteProduct(id)));
//       alert("🗑️ Products deleted!");
//       setSelectedProducts([]);
//     } catch (err) {
//       console.error("Error deleting products:", err);
//     }
//   };

//   // Toggle Active/Inactive
//   const handleToggleState = async (item) => {
//     const newActive = !item.active;
//     setProductStates((prev) => ({ ...prev, [item._id]: newActive }));

//     try {
//       const res = await fetch(`/api/products?id=${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...item, active: newActive }),
//       });
//       if (res.ok) {
//         const data = await res.json();
//         dispatch(updateProduct(data.product));
//       }
//     } catch (err) {
//       console.error("Error updating state:", err);
//     }
//   };

//   const toggleSelect = (id) =>
//     setSelectedProducts((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//   const toggleSelectAll = (e) =>
//     setSelectedProducts(e.target.checked ? products.map((p) => p._id) : []);

//   const openEditModal = (item) => {
//     setEditingProduct(item);
//     setForm(item);
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl text-black font-bold">Women Products</h1>
//         <button
//           onClick={() => {
//             setShowModal(true);
//             setEditingProduct(null);
//           }}
//           className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* Selected products toolbar */}
//       {selectedProducts.length > 0 && (
//         <div className="flex items-center gap-3 mb-4 bg-white shadow-md rounded-lg p-3">
//           <p className="font-medium text-gray-700">
//             {selectedProducts.length} selected
//           </p>
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {/* Table for large screens */}
//       <div className="hidden lg:block overflow-x-auto bg-white shadow-md rounded-xl">
//         <table className="w-full text-left border-separate border-spacing-y-2">
//           <thead>
//             <tr className="bg-gray-100 text-black">
//               <th className="p-3">
//                 <input
//                   type="checkbox"
//                   onChange={toggleSelectAll}
//                   checked={
//                     products.length > 0 &&
//                     selectedProducts.length === products.length
//                   }
//                 />
//               </th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Product</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Size</th>
//               <th className="p-3">Color</th>
//               <th className="p-3">Brand</th>
//               <th className="p-3">Qty</th>
//               <th className="p-3 text-center">Stock</th>
//               <th className="p-3 text-center">Active</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length > 0 ? (
//               products.map((item) => (
//                 <tr
//                   key={item._id}
//                   className={`transition-all duration-150 ${
//                     selectedProducts.includes(item._id)
//                       ? "bg-pink-50"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <td className="p-3 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(item._id)}
//                       onChange={() => toggleSelect(item._id)}
//                     />
//                   </td>
//                   <td className="p-3">
//                     <img
//                       src={item.image || "/img/no-image.png"}
//                       alt={item.title}
//                       className="w-16 h-16 object-cover rounded-md shadow-sm"
//                     />
//                   </td>
//                   <td className="p-3 font-medium text-black">{item.title}</td>
//                   <td className="p-3 text-gray-600">{item.category}</td>
//                   <td className="p-3 text-gray-700 font-semibold">
//                     ${item.price}
//                   </td>
//                   <td className="p-3 text-gray-600">
//                     {Array.isArray(item.size)
//                       ? item.size.join(", ")
//                       : item.size}
//                   </td>
//                   <td className="p-3">
//                     <div className="flex gap-1">
//                       {Array.isArray(item.color)
//                         ? item.color.map((clr, i) => (
//                             <div
//                               key={i}
//                               className="w-5 h-5 rounded-full border border-gray-300"
//                               style={{ backgroundColor: clr }}
//                             ></div>
//                           ))
//                         : item.color}
//                     </div>
//                   </td>
//                   <td className="p-3 text-gray-600">{item.brand}</td>
//                   <td className="p-3 text-gray-600">{item.stock}</td>
//                   <td className="p-3 text-center">
//                     <span
//                       className={
//                         item.stock > 0
//                           ? "text-green-600 font-semibold"
//                           : "text-red-600 font-semibold"
//                       }
//                     >
//                       {item.stock > 0 ? "In Stock" : "Out of Stock"}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleToggleState(item)}
//                       className={`w-24 py-1 rounded-full text-white font-semibold transition ${
//                         productStates[item._id]
//                           ? "bg-green-500 hover:bg-green-600"
//                           : "bg-red-500 hover:bg-red-600"
//                       }`}
//                     >
//                       {productStates[item._id] ? "Active" : "Inactive"}
//                     </button>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => openEditModal(item)}
//                       className="text-pink-600 font-semibold hover:underline"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12" className="text-center p-6 text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile/Tablet Cards - Women Products */}
//       <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {products.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform hover:scale-105"
//           >
//             {/* Product Image */}
//             <div className="relative">
//               <img
//                 src={item.image || "/img/no-image.png"}
//                 alt={item.title}
//                 className="w-full h-40 object-cover"
//               />
//               {/* Select Checkbox */}
//               <button
//                 onClick={() => toggleSelect(item._id)}
//                 className={`absolute top-2 right-2 p-2 rounded-full border transition ${
//                   selectedProducts.includes(item._id)
//                     ? "bg-pink-600 border-pink-600 text-white"
//                     : "bg-white border-gray-300 text-gray-700"
//                 }`}
//               >
//                 {selectedProducts.includes(item._id) ? "✓" : "+"}
//               </button>
//             </div>

//             {/* Product Details */}
//             <div className="p-4 flex flex-col gap-1">
//               <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
//               <p className="text-gray-500 text-sm">{item.category}</p>
//               <p className="font-semibold text-gray-700">${item.price}</p>
//               <p className="text-gray-600 text-sm">
//                 Sizes:{" "}
//                 {Array.isArray(item.size) ? item.size.join(", ") : item.size}
//               </p>
//               {/* Color Chips */}
//               <div className="flex gap-1 my-1">
//                 {Array.isArray(item.color) &&
//                   item.color.map((clr, i) => (
//                     <span
//                       key={i}
//                       className="w-5 h-5 rounded-full border"
//                       style={{ backgroundColor: clr }}
//                     ></span>
//                   ))}
//               </div>
//               <p className="text-gray-600 text-sm">Brand: {item.brand}</p>
//               <p className="text-gray-600 text-sm">Qty: {item.stock}</p>
//               <p
//                 className={`font-semibold text-sm ${
//                   item.stock > 0 ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {item.stock > 0 ? "In Stock" : "Out of Stock"}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-between items-center px-4 pb-4">
//               <button
//                 onClick={() => handleToggleState(item)}
//                 className={`px-3 py-1 rounded-full text-white text-sm font-semibold transition ${
//                   productStates[item._id]
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-red-500 hover:bg-red-600"
//                 }`}
//               >
//                 {productStates[item._id] ? "Active" : "Inactive"}
//               </button>
//               <button
//                 onClick={() => openEditModal(item)}
//                 className="text-pink-600 font-semibold text-sm hover:underline"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[450px] relative max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">
//               {editingProduct ? "Edit Product" : "Add New Product"}
//             </h2>

//             <form onSubmit={handleSaveProduct} className="space-y-3">
//               {/* Image, Title, Category, Price */}
//               <input
//                 type="text"
//                 name="image"
//                 value={form.image}
//                 onChange={handleChange}
//                 placeholder="Image URL"
//                 className="w-full border text-black p-2 rounded-md"
//               />
//               <input
//                 type="text"
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 placeholder="Product Name"
//                 className="w-full border text-black p-2 rounded-md"
//               />
//               <input
//                 type="text"
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 placeholder="Category"
//                 className="w-full border text-black p-2 rounded-md"
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange}
//                 placeholder="Price"
//                 className="w-full border text-black p-2 rounded-md"
//               />

//               {/* Sizes */}
//               <div>
//                 <p className="text-sm font-semibold text-gray-700 mb-2">
//                   Select Sizes:
//                 </p>
//                 <div className="flex gap-2 flex-wrap">
//                   {["S", "M", "L", "XL", "XXL"].map((size) => (
//                     <button
//                       type="button"
//                       key={size}
//                       onClick={() => {
//                         setForm((prev) => ({
//                           ...prev,
//                           size: prev.size.includes(size)
//                             ? prev.size.filter((s) => s !== size)
//                             : [...prev.size, size],
//                         }));
//                       }}
//                       className={`px-3 py-1 rounded-md border ${
//                         form.size.includes(size)
//                           ? "bg-pink-600 text-white border-pink-600"
//                           : "bg-white text-gray-700 border-gray-300"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Colors */}
//               <div>
//                 <p className="text-sm font-semibold text-gray-700 mb-2">
//                   Select Colors:
//                 </p>
//                 <div className="flex gap-3 flex-wrap items-center">
//                   {[
//                     "#000000",
//                     "#ffffff",
//                     "#0000FF",
//                     "#FF0000",
//                     "#008000",
//                     "#808080",
//                     "beige",
//                   ].map((clr) => (
//                     <div
//                       key={clr}
//                       onClick={() =>
//                         setForm((prev) => ({
//                           ...prev,
//                           color: prev.color.includes(clr)
//                             ? prev.color.filter((c) => c !== clr)
//                             : [...prev.color, clr],
//                         }))
//                       }
//                       className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
//                         form.color.includes(clr)
//                           ? "border-pink-600 scale-110"
//                           : "border-gray-300"
//                       }`}
//                       style={{ backgroundColor: clr }}
//                     ></div>
//                   ))}
//                 </div>
//               </div>

//               <input
//                 type="text"
//                 name="brand"
//                 value={form.brand}
//                 onChange={handleChange}
//                 placeholder="Brand"
//                 className="w-full border text-black p-2 rounded-md"
//               />
//               <input
//                 type="number"
//                 name="stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 placeholder="Quantity"
//                 className="w-full border text-black p-2 rounded-md"
//               />
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 className="w-full border text-black p-2 rounded-md"
//               >
//                 <option value="In Stock">In Stock</option>
//                 <option value="Out of Stock">Out of Stock</option>
//               </select>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   name="active"
//                   checked={form.active}
//                   onChange={handleChange}
//                 />
//                 <span>Active</span>
//               </label>

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditingProduct(null);
//                   }}
//                   className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700"
//                 >
//                   {editingProduct ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
