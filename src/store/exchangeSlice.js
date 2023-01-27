import { createSlice } from "@reduxjs/toolkit";

const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    tradingPair: {
      baseCurrency: "",
      quoteCurrency: "",
    },
    tradingPairStats: {
      baseCurrency: "",
      quoteCurrency: "",
      lastPrice: 0.0,
      volume24h: 0.0,
      volumeBaseCurrency24h: 0.0,
      priceChange24h: 0.0,
      priceHigh24h: 0.0,
      priceLow24h: 0.0,
      isNDWallet: false,
    },
    tradingFees: {
      makerFee: 0.0,
      takerFee: 0.0,
    },
    tradingPairSettings: {
      minTickSize: 0.0,
      minTradeAmount: 0.0,
      minOrderValue: 0,
      tickDecimals: 4,
      tradeAmountDecimals: 0,
      orderValueDecimals: 0,
    },
    orderBookTotal: {
      bidBaseCurrency: 0.0,
      bidQuoteCurrency: 0.0,
      askBaseCurrency: 0.0,
      askQuoteCurrency: 0.0,
    },
  },
  reducers: {
    setExchangeTrading(state, action) {
      state.tradingPair.baseCurrency = action.payload.base;
      state.tradingPair.quoteCurrency = action.payload.quote;

      state.tradingPairStats.baseCurrency = action.payload.base;
      state.tradingPairStats.quoteCurrency = action.payload.quote;
      // state.tradingPairStats.lastPrice = action.payload.prev_price;
      state.tradingPairStats.lastPrice = action.payload.price;
      state.tradingPairStats.volume24h = action.payload.quote_volume;
      state.tradingPairStats.volumeBaseCurrency24h = action.payload.base_volume;
      state.tradingPairStats.priceHigh24h = action.payload.high_24hr;
      state.tradingPairStats.priceLow24h = action.payload.low_24hr;
      state.tradingPairStats.priceChange24h = action.payload.change_in_price;
      state.tradingPairStats.isNDWallet = action.payload.is_nd_wallet;

      state.tradingFees.makerFee = action.payload.maker_fee;
      state.tradingFees.takerFee = action.payload.taker_fee;

      state.tradingPairSettings.minTickSize = action.payload.min_tick_size;
      state.tradingPairSettings.minTradeAmount =
        action.payload.min_trade_amount;
      state.tradingPairSettings.minOrderValue = action.payload.min_order_value;
      // state.tradingPairSettings.tickDecimals = action.payload...;
      // state.tradingPairSettings.tradeAmountDecimals = action.payload...;
      // state.tradingPairSettings.orderValueDecimals = action.payload...;
    },
    setTradingPair(state, action) {
      state.tradingPair.baseCurrency = action.payload.base;
      state.tradingPair.quoteCurrency = action.payload.quote;
    },
  },
});

export const { setExchangeTrading, setTradingPair } = exchangeSlice.actions;

export const selectTradingPair = (state) => state.exchange.tradingPair;
export const selectTradingPairStats = (state) =>
  state.exchange.tradingPairStats;
export const selectTradingFees = (state) => state.exchange.tradingFees;
export const selectTradingPairSettings = (state) =>
  state.exchange.tradingPairSettings;

export default exchangeSlice.reducer;
