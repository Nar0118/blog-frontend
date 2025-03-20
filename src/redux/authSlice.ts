import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import { IAuthState } from '../types';

const token = localStorage.getItem('token');
const decoded = token ? jwtDecode(token) : false;

const initialState: IAuthState = {
  isAuthenticated: !!decoded,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
