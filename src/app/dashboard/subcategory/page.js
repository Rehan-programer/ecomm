"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function SubcategoryPage() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    categoryId: "",
    _id: "",
  });

  // 🔹 Fetch collections
  const { data: collection = [], isLoading: loadingCollection } = useQuery({
    queryKey: ["collection"],
    queryFn: async () => {
      const res = await fetch("/api/collection");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).data || [];
    },
  });
  
  // 🔹 Fetch subcategories
  const { data: subcategory = [], isLoading: loadingSub } = useQuery({
    queryKey: ["subcategory"],
    queryFn: async () => {
      const res = await fetch("/api/subcategory");
      return (await res.json()).data || [];
    },
  });

  // 🔹 Add
  const addMutation = useMutation({
    mutationFn: async (newSub) =>
      await (
        await fetch("/api/subcategory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSub),
        })
      ).json(),
    onSuccess: () => queryClient.invalidateQueries(["subcategory"]),
  });

  // 🔹 Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) =>
      await (
        await fetch(`/api/subcategory/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      ).json(),
    onSuccess: () => queryClient.invalidateQueries(["subcategory"]),
  });

  // 🔹 Delete
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await fetch(`/api/subcategory/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries(["subcategory"]),
  });

  // 🔹 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.categoryId) {
      alert("Please select a collection");
      return;
    }

    if (form._id) {
      await updateMutation.mutateAsync({
        id: form._id,
        data: {
          name: form.name,
          slug: form.slug,
          description: form.description,
          image: form.image,
          categoryId: form.categoryId,
        },
      });
    } else {
      await addMutation.mutateAsync({
        name: form.name,
        slug: form.slug,
        description: form.description,
        image: form.image,
        categoryId: form.categoryId,
      });
    }

    // Reset Form
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      categoryId: "",
      _id: "",
    });
  };

  if (loadingSub)
    return (
      <p className="text-center py-10 text-gray-500 text-lg">Loading...</p>
    );

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-7xl mx-auto">
      {/* Left Panel: Form */}
      <div className="md:w-1/3 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {form._id ? "Edit Subcategory" : "Add Subcategory"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            disabled={loadingCollection}
          >
            <option value="">
              {loadingCollection ? "Loading..." : "Select Collection"}
            </option>
            {collection.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg text-white font-semibold transition ${
              form._id
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {form._id ? "Update Subcategory" : "Add Subcategory"}
          </button>

          {/* Cancel Edit Button */}
          {form._id && (
            <button
              type="button"
              onClick={() =>
                setForm({
                  name: "",
                  slug: "",
                  description: "",
                  image: "",
                  categoryId: "",
                  _id: "",
                })
              }
              className="py-2 px-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Right Panel: Table */}
      <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Subcategories</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-gray-600">Name</th>
              <th className="p-3 border-b text-gray-600">Slug</th>
              <th className="p-3 border-b text-gray-600">Collection</th>
              <th className="p-3 border-b text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategory.map((sub) => (
              <tr
                key={sub._id}
                className="hover:bg-gray-50 transition text-gray-700"
              >
                <td className="p-3 border-b">{sub.name}</td>
                <td className="p-3 border-b">{sub.slug}</td>
                <td className="p-3 border-b">
                  {collection.find((c) => c._id === sub.categoryId)?.name || "—"}
                </td>
                <td className="p-3 border-b space-x-2">
                  <button
                    onClick={() => {
                      setForm({
                        name: sub.name || "",
                        slug: sub.slug || "",
                        description: sub.description || "",
                        image: sub.image || "",
                        categoryId: sub.categoryId || "",
                        _id: sub._id,
                      });
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(`Are you sure you want to delete "${sub.name}"?`)
                      ) {
                        deleteMutation.mutate(sub._id);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {subcategory.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-400 italic"
                >
                  No subcategories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
