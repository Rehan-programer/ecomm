import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchMenProducts = createAsyncThunk(
//   "menProducts/fetchMenProducts",
//   async () => {
//     const res = await fetch("/api/products");
//     const data = await res.json();
//     return data.filter((product) => product.Category === "Men");
//   }
// );

const menProductsSlice = createSlice({
  name: "menProducts",
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMenProducts.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchMenProducts.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.products = action.payload;
  //     })
  //     .addCase(fetchMenProducts.rejected, (state) => {
  //       state.status = "failed";
  //     });
  // },
});

export const { addProduct, deleteProduct } = menProductsSlice.actions;
export default menProductsSlice.reducer;
