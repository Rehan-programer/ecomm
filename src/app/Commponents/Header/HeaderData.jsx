import { ShoppingCart, Search, Heart } from "lucide-react";

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Baby Collection", path: "/baby" },
];

export const icons = [
  { id: 1, icon: Search, label: "Search" },
  { id: 2, icon: ShoppingCart, label: "Cart", path: "/cart" },
  { id: 3, icon: Heart, label: "Favourite", path: "/favourite" },
];
