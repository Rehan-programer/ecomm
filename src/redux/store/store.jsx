// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartslice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
