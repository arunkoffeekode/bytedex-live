import _ from "lodash";
import { moment } from "moment";
import historyProvider from "./historyProvider.js";
import { store } from "../../../store";
import { socket } from "../../../WebSocketConnection";

let subscription = {};

const invokeTradingPair = (baseCurrency, quoteCurrency) => {
  // console.log("Invoke Trading Pair");
  // socket.subscribe("CH", [`${baseCurrency}_${quoteCurrency}`, "60"]);

  window.addEventListener("online", () => {
    setTimeout(() => {
      // socket.subscribe("CH", [`${baseCurrency}_${quoteCurrency}`, "60"]);
    }, 5000);
  });
};

const streamProvier = {
  subscribeBars: (symbolInfo, resolution, updateCb, uid, resetCache) => {
    // console.log("streamProvier subscribeBars");

    // const [baseCurrency, quoteCurrency] = symbolInfo.name.split("/");
    const [baseCurrency, quoteCurrency] = ["BTC", "USDT"];
    const lastBar = _.get(
      historyProvider,
      `history.${symbolInfo.name}.lastBar`,
      {
        time: moment().startOf("m").valueOf(),
        open: 0,
        close: 0,
        hight: 0,
        low: 0,
        volume: 0,
      }
    );

    invokeTradingPair(baseCurrency, quoteCurrency);

    subscription = {
      channel: `${baseCurrency}${quoteCurrency}1`,
      uid,
      resolution,
      symbolInfo,
      listener: updateCb,
      lastBar,
    };

    const { lastPrice } = store.getState().exchange.tradingPairStats;
    updatePrice(lastPrice);
  },
  unsubscribeBars: (...args) => {
    // console.log("streamProvier unsubscribeBars");
    // console.log(args);
    // socket.subscribe(
    //   'CH',
    //   [`${baseCurrency}_${quoteCurrency}`, '1']
    // );
  },
};

socket.on("CH", (data) => {
  const barData = data;

  barData.close = barData.open;
  barData.high = barData.open;

  if (subscription) {
    if (barData.time < subscription.lastBar.time) {
      return;
    }

    const lastBar = updateBar(barData, subscription);

    subscription.listener(lastBar);
    // update our own record of lastBar
    subscription.lastBar = lastBar;
  }
});

socket.on("pushDataTickerMatched", (data) => {
  updateVolume(data.Data);
});

export const updateVolume = (ticker) => {
  // console.log("streamProvier updateVolume");

  if (!_.isEmpty(subscription)) {
    let lastBar = subscription.lastBar;

    lastBar.volume += ticker.Volume;
    subscription.listener(lastBar);
  }
};

export const updatePrice = (price) => {
  // console.log("streamProvier updateBar");

  if (!_.isEmpty(subscription)) {
    let lastBar = subscription.lastBar;
    if (price !== 0) {
      if (price < lastBar.low) {
        lastBar.low = price;
      } else if (price > lastBar.high) {
        lastBar.high = price;
      }

      lastBar.close = price;

      subscription.listener(lastBar);
    }
  }
};

// Take a single trade, and subscription record, return updated bar
const updateBar = (barData, subscription) => {
  // console.log("streamProvier updateBar");

  let lastBar = subscription.lastBar;
  let resolution = subscription.resolution;

  if (resolution.includes("D")) {
    // 1 day in minutes === 1440
    resolution = 1440;
  } else if (resolution.includes("W")) {
    // 1 week in minutes === 10080
    resolution = 10080;
  }

  let coeff = resolution * 60 * 1000;
  // console.log({coeff})
  let isSameInterval =
    Math.floor(barData.time / coeff) === Math.floor(lastBar.time / coeff);
  let _lastBar;

  if (!isSameInterval) {
    // create a new candle, use last close as open **PERSONAL CHOICE**
    _lastBar = {
      time: barData.time,
      open: lastBar.close,
      high: lastBar.close,
      low: lastBar.close,
      close: barData.close,
      volume: barData.volume,
    };
  } else {
    // update lastBar candle!
    if (barData.close < lastBar.low) {
      lastBar.low = barData.close;
    } else if (barData.close > lastBar.high) {
      lastBar.high = barData.close;
    }

    lastBar.volume += barData.volume;
    lastBar.close = barData.close;
    _lastBar = lastBar;
  }

  return _lastBar;
};

export default streamProvier;
