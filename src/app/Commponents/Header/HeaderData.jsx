import { ShoppingCart, Search,Heart } from "lucide-react";

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Baby Collection", path: "/baby" },
];

export const icons = [
  { id: 1, icon: Search, label: "Search" },
  { id: 3, icon: Heart, label: "Favourite", path: "/favourite" },
  { id: 4, icon: ShoppingCart, label: "Cart", path: "/cart" },
];
