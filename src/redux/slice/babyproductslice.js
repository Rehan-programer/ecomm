import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch baby products from API
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

export const { addProduct, deleteProduct, updateProduct } =
  babyProductsSlice.actions;

export default babyProductsSlice.reducer;
