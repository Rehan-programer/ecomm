import {
  FiHome,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiShoppingBag,
} from "react-icons/fi";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    title: "Orders",
    icon: FiShoppingCart,
    path: "/dashboard/orders",
    submenu: [
      { title: "Pending Orders", path: "/dashboard/pendingorders" },
      { title: "Completed Orders", path: "/dashboard/completeorders" },
      { title: "Cancelled Orders", path: "/dashboard/cancelorders" },
    ],
  },
  {
    title: "Collection",
    path: "/dashboard/collection",
    icon: FiShoppingBag,
    submenu: [
      { title: "Mens", path: "/dashboard/men" },
      { title: "Women", path: "/dashboard/women" },
      { title: "Baby", path: "/dashboard/baby" },
    ],
  },

  {
    title: "Settings",
    icon: FiSettings,
    path: "/settings",
  },
];
