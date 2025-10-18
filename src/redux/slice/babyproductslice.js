import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBabyProducts = createAsyncThunk(
  "babyProducts/fetchBabyProducts",
  async () => {
    const res = await fetch("/api/products?category=baby");
    const data = await res.json();
    return data;
  }
);

const babyProductsSlice = createSlice({
  name: "babyProducts",
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
        (product) => product._id !== action.payload
      );
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

export const { addProduct, deleteProduct } = babyProductsSlice.actions;
export default babyProductsSlice.reducer;
