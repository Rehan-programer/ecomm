import {
  FiHome,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiShoppingBag,
  FiUser,
  FiHeart,
  FiMapPin,
  FiCreditCard,
  FiBell,
  FiStar,
} from "react-icons/fi";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FiHome, // ✅ component reference, not JSX
    role: ["admin", "Company"],
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: FiShoppingCart,
    role: ["admin"],
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
    role: ["admin"],
    submenu: [
      { title: "Mens", path: "/dashboard/men" },
      { title: "Women", path: "/dashboard/women" },
      { title: "Baby", path: "/dashboard/baby" },
    ],
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FiUser,
    role: ["user", "Individual"],
  },
  {
    title: "Orders",
    path: "/dashboard/user/orders",
    icon: FiShoppingBag,
    role: ["user", "Individual"],
  },
  {
    title: "Wishlist",
    path: "/dashboard/user/favourite",
    icon: FiHeart,
    role: ["user"],
  },


  {
    title: "Loyalty Points",
    path: "/dashboard#loyalty",
    icon: FiStar,
    role: ["user", "Individual"],
  },
  
  {
    title: " Settings",
    path: "/dashboard/profile",
    icon: FiSettings,
    role: ["admin", "user", "Company", "Individual"],
  },
];
