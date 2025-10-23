"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Pencil, Save, LogOut, Mail, User, Shield, X } from "lucide-react";
import {
  logout,
  setUserFromLocalStorage,
} from "../../../redux/slice/userslice";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // 🧠 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const savedImage = localStorage.getItem("savedProfileImage");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.profileImage && savedImage) {
        parsedUser.profileImage = savedImage;
      }

      setUser(parsedUser);
      setFormData(parsedUser);
      setPreviewImage(
        parsedUser.profileImage || "https://i.pravatar.cc/150?img=47"
      );
      dispatch(setUserFromLocalStorage(parsedUser));
    } else {
      setTimeout(() => router.replace("/auth"), 300);
    }
  }, [dispatch, router]);

  // 🚀 Update form fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 📸 Handle image preview & save as base64 (so it stays after refresh)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // 💾 Save changes (Redux + localStorage)
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    dispatch(setUserFromLocalStorage(formData)); // ✅ keep Redux in sync
    setEditable(false);
  };

  // 🚪 Logout
  // 🚪 Logout
  const handleLogout = () => {
    // Save profile image before removing user
    const savedImage = formData.profileImage;
    if (savedImage) {
      localStorage.setItem("savedProfileImage", savedImage);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch(logout());
    router.replace("/auth");
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
      {/* HEADER */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
        <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <img
              src={previewImage}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl object-cover transition-all duration-200"
            />
            {editable && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <label className="cursor-pointer text-white text-sm font-medium">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-8 pb-10 text-center sm:text-left">
        {/* NAME + ROLE */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {`${formData.firstName} ${formData.lastName}`}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">{formData.email}</p>
          <p className="text-blue-600 uppercase text-xs font-semibold mt-1 tracking-wider">
            {formData.role}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center sm:justify-center mt-6 gap-3">
          {!editable ? (
            <button
              onClick={() => setEditable(true)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
            >
              <Pencil size={18} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={() => {
                  setEditable(false);
                  setFormData(user);
                  setPreviewImage(
                    user.profileImage || "https://i.pravatar.cc/150?img=47"
                  );
                }}
                className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                <X size={18} /> Cancel
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-sm transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* PROFILE FORM */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              First Name
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 focus-within:border-blue-400">
              <User size={18} className="text-gray-400" />
              <input
                name="firstName"
                type="text"
                value={formData.firstName || ""}
                disabled={!editable}
                onChange={handleChange}
                className={`w-full py-2 bg-transparent focus:outline-none ${
                  editable ? "text-black" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Last Name
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 focus-within:border-blue-400">
              <User size={18} className="text-gray-400" />
              <input
                name="lastName"
                type="text"
                value={formData.lastName || ""}
                disabled={!editable}
                onChange={handleChange}
                className={`w-full py-2 bg-transparent focus:outline-none ${
                  editable ? "text-black" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="block text-gray-600 font-semibold mb-1">
              Email
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 focus-within:border-blue-400">
              <Mail size={18} className="text-gray-400" />
              <input
                name="email"
                type="email"
                value={formData.email || ""}
                disabled={!editable}
                onChange={handleChange}
                className={`w-full py-2 bg-transparent focus:outline-none ${
                  editable ? "text-black" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Role */}
          <div className="sm:col-span-2">
            <label className="block text-gray-600 font-semibold mb-1">
              Role
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-gray-50">
              <Shield size={18} className="text-gray-400" />
              <input
                name="role"
                type="text"
                value={formData.role || ""}
                disabled
                className="w-full py-2 bg-transparent text-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
