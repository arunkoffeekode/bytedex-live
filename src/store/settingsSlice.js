import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isLoading: true,
    settings: {},
    trade_setting: [],
    darkTheme: localStorage.getItem("darkTheme") ?? 1,
  },
  reducers: {
    loadSettings(state, action) {
      state.settings = action.payload;
      state.trade_setting = action.payload.trade_setting;
      state.isLoading = false;
    },
    setDarkTheme(state, action) {
      state.darkTheme = action.payload;
      localStorage.setItem("darkTheme", state.darkTheme);
    },
  },
});

export const loadSettingsAsync = createAsyncThunk(
  "settings/AsyncLoadSettings",
  async (_, thunkAPI) => {
    try {
      const res = await authenticatedInstance({
        url: apis.getSettings,
        method: "GET",
      });

      thunkAPI.dispatch(loadSettings(res.data.data));
    } catch (error) {}
  }
);

export const { loadSettings, setDarkTheme } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectSettings = (state) => state.settings.settings;
export const selectDarkTheme = (state) => state.settings.darkTheme;
