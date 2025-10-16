import { createSlice } from "@reduxjs/toolkit";
import data from "../../Commponents/ProductData.json";

const initialState = {
  products: data.products || [],
};

const collectionProductsSlice = createSlice({
  name: "collectionProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: state.products.length + 1,
        createdAt: new Date().toLocaleString(),
        ...action.payload,
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, deleteProduct } = collectionProductsSlice.actions;
export default collectionProductsSlice.reducer;
