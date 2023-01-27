import { wsURL } from "./apis.constants";
import { isArray, isString, startsWith } from "lodash";
import { store } from "./store";
import {
  setDataInChannel,
  setMarketTrade,
  setOrderBook,
} from "./store/dataStoreSlice";
import { setExchangeTrading } from "./store/exchangeSlice";
import { setOpenOrders } from "./store/orderSlice";

window.staticMarket = [];

export default class WebSocketConnection {
  constructor() {
    this.afterStart = [];
    this.subscriptions = {};
    this.eventHandlers = {};
    this.initialize();

    this.lastTs = new Date().getTime();
    this.tradingPair = "";
  }

  initialize() {
    // console.log("initialize");

    this.connection = new WebSocket(wsURL);

    this.connection.onmessage = this.handleMessage;
    this.connection.onopen = this.handleConnect;
    this.connection.onclose = this.handlDisconnect;
    this.connection.onerror = this.handlError;
  }

  init_reauth() {
    // this.subscribe("CH", this.tradingPair);

    if (store) {
      // console.log(store.getState());
      // const {
      //   auth: { authorization },
      // } = store.getState();
      // if (authorization) {
      //   this.login(authorization);
      // }
    }
  }

  getLastTS = () => {
    return this.lastTs;
  };

  handleConnect = (event) => {
    // console.log("handleConnect");
    // this.subscribe("MK");
    this.afterStarted();
  };

  handlDisconnect = (event) => {
    // console.log("handlDisconnect");
    setTimeout(() => {
      this.initialize();
      this.init_reauth();
    }, 5000);
  };

  handlError = (event) => {
    // console.log("handlError");
  };

  handleMessage = (rawData) => {
    // console.log("handleMessage", rawData?.data);
    const data = JSON.parse(rawData?.data);
    // console.log(data);

    if (data.method === "stream" && data.event === "PO.ALL") {
      store.dispatch(setOpenOrders(data?.data));
    }

    if (data) {
      const event = data?.event;
      // if (data.method === 'subscribe') {
      //   if (data.events && data.events[0].event.toString().startsWith("PO") && data.events[0].message=="Subscribed.") {
      //     console.log('ddddddd', data);
      //     store.getState().orders.openOrders = [];
      //   }
      // }

      if (event) {
        if (Array.isArray(this.tradingPair)) {
          if (data.event.includes(".")) {
            if (data.event.split(".")[1] !== this.tradingPair[0]) {
              // this.unsubscribe('PO', [data.event.split('.')[1]]);
              return;
            }
          }
        } else {
          if (data.event.includes(".")) {
            if (data.event.split(".")[1] !== this.tradingPair) {
              // this.unsubscribe('PO', [data.event.split('.')[1]]);
              return;
            }
          }
        }

        const [eventName] = event.split(".");
        const method = this.eventHandlers?.[eventName];

        if (method) {
          method(data?.data);
        }

        try {
          const _e = data?.event?.split(".");

          if (_e[0] === "OB") {
            store.dispatch(setOrderBook(data?.data));
          } else if (_e[0] === "RT") {
            store.dispatch(setMarketTrade(data?.data));
          } else if (_e[0] === "MK") {
            store.dispatch(
              setDataInChannel({
                channelName: "Market",
                channelData: data?.data,
              })
            );

            const marketData = data?.data;
            if (marketData?.length) {
              const _exchangePair = marketData.find(
                (m) =>
                  m.base ===
                    store.getState().exchange.tradingPair.baseCurrency &&
                  m.quote ===
                    store.getState().exchange.tradingPair.quoteCurrency
              );

              window.staticMarket = data?.data.slice(0, 10);

              // console.log(_exchangePair);
              store.dispatch(setExchangeTrading(_exchangePair));
            }
          }
        } catch (error) {
          console.log("Error occured while reading message.");
        }

        if (data?.event === "MK") {
          this.lastTs = new Date().getTime();
        }

        if (
          data.method === "subscribe" &&
          data.event &&
          data.event[0].event === "BL" &&
          data.event[0].message === "Access denied."
        ) {
          // const {
          //   auth: { authorization },
          // } = store.getState();
          // if (authorization) {
          //   this.login(authorization);
          // }
        }
      }
    }
  };

  afterStarted = () => {
    // Sometimes an invoke will be called before the connection has initialized
    // `afterStart` collects functions to run and runs them on initialization
    if (this.afterStart.length) {
      this.afterStart.forEach((singleFn) => singleFn());
      this.afterStart = [];
    }
  };

  getEventsWithChannels = (events, channels) => {
    let initialEvents = isArray(events) ? events : [events];
    if (!channels) {
      return initialEvents;
    }

    const channelString = isArray(channels) ? channels.join(".") : channels;

    const updatedEvents = initialEvents.map(
      (singleEvent) => `${singleEvent}.${channelString}`
    );

    return updatedEvents;
  };

  subscribe = (events, channels) => {
    // console.log("subscribe", events, channels);
    if (channels !== undefined) {
      this.tradingPair = channels;
    }

    this.send({
      method: "subscribe",
      events: this.getEventsWithChannels(events, channels),
    });
  };

  unsubscribe(events, channels) {
    // console.log("unsubscribe", events, channels);
    this.send({
      method: "unsubscribe",
      events: this.getEventsWithChannels(events, channels),
    });
  }

  login(token) {
    this.send({
      method: "login",
      token,
    });

    this.unsubscribe("BL");
    // this.unsubscribe("PO.ALL");

    this.subscribe("BL");
    // this.subscribe("PO.ALL");
  }

  logout() {
    this.send({
      method: "logout",
    });
  }

  send(message) {
    // console.log("send message", message);

    const messageToSend = isString(message) ? message : JSON.stringify(message);

    if (this.connection.readyState === 1) {
      return this.connection.send(messageToSend);
    }

    this.afterStart = [
      ...this.afterStart,
      () => {
        this.send(message);
      },
    ];
  }

  on = (eventName, callback) => {
    this.eventHandlers[eventName] = callback;
  };

  off = (eventName) => {
    delete this.eventHandlers[eventName];
  };
}

export const socket = new WebSocketConnection();
window.socket = socket;
