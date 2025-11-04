import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenProducts = createAsyncThunk(
  "menProducts/fetchMenProducts",
  async () => {
    const res = await fetch("/api/products?category=men");
    const data = await res.json();
    return data;
  }
);

const menProductsSlice = createSlice({
  name: "menProducts",
  initialState: {
    products: [],
    status: "idle",
  },
  reducers: {
    setMenProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    // ✅ ADD THIS NEW FUNCTION
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
      .addCase(fetchMenProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchMenProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setMenProducts, addProduct, deleteProduct, updateProduct } =
  menProductsSlice.actions;
export default menProductsSlice.reducer;
