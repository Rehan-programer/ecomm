import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWomenProducts = createAsyncThunk(
  "womenProducts/fetchWomenProducts",
  async () => {
    const res = await fetch("/api/products?category=women");
    const data = await res.json();
    return data;
  }
);

const womenProductsSlice = createSlice({
  name: "womenProducts",
  initialState: {
    products: [],
    status: "idle",
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomenProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWomenProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchWomenProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, deleteProduct } = womenProductsSlice.actions;
export default womenProductsSlice.reducer;
