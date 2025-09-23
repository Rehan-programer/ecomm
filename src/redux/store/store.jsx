import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartslice";
import favouriteReducer from "../slice/favouriteslice";
import productReducer from "../slice/productslice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
    product: productReducer, // 
  },
});
