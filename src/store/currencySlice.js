import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";

export const defaultBaseFiat = {
  currency: "USD",
  rate: 1,
};

// function preloadDefaultBaseFiat() {
//   const lsBF = localStorage.getItem("baseFiat");
//   if (lsBF === undefined || lsBF === defaultBaseFiat.currency)
//     return defaultBaseFiat;
//   else {
//     (async () => {
//       const res = await authenticatedInstance({
//         url: apis.fiatPriceRates,
//         method: "GET",
//       });
//       const data = res.data?.data?.rateList;
//       const found = data?.find((el) => el.currency === lsBF);
//       console.log(found);
//       return found;
//     })();
//   }
// }

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    cryptoPriceRates: null,
    fiatPriceRates: null,
    baseFiat: defaultBaseFiat,
  },
  reducers: {
    setRates(state, action) {
      state.cryptoPriceRates = action.payload.cryptoPriceRates;
      state.fiatPriceRates = action.payload.fiatPriceRates;

      const lsBF = localStorage.getItem("baseFiat");
      let found =
        (lsBF && state.fiatPriceRates?.find((el) => el.currency === lsBF)) ??
        defaultBaseFiat;

      state.baseFiat = found;
    },
    setBaseFiat(state, action) {
      state.baseFiat = action.payload;
      localStorage.setItem("baseFiat", action.payload.currency);
    },
  },
});

export const getRatesAsync = createAsyncThunk(
  "currency/GetRatesAsync",
  async (_, thunkAPI) => {
    try {
      const cryptoRatesRes = await authenticatedInstance({
        url: apis.cryptoPriceRates,
        method: "GET",
      });

      const fiatRatesRes = await authenticatedInstance({
        url: apis.fiatPriceRates,
        method: "GET",
      });

      thunkAPI.dispatch(
        setRates({
          cryptoPriceRates: cryptoRatesRes.data?.data?.rateList,
          fiatPriceRates: fiatRatesRes.data?.data?.rateList,
        })
      );
    } catch (error) {}
  }
);

export const { setRates, setBaseFiat } = currencySlice.actions;

export default currencySlice.reducer;

export const selectCryptoRates = (state) => state.currency.cryptoPriceRates;
export const selectFiatRates = (state) => state.currency.fiatPriceRates;
export const selectBaseFiat = (state) => state.currency.baseFiat;
