import { store } from "../../store";
import { getRatesAsync } from "../../store/currencySlice";

class PriceRates {
  constructor() {
    store.dispatch(getRatesAsync());

    setInterval(() => {
      store.dispatch(getRatesAsync());
    }, 5000);
  }
}

export function initFetchRates() {
  const priceRates = new PriceRates();
  window.priceRates = priceRates;
}
