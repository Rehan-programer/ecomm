import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Slices
import cartReducer from "../slice/cartslice";
import favouriteReducer from "../slice/favouriteslice";
import productsReducer from "../slice/productslice";
import orderReducer from "../slice/orderslice";
import userReducer from "../slice/userslice";

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  products: productsReducer, // <- unified slice
  orders: orderReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["orders", "cart", "user", "favourite"], // products NOT persisted (optional)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
