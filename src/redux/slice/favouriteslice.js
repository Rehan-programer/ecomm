import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Toggle favourite in DB
export const toggleFavouriteInDB = createAsyncThunk(
  "favourite/toggleFavouriteInDB",
  async ({ userId, productId, item }) => {
    const res = await fetch("/api/favourite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const data = await res.json();
    return { item, productId, data };
  }
);

// Fetch favourites for logged-in user
export const fetchFavouritesFromDB = createAsyncThunk(
  "favourite/fetchFavouritesFromDB",
  async (userId) => {
    const res = await fetch(`/api/favourite?userId=${userId}`);
    const data = await res.json();
    return data; // array of product objects
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};


const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    clearFavourites: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavouriteInDB.fulfilled, (state, action) => {
        const { item, productId, data } = action.payload;
        const exists = state.items.find((f) => f._id === productId);

        if (data.message === "Removed from favourites") {
          state.items = state.items.filter((f) => f._id !== productId);
        } else if (!exists) {
          state.items.push(item);
        }
      })
      .addCase(fetchFavouritesFromDB.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
