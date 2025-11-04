import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products by category from API
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    const res = await fetch(`/api/products?category=${category}`);
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch products");
    return { category, products: data };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: { men: [], women: [], baby: [] },
    status: { men: "idle", women: "idle", baby: "idle" },
    selectedProduct: null,
    modalOpen: false,
  },
  reducers: {
    openProductModal: (state, action) => {
      state.selectedProduct = action.payload;
      state.modalOpen = true;
    },
    closeProductModal: (state) => {
      state.selectedProduct = null;
      state.modalOpen = false;
    },
    addProduct: (state, action) => {
      const { category, product } = action.payload;
      state.products[category].unshift(product);
    },
    updateProduct: (state, action) => {
      const { category, product } = action.payload;
      const index = state.products[category].findIndex((p) => p._id === product._id);
      if (index !== -1) state.products[category][index] = product;
    },
    deleteProduct: (state, action) => {
      const { category, id } = action.payload;
      state.products[category] = state.products[category].filter((p) => p._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const category = action.meta.arg;
        state.status[category] = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { category, products } = action.payload;
        state.products[category] = products;
        state.status[category] = "succeeded";
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const category = action.meta.arg;
        state.status[category] = "failed";
      });
  },
});

export const {
  openProductModal,
  closeProductModal,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
