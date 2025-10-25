import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch women products from API
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
        (product) => product._id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const updated = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === updated._id
      );
      if (index !== -1) {
        state.products[index] = updated;
      }
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

export const { addProduct, deleteProduct, updateProduct } =
  womenProductsSlice.actions;

export default womenProductsSlice.reducer;
