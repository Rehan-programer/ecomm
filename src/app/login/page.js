"use client";
import { useState } from "react";
import TransitionWrapper from "../Commponents/TransitionWrapper";


export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (res.status === 200) {
      window.location.href = "/";
    }
  };

  return (
    <TransitionWrapper>
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-6 border border-gray-100"
        >
          <h1 className="text-3xl font-extrabold text-center text-[#17232D]">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Please login to your account
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#17232D] font-medium">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#17232D] font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="py-3 rounded-lg bg-[#ff3d3d] text-white font-semibold hover:bg-[#e33636] transition-all duration-300 shadow-md"
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#ff3d3d] hover:text-[#e33636] font-medium"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </TransitionWrapper>
  );
}
