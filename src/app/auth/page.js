"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
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
    try {
      const url = isLogin ? "/api/login" : "/api/signup";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        if (isLogin) window.location.href = "/";
        else setIsLogin(true);
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 py-10 overflow-hidden">
      <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-700 ease-in-out ${
            isLogin ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          <div className="w-1/2 flex flex-col items-start justify-center bg-white p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm flex flex-col gap-4"
            >
              <h1 className="text-3xl font-bold text-[#17232D] text-center mb-4">
                Login to Account
              </h1>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <button
                type="submit"
                className="mt-3 py-3 bg-[#ff3d3d] text-white rounded-lg font-semibold hover:bg-[#e33636] transition-all duration-300"
              >
                Login
              </button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-end justify-center bg-white p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm flex flex-col gap-4"
            >
              <h1 className="text-3xl font-bold text-[#17232D] text-center mb-4">
                Create Account
              </h1>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[#ff3d3d] outline-none"
              />
              <button
                type="submit"
                className="mt-3 py-3 bg-[#ff3d3d] text-white rounded-lg font-semibold hover:bg-[#e33636] transition-all duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-700 ease-in-out ${
            isLogin ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-10 text-white transition-colors duration-700 ${
              isLogin ? "bg-[#17232D]" : "bg-[#ff3d3d]"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-center">
              {isLogin ? "Welcome Back 👋" : "Join Us 🛍️"}
            </h2>
            <p className="text-gray-200 mb-6 text-center max-w-sm">
              {isLogin
                ? "Don’t have an account yet? Let’s create one in seconds!"
                : "Already a member? Login to continue your journey!"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="bg-white text-[#17232D] px-8 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .h-[600px] {
            height: auto !important;
          }
          .w-[200%] {
            flex-direction: column !important;
            width: 100% !important;
            transform: none !important;
          }
          .absolute {
            position: relative !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
