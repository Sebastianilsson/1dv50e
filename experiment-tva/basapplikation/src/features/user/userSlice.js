import { createSlice } from "@reduxjs/toolkit";
import("../../app/authSolution").then((mod) => {
  console.log(mod);
  userLogin = mod.userLogin;
  userLogout = mod.userLogout;
});
let userLogin, userLogout;

const initialState = {
  id: "",
  isAuthenticated: false,
  email: "",
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { id, isAuthenticated, email } = payload;
      state.id = id;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = slice.actions;

export const authenticateUser = ({ email, password }) => async (dispatch) => {
  let user = await userLogin(email, password);
  dispatch(login(user));
};

export const logoutUser = () => async (dispatch) => {
  await userLogout();
  dispatch(logout());
};

export const getIsAuthenticated = (state) => state.user.isAuthenticated;

export const getUserEmail = (state) => state.user.email;

export default slice.reducer;
