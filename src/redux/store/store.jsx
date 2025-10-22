// redux/store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


// slices
import cartReducer from "../slice/cartslice";
import favouriteReducer from "../slice/favouriteslice";
import productReducer from "../slice/productslice";
import menProductsReducer from "../slice/menproductslice";
import womenProductsReducer from "../slice/womenproductslice";
import babyProductsReducer from "../slice/babyproductslice";
import collectionProductsReducer from "../slice/collectionslice";
import orderReducer from "../slice/orderslice";
import userReducer from "../slice/userslice";


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  product: productReducer,
  menProducts: menProductsReducer,
  womenProducts: womenProductsReducer,
  babyProducts: babyProductsReducer,
  collectionProducts: collectionProductsReducer,
  orders: orderReducer,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["orders","menProducts","womenProducts","babyProducts","user"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    })
});


export const persistor = persistStore(store);
