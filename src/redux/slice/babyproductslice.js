import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBabyProducts = createAsyncThunk(
  "babyProducts/fetchBabyProducts",
  async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data.filter((product) => product.Category === "Baby");
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
