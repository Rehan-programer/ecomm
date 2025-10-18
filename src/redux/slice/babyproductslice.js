import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch Baby Products from backend
export const fetchBabyProducts = createAsyncThunk(
  "babyProducts/fetchBabyProducts",
  async () => {
    const res = await fetch("/api/products?category=baby");
    const data = await res.json();
    return data;
  }
);

const initialState = {
  products: [],
  status: "idle",
};

const babyProductsSlice = createSlice({
  name: "babyProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    deleteProduct: (state, action) => { 
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) state.products[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBabyProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBabyProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchBabyProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, deleteProduct, updateProduct } = babyProductsSlice.actions;
export default babyProductsSlice.reducer;
