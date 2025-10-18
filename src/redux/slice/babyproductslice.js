import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchbabyProducts = createAsyncThunk(
  "babyProducts/fetchbabyProducts",
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
      .addCase(fetchbabyProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchbabyProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchbabyProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, deleteProduct } = babyProductsSlice.actions;
export default babyProductsSlice.reducer;
