"use client";
import { useState } from "react";
import TransitionWrapper from "../Commponents/TransitionWrapper";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <TransitionWrapper>
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-5 border border-gray-100"
        >
          <h1 className="text-3xl font-extrabold text-center text-[#17232D]">
            Create Account 🛍️
          </h1>
          <p className="text-center text-gray-500 text-sm mb-2">
            Please fill in your details to sign up
          </p>

          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3d3d] placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="py-3 rounded-lg bg-[#ff3d3d] text-white font-semibold hover:bg-[#e33636] transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#ff3d3d] hover:text-[#e33636] font-medium"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </TransitionWrapper>
  );
}
