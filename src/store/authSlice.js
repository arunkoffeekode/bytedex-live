import { createSlice } from "@reduxjs/toolkit";
import { store } from ".";
import { setToken } from "../utils/api";
import { socket } from "../WebSocketConnection";
import { setOpenOrders } from "./orderSlice";

const initialState = {
  isLoading: false,
  isLoaded: false,
  isAuthorized: false,
  auth: {
    deviceVerificationRequired: false,
    tempAuthToken: null,
    accessToken: null,
    twoFAMethod: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    checkAuthentication(state) {
      state.isLoading = true;
      const _auth = localStorage?.getItem("auth");

      if (_auth && _auth === "true") {
        state.isLoaded = true;
        state.isAuthorized = true;

        const token = setToken();
        socket.login(token);
      } else {
        state.isLoaded = true;
        state.isAuthorized = false;
      }
    },
    authenticate(state, action) {
      // console.log("authing...");
      state.isLoaded = true;
      state.isAuthorized = action.payload.isAuthorized;
      localStorage.setItem("auth", action.payload.isAuthorized);
    },
    logout(state) {
      // console.log("logout dispatch");
      state.isAuthorized = false;
      localStorage.removeItem("auth");
      localStorage.removeItem("token");

      socket.logout();

      state.auth = initialState.auth;

      store.dispatch(setOpenOrders([]));
    },
  },
});

export const { setAuth, authenticate, checkAuthentication, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const selectAuthorized = (state) => state.auth.isAuthorized;
export const selectLoaded = (state) => state.auth.isLoaded;
export const selectAuth = (state) => state.auth.auth;
