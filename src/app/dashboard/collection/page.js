"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function CollectionPage() {
  const queryClient = useQueryClient();

  // Fetch collections
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/collection");
      if (!res.ok) throw new Error("Failed to fetch collections");
      const json = await res.json();
      return json.data;
    },
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Add collection
  const addCollectionMutation = useMutation({
    mutationFn: async (newCollection) => {
      const res = await fetch("/api/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollection),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("POST error:", errorText);
        throw new Error("Failed to add collection");
      }
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["collections"]),
  });

  // Delete collection
  const deleteCollectionMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/collection?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("DELETE error:", errorText);
        throw new Error("Failed to delete collection");
      }
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["collections"]),
  });

  const handleAddCollection = (e) => {
    e.preventDefault();
    if (!name) return alert("Name is required");
    addCollectionMutation.mutate({ name, description, image });
    setName("");
    setDescription("");
    setImage("");
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    deleteCollectionMutation.mutate(id);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Product Categories</h1>

      <form onSubmit={handleAddCollection} className="mb-6 p-4 bg-white rounded shadow-md flex flex-col gap-3 text-black">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Collection</button>
      </form>

      {isLoading && <p>Loading collections...</p>}
      {isError && <p className="text-red-500">Failed to load collections.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
        {categories.map((cat) => (
          <div key={cat._id} className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden relative">
            <div className="relative group">
              <img src={cat.image || "/images/default.jpg"} alt={cat.name} className="w-full h-64 object-cover bg-center" />
              <Link href={`/dashboard/collection/${cat.name.toLowerCase()}`}>
                <button className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-opacity-90 transition">
                  {cat.name}
                </button>
              </Link>
            </div>

            <div className="p-6 flex justify-between items-center">
              <p className="text-gray-700 text-base">{cat.description || "Explore our collection."}</p>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
