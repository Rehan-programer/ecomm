import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch favourites for logged-in user
export const fetchFavouritesFromDB = createAsyncThunk(
  "favourite/fetchFavouritesFromDB",
  async (userId) => {
    const res = await fetch(`/api/favourite?userId=${userId}`);
    const data = await res.json();
    return data; // array of full product objects
  }
);

// ✅ Toggle favourite in DB
export const toggleFavouriteInDB = createAsyncThunk(
  "favourite/toggleFavouriteInDB",
  async ({ userId, productId }) => {
    const res = await fetch("/api/favourite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const data = await res.json();
    return data; // { message: "Added/Removed", product }
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
    toggleLocalFavourite: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((f) => f._id === product._id);
      if (exists) {
        state.items = state.items.filter((f) => f._id !== product._id);
      } else {
        state.items.push(product);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouritesFromDB.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleFavouriteInDB.fulfilled, (state, action) => {
        const { message, product } = action.payload;
        if (message === "Removed from favourites") {
          state.items = state.items.filter((f) => f._id !== product._id);
        } else if (message === "Added to favourites" && product) {
          const exists = state.items.find((f) => f._id === product._id);
          if (!exists) state.items.push(product);
        }
      });
  },
});

export const { clearFavourites, toggleLocalFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
