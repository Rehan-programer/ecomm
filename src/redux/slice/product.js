// redux/slice/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // saare products (men, women, baby mix)
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; // API ya static data se load
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
