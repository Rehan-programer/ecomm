"use client"
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 flex flex-col gap-4 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 rounded" required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 rounded" required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="border p-2 rounded" required />
      <button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Sign Up</button>
    </form>
  );
}
