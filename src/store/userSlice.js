import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";
import { logout } from "./authSlice";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    profile: null,
    loginHistory: null,
  },
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload;
    },
    setLoginHistory(state, action) {
      state.loginHistory = action.payload;
    },
  },
});

export const { setUserProfile, setLoginHistory } = userSlice.actions;

export const getProfileAsync = createAsyncThunk(
  "getProfileAsync",
  async (_, thunkAPI) => {
    try {
      const res = await authenticatedInstance({
        url: apis.profile,
        method: "GET",
      });

      if (res?.data?.status === "Success") {
        thunkAPI.dispatch(setUserProfile(res.data?.data));
      }

      // if (res.status >= 400) {
      //   // console.log(res?.data?.Message);
      //   thunkAPI.dispatch(logout());
      // }
    } catch (error) {
      console.log(error);
    }
  }
);

export const selectProfile = (state) => state.user.profile;
export const selectLoginHistory = (state) => state.user.loginHistory;

export default userSlice.reducer;
