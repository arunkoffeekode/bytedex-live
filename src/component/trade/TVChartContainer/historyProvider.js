import axios from "axios";
// import { moment } from "i18n";
import moment from "moment";
import qs from "qs";
import { url } from "../../../apis.constants";

const history = {};

const resolutions = {
  1: "1",
  5: "5",
  15: "15",
  30: "15",
  60: "60",
  240: "240",
  "1D": "1440",
  D: "10080",
};

const historyProvider = {
  history: history,

  getBars: async (symbolInfo, resolution, from, to, first, limit) => {
    // console.log("historyProvider getBars", from, to, first, limit);

    try {
      const split_symbol = symbolInfo.name.split(/[:/]/);
      const queryString = qs.stringify({
        baseCurrency: split_symbol[0],
        quoteCurrency: split_symbol[1],
        timestamp: first
          ? moment
              .unix(to)
              // .subtract(1, 'm')
              .valueOf()
          : to * 1000,
        interval: resolutions[resolution],
        limit: limit ? limit : 1000,
      });

      // console.log(`${url}/market/get-chart-data?${queryString}`);
      const { data } = await axios({
        url: `${url}/market/get-chart-data?${queryString}`,
        method: "GET",
      });

      if (data.status === "Error" || data.data.length === 0) {
        return [];
      }

      if (data.data.length) {
        const bars = data.data.map((bar) => {
          delete bar.ID;

          return {
            ...bar,
            time: moment(bar.time).valueOf(),
          };
        });

        if (first) {
          const lastBar = bars[0];
          history[symbolInfo.name] = { lastBar };
        }

        return bars.reverse();
      }
    } catch (error) {
      console.log("Error historyProvider", error);
    }
  },
};

export default historyProvider;
