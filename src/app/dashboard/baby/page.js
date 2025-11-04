// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   deleteProduct,
//   addProduct,
//   updateProduct,
//   setBabyProducts,
// } from "../../../redux/slice/babyproductslice";

// export default function BabyProductsPage() {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.babyProducts);

//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [productStates, setProductStates] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [form, setForm] = useState({
//     image: "",
//     title: "",
//     category: "baby",
//     price: "",
//     size: "",
//     color: "",
//     brand: "",
//     stock: "",
//     status: "In Stock",
//     active: true,
//   });

//   const queryClient = useQueryClient();

//   // ✅ Fetch products with React Query
//   const { isLoading } = useQuery({
//     queryKey: ["babyProducts"],
//     queryFn: async () => {
//       const res = await fetch("/api/products?category=baby");
//       if (!res.ok) throw new Error("Failed to fetch products");
//       return res.json();
//     },
//     onSuccess: (data) => dispatch(setBabyProducts(data)),
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     const initialStates = {};
//     products.forEach((p) => (initialStates[p._id] = p.active));
//     setProductStates(initialStates);
//   }, [products]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   // ✅ Add / Update mutation
//   const saveMutation = useMutation({
//     mutationFn: async (product) => {
//       const formattedForm = {
//         ...product,
//         size: product.size ? product.size.split(",").map((s) => s.trim()) : [],
//         color: product.color ? product.color.split(",").map((c) => c.trim()) : [],
//       };
//       const method = editingProduct ? "PUT" : "POST";
//       const url = editingProduct
//         ? `/api/products?id=${editingProduct._id}`
//         : `/api/products?category=baby`;
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formattedForm),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to save product");
//       return data.product;
//     },
//     onSuccess: (product) => {
//       if (editingProduct) dispatch(updateProduct(product));
//       else dispatch(addProduct(product));
//       queryClient.invalidateQueries({ queryKey: ["babyProducts"] });
//       setForm({
//         image: "",
//         title: "",
//         category: "baby",
//         price: "",
//         size: "",
//         color: "",
//         brand: "",
//         stock: "",
//         status: "In Stock",
//         active: true,
//       });
//       setEditingProduct(null);
//       setShowModal(false);
//       alert(editingProduct ? "✅ Product updated!" : "✅ Product added!");
//     },
//     onError: (err) => alert("❌ " + err.message),
//   });

//   const handleSaveProduct = (e) => {
//     e.preventDefault();
//     if (!form.title || !form.price) {
//       alert("⚠️ Please fill in product title and price.");
//       return;
//     }
//     saveMutation.mutate(form);
//   };

//   // ✅ Delete mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (ids) => {
//       await Promise.all(ids.map((id) => fetch(`/api/products?id=${id}`, { method: "DELETE" })));
//       return ids;
//     },
//     onSuccess: (ids) => {
//       ids.forEach((id) => dispatch(deleteProduct(id)));
//       queryClient.invalidateQueries({ queryKey: ["babyProducts"] });
//       setSelectedProducts([]);
//       alert("🗑️ Products deleted!");
//     },
//     onError: (err) => alert("❌ Error deleting products"),
//   });

//   const handleDelete = () => {
//     if (!confirm("Are you sure you want to delete selected products?")) return;
//     deleteMutation.mutate(selectedProducts);
//   };

//   // ✅ Toggle Active mutation
//   const toggleMutation = useMutation({
//     mutationFn: async (item) => {
//       const newActive = !item.active;
//       const res = await fetch(`/api/products?id=${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...item, active: newActive }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error("Failed to update state");
//       return data.product;
//     },
//     onSuccess: (product) => {
//       dispatch(updateProduct(product));
//       setProductStates((prev) => ({ ...prev, [product._id]: product.active }));
//       queryClient.invalidateQueries({ queryKey: ["babyProducts"] });
//     },
//     onError: (err) => alert("❌ " + err.message),
//   });

//   const handleToggleState = (item) => toggleMutation.mutate(item);

//   const toggleSelect = (id) =>
//     setSelectedProducts((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//   const toggleSelectAll = (e) =>
//     setSelectedProducts(e.target.checked ? products.map((p) => p._id) : []);

//   const openEditModal = (item) => {
//     setEditingProduct(item);
//     setForm({
//       ...item,
//       size: Array.isArray(item.size) ? item.size.join(", ") : item.size,
//       color: Array.isArray(item.color) ? item.color.join(", ") : item.color,
//     });
//     setShowModal(true);
//   };

//   if (isLoading) return <div>Loading products...</div>;

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
//         <h1 className="text-2xl md:text-3xl text-black font-bold">
//           Baby Products
//         </h1>
//         <button
//           onClick={() => {
//             setShowModal(true);
//             setEditingProduct(null);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* Delete Bar */}
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

//       {/* Table */}
//       <div className="hidden lg:block overflow-x-auto bg-white shadow-md rounded-xl">
//         <table className="w-full text-left border-separate border-spacing-y-2">
//           <thead className="bg-gray-100 text-black">
//             <tr>
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
//                       ? "bg-blue-50"
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
//                   <td className="p-3 font-medium">{item.title}</td>
//                   <td className="p-3 text-gray-600">{item.category}</td>
//                   <td className="p-3 text-gray-700 font-semibold">
//                     ${item.price}
//                   </td>
//                   <td className="p-3 text-gray-600">
//                     {Array.isArray(item.size) ? item.size.join(", ") : item.size}
//                   </td>
//                   <td className="p-3">
//                     <div className="flex gap-1">
//                       {Array.isArray(item.color)
//                         ? item.color.map((clr, i) => (
//                             <div
//                               key={i}
//                               className="w-5 h-5 rounded-full border border-gray-300"
//                               style={{ backgroundColor: clr }}
//                             />
//                           ))
//                         : item.color}
//                     </div>
//                   </td>
//                   <td className="p-3 text-gray-600">{item.brand}</td>
//                   <td className="p-3 text-gray-600">{item.stock}</td>
//                   <td className="p-3 text-center">
//                     <span
//                       className={`${
//                         item.stock > 0 ? "text-green-600" : "text-red-600"
//                       } font-semibold`}
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
//                       className="text-blue-600 font-semibold hover:underline"
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

//       {/* ✅ Add / Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {editingProduct ? "Edit Product" : "Add New Product"}
//             </h2>
//             <form onSubmit={handleSaveProduct} className="space-y-3">
//               <input
//                 name="title"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <input
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <input
//                 name="brand"
//                 placeholder="Brand"
//                 value={form.brand}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <input
//                 name="stock"
//                 placeholder="Stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <input
//                 name="size"
//                 placeholder="Sizes (comma separated)"
//                 value={form.size}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <input
//                 name="color"
//                 placeholder="Colors (comma separated)"
//                 value={form.color}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <input
//                 name="image"
//                 placeholder="Image URL"
//                 value={form.image}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-2"
//               />
//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
