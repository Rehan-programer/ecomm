import { ShoppingCart, Search, Heart } from "lucide-react";
export const navLinks = [
  { 
    name: "Home", 
    path: "/", 
  },
  { 
    name: "Men", 
    path: "/men",
    dropdown: [
      { name: "Shirts", path: "" },
      { name: "Pants", path: "" },
      { name: "Shoes", path: "" },
    ] 
  },
  { 
    name: "Women", 
    path: "/women",
    dropdown: [
      { name: "Dresses", path: "" },
      { name: "Handbags", path: "" },
      { name: "Jewelry", path: "" },
    ] 
  },
  { 
    name: "Baby Collection", 
    path: "/baby",
    dropdown: [
      { name: "New Born", path: "" },
      { name: "Toys", path: "" },
      { name: "Clothing", path: "" },
    ] 
  },
];

export const icons = [
  { id: 1, icon: Search, label: "Search" },
  { id: 2, icon: ShoppingCart, label: "Cart", path: "/cart" },
  { id: 3, icon: Heart, label: "Favourite", path: "/favourite" },
];
