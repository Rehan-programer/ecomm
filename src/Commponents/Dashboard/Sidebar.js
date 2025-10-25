"use client";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarData } from "../../Commponents/Dashboard/data/SidebarData";
import { useSelector } from "react-redux";

export default function Sidebar({ open }) {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // ✅ current path

  const user = useSelector((state) => state.user.currentUser);
  const role = user?.role || "user";

  const filteredData = SidebarData.filter(
    (item) => Array.isArray(item.role) && item.role.includes(role)
  );

  if (!user || !filteredData.length) {
    return (
      <div
        className={`${
          open ? "w-64" : "w-20"
        } h-full flex items-center justify-center text-gray-500`}
      >
        Loading Sidebar...
      </div>
    );
  }

  const isActive = (path) => pathname === path;

  return (
    <aside
      className={`${
        open ? "w-64" : "w-17"
      } bg-white text-black transition-all duration-300 h-full flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {open ? (
          <div className="flex items-center gap-3">
            {/* Circle Icon */}
            <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
              E
            </div>
            {/* Heading Text */}
            <span
              className={`text-lg font-bold text-gray-800 transition-all duration-200 cursor-pointer ${
                isActive("/") ? "text-white bg-blue-600 px-2 py-1 rounded" : ""
              }`}
              onClick={() => router.push("/")}
            >
              {role === "admin" ? "Admin Panel" : "Ecommerce"}
            </span>
          </div>
        ) : (
          // Closed state: Only icon centered
          <div className="flex items-center justify-center w-full">
            <div className="bg-blue-500 w-10 h-10 r ounded-full flex items-center justify-center text-white font-bold">
              E
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {filteredData.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredMenu === index;

            return (
              <li
                key={index}
                onMouseEnter={() => setHoveredMenu(index)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div
                  onClick={() => router.push(item.path)}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-200
                    ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-600 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={18} />}
                    {open && <span>{item.title}</span>}
                  </div>
                  {open &&
                    item.submenu &&
                    (isHovered ? <FiChevronUp /> : <FiChevronDown />)}
                </div>

                {item.submenu && (
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isHovered && open ? "max-h-40 mt-1" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-1 pl-8">
                      {item.submenu.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={() => router.push(sub.path)}
                          className={`p-2 rounded-md cursor-pointer transition-colors duration-200
                            ${
                              isActive(sub.path)
                                ? "bg-blue-600 text-white"
                                : "hover:bg-blue-600 hover:text-white"
                            }
                          `}
                        >
                          {sub.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
