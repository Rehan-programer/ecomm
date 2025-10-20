import { createSlice } from "@reduxjs/toolkit";

const favouriteslice = createSlice({
  name: "favourite",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavourite: (state, action) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourite: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteslice.actions;
export default favouriteslice.reducer;
