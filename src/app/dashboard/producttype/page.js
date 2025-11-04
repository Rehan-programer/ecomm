"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductTypePage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    subcategoryId: "",
    isActive: true,
    _id: "",    
  });

  const [error, setError] = useState("");

  // Fetch subcategory
  const { data: subcategory = [], isLoading: loadingsubcategory } = useQuery({
    queryKey: ["subcategory"],
    queryFn: async () => {
      const res = await fetch("/api/subcategory");
      if (!res.ok) throw new Error("Failed to fetch subcategory");
      return (await res.json()).data || [];
    },
  });

  // Fetch product types
  const { data: producttypes = [], isLoading: loadingPT } = useQuery({
    queryKey: ["producttype"],
    queryFn: async () => {
      const res = await fetch("/api/productType");
      if (!res.ok) throw new Error("Failed to fetch product types");
      return (await res.json()).data || [];
    },
  });

  // Add mutation
  const addMutation = useMutation({
    mutationFn: async (newPT) => {
      const res = await fetch("/api/productType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPT),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product type");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["productType"]);
      setError("");
    },
    onError: (err) => setError(err.message),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`/api/productType/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update product type");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["productType"]);
      setError("");
    },
    onError: (err) => setError(err.message),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await fetch(`/api/productType/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries(["productType"]),
  });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subcategoryId) { setError("Select a subcategory"); return; }

    const payload = { ...form };

    try {
      if (form._id) {
        await updateMutation.mutateAsync({ id: form._id, data: payload });
      } else {
        await addMutation.mutateAsync(payload);
      }
      setForm({ name: "", slug: "", description: "", image: "", subcategoryId: "", isActive: true, _id: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingPT || loadingsubcategory)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-7xl mx-auto text-black">
      {/* Form */}
      <div className="md:w-1/3 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">{form._id ? "Edit Product Type" : "Add Product Type"}</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"/>
          <select value={form.subcategoryId} onChange={(e) => setForm({ ...form, subcategoryId: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Subcategory</option>
            {subcategory.map((sub) => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
          </select>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4"/>
            <label>Is Active</label>
          </div>
          <button type="submit" className={`py-2 px-4 rounded-lg text-white font-semibold ${form._id ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"} transition`}>
            {form._id ? "Update Product Type" : "Add Product Type"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 overflow-x-auto overflow-y-auto max-h-[500px]">

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Types</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-gray-600">Name</th>
              <th className="p-3 border-b text-gray-600">Slug</th>
              <th className="p-3 border-b text-gray-600">Subcategory</th>
              <th className="p-3 border-b text-gray-600">Active</th>
              <th className="p-3 border-b text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {producttypes.map((pt) => (
              <tr key={pt._id} className="hover:bg-gray-50 transition text-gray-700">
                <td className="p-3 border-b">{pt.name}</td>
                <td className="p-3 border-b">{pt.slug}</td>
                <td className="p-3 border-b">{pt.subcategoryId?.name || "—"}</td>
                <td className="p-3 border-b">{pt.isActive ? "Yes" : "No"}</td>
                <td className="p-3 border-b space-x-2">
                  <button onClick={() => deleteMutation.mutate(pt._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
                  <button onClick={() => setForm({ ...pt, subcategoryId: pt.subcategoryId?._id || "", _id: pt._id })} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                </td>
              </tr>
            ))}
            {producttypes.length === 0 && (
              <tr><td colSpan={5} className="text-center py-6 text-gray-400">No product types found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
