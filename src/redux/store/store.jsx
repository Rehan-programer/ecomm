import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartslice";
import favouriteReducer from "../slice/favouriteslice"; // ✅ make sure path/filename match ho

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer, // ✅ yeh zaroor hona chahiye
  },
});
