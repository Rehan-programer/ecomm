import { createSlice } from "@reduxjs/toolkit";

const favouriteslice = createSlice({
  name: "favourite",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavourite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromFavourite: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteslice.actions;
export default favouriteslice.reducer;
