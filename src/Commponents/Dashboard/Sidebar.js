"use client";
import {

  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { sidebarData } from "./data/SidebarData";
import { useState } from "react";

export default function Sidebar({ open }) {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const router = useRouter();

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-white text-black transition-all duration-300 h-full flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {open ? (
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
              E
            </div>
            <h1 className="text-xl font-bold text-gray-800">Ecommerce</h1>
          </div>
        ) : (
          <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            E
          </div>
        )}

      
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarData.map((item, index) => {
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
                  className="flex items-center justify-between hover:bg-blue-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
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
                          className="hover:bg-blue-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200"
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
