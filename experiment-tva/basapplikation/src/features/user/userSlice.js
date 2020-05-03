import { createSlice } from "@reduxjs/toolkit";

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

export const loadAuthSolution = () => {};

export const authenticateUser = ({ email, password }) => async (dispatch) => {
  try {
    let test = await getAuthSolution();
    let user = await test.userLogin(email, password);
    dispatch(login(user));
  } catch (e) {
    console.error(e);
  }
};

export const logoutUser = () => async (dispatch) => {
  let test = await getAuthSolution();
  await test.userLogout();
  dispatch(logout());
};

export const getAuthSolution = () => {
  return import("../../app/authSolution");
};

export const getIsAuthenticated = (state) => state.user.isAuthenticated;

export const getUserEmail = (state) => state.user.email;

export default slice.reducer;
