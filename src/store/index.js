import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import currencyReducer from "./currencySlice";
import dataStoreReducer from "./dataStoreSlice";
import exchangeReducer from "./exchangeSlice";
import settingsReducer from "./settingsSlice";
import userReducer from "./userSlice";
import websocketReducer from "./websocketSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ws: websocketReducer,
    DS: dataStoreReducer,
    currency: currencyReducer,
    exchange: exchangeReducer,
    orders: orderReducer,
    settings: settingsReducer,
  },
});
