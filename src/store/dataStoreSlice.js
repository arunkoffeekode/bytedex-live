import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sortArrayByKey } from "../utils/v2/sort";

export const dataStoreSlice = createSlice({
  name: "dataStore",
  initialState: {
    channels: {},
    allowedChanges: 3,
    marketTop: [],
    orderBook: null,
    marketTrade: null,
  },
  reducers: {
    setDataInChannel: (state, action) => {
      state.channels[action.payload?.channelName] = action.payload?.channelData;

      if (state.allowedChanges > 0 && !state?.marketTop.length) {
        let marketData = action.payload?.channelData;
        marketData = sortArrayByKey(marketData, "base_volume", true);
        // marketData = marketData.slice(0, 10);
        state.marketTop = marketData;
        state.allowedChanges -= 1;
      }
    },
    setOrderBook(state, action) {
      state.orderBook = action.payload;
    },
    setMarketTrade(state, action) {
      state.marketTrade = action.payload;
    },
  },
});

export const setDataInChannelThunk = createAsyncThunk("DS", (_, thunkAPI) => {
  thunkAPI.getState();
});

export const { setDataInChannel, setOrderBook, setMarketTrade } =
  dataStoreSlice.actions;

export const selectChannels = (state) => state.DS.channels;
export const selectMarket = (state) => state.DS.channels.Market;
export const selectMarketTop = (state) => state.DS.marketTop;
export const selectOrderBook = (state) => state.DS.orderBook;
export const selectMarketTrade = (state) => state.DS.marketTrade;

export default dataStoreSlice.reducer;
