import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Women products list
};

export const womenProductsSlice = createSlice({
  name: "womenProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, deleteProduct, setProducts, updateProduct } =
  womenProductsSlice.actions;

export default womenProductsSlice.reducer;
