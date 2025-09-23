import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    selectedProduct: null,
    modalOpen: false,
  },
  reducers: {
    openProductModal: (state, action) => {
      state.selectedProduct = action.payload;
      state.modalOpen = true;
    },
    closeProductModal: (state) => {
      state.modalOpen = false;
      state.selectedProduct = null;
    },
  },
});

export const { openProductModal, closeProductModal } = productSlice.actions;
export default productSlice.reducer;
