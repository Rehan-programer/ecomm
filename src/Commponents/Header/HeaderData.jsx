  import { ShoppingCart,  Heart,User } from "lucide-react";

  export const navLinks = [
    { 
      name: "Home", 
      path: "/", 
    },
    { 
      name: "Men", 
      path: "/men",
      image: "/img/fashion-img/fashion-1.webp",
      descripiton: "Explore the latest men's fashion including shirts, pants, shoes and accessories. Perfect for casual and formal occasions.",
      dropdown: [
        { name: "Shirts", subItems: ["Casual Shirt", "Formal Shirt", "T-Shirt", "Dress Shirt", "Hoodies"] },
        { name: "Pants", subItems: ["Jeans", "Chinos", "Track Pants", "Shorts", "Cargo Pants"] },
        { name: "Shoes", subItems: ["Sneakers", "Loafers", "Boots", "Formal Shoes", "Sandals"] },
        { name: "Accessories", subItems: ["Belts", "Watches", "Hats", "Sunglasses", "Wallets"] },
        { name: "Jackets & Coats", subItems: ["Leather Jackets", "Bomber Jackets", "Blazers", "Windbreakers", "Overcoats"] },
      ] 
    },
    { 
      name: "Women", 
      path: "/women",
      image: "/img/fashion-img/fashion-2.webp",
      descripiton: "Discover elegant dresses, handbags, jewelry and more for women. Perfect styles for every occasion.",
      dropdown: [
        { name: "Dresses", subItems: ["Evening Dress", "Casual Dress", "Party Dress", "Maxi Dress", "Midi Dress"] },
        { name: "Handbags", subItems: ["Tote Bag", "Clutch", "Crossbody Bag", "Backpack", "Satchel"] },
        { name: "Shoes", subItems: ["Heels", "Flats", "Sneakers", "Boots", "Sandals"] },
        { name: "Jewelry", subItems: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets"] },
        { name: "Accessories", subItems: ["Scarves", "Hats", "Belts", "Sunglasses", "Watches"] },
      ] 
    },
    { 
      name: "Baby Collection", 
      path: "/baby",
      image: "/img/fashion-img/fashion-3.webp",
      descripiton: "Soft and comfortable clothing, toys, and essentials for newborns and toddlers.",
      dropdown: [
        { name: "New Born", subItems: ["Rompers", "Baby Hats", "Booties", "Onesies", "Blankets"] },
        { name: "Toys", subItems: ["Soft Toys", "Teethers", "Rattles", "Activity Gyms", "Stacking Toys"] },
        { name: "Clothing", subItems: ["Baby Shirts", "Baby Pants", "Baby Dresses", "Sleepwear", "Socks & Mittens"] },
        { name: "Feeding", subItems: ["Bottles", "Sippy Cups", "Highchairs", "Bib & Burp Cloths", "Pacifiers"] },
        { name: "Baby Care", subItems: ["Diapers", "Wipes", "Baby Lotion", "Shampoo", "Baby Powder"] },
      ] 
    },
    { 
      name: "Contact-Us", 
      path: "/contact",
    },
  ];

  export const icons = [
    // { id: 1, icon: Search, label: "Search" },
    { id: 2, icon: ShoppingCart, label: "Cart", path: "/cart" },
    { id: 3, icon: Heart, label: "Favourite", path: "/favourite" },
    { id: 4, icon: User, label: "User", path: "/auth" },
  ];
