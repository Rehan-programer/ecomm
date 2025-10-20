import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },

    setUserFromLocalStorage: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUserFromLocalStorage } =
  userSlice.actions;
export default userSlice.reducer;
