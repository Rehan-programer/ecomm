"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">Admin Profile</h1>

      <div className="space-y-4 text-black">
        <div>
          <p className="font-semibold">First Name:</p>
          <p>{user.firstName}</p>
        </div>

        <div>
          <p className="font-semibold">Last Name:</p>
          <p>{user.lastName}</p>
        </div>

        <div>
          <p className="font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="font-semibold">Role:</p>
          <p>{user.role}</p>
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("user"); 
          window.location.href = "/login"; 
        }}
        className="mt-6 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
