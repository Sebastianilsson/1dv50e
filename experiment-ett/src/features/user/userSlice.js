import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout } from "../../app/authSolution";

export const slice = createSlice({
  name: "user",
  initialState: {
    id: "",
    isAuthenticated: false,
    email: "",
  },
  reducers: {
    login: (state, { payload }) => {
      const { id, isAuthenticated, email } = payload;
      state.id = id;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
    },
    logout: (state, { payload }) => {
      state.id = "";
      state.isAuthenticated = false;
      state.email = "";
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
