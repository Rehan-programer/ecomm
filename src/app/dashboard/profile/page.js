"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ FIXED
import { logout, setUserFromLocalStorage } from "../../../redux/slice/userslice"; 

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ FIXED

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      dispatch(setUserFromLocalStorage(parsedUser)); 
    } else {
      setTimeout(() => {
        router.replace("/auth"); // ✅ useRouter ka replace
      }, 300);
    }
  }, [dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth"); // ✅ replace instead of location.href
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">
        Your Profile
      </h1>

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
        onClick={handleLogout}
        className="mt-6 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
