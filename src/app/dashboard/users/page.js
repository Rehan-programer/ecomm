"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
   
      window.location.href = "/auth";
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          👤 User Profile
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-600">First Name</h2>
            <p className="text-xl text-gray-800">{user.firstName}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-600">Last Name</h2>
            <p className="text-xl text-gray-800">{user.lastname}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-600">Email Address</h2>
            <p className="text-xl text-gray-800">{user.email}</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/auth";
            }}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
