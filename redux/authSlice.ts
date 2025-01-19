import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
