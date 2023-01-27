import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "../component/Trade.css";
import Trading from "../component/trade/Trading";
import HotPairSlider from "../component/trade/HotPairSlider";
import OrderBook from "../component/trade/OrderBook";
import TradePair from "../component/trade/TradePair";
import RecentTrades from "../component/trade/RecentTrades";
import TradesHistory from "../component/trade/TradesHistory";
import TradeTable from "../component/trade/TradeTable";
import Chart from "../component/trade/TradingViewChart/Chart";
import { selectMarket } from "../store/dataStoreSlice";
import {
  selectTradingPairStats,
  setExchangeTrading,
  setTradingPair,
} from "../store/exchangeSlice";
import { socket } from "../WebSocketConnection";

function Trade() {
  const { pair } = useParams();
  const market = useSelector(selectMarket);
  const dispatch = useDispatch();
  const tradingPairStats = useSelector(selectTradingPairStats);

  useEffect(() => {
    socket.subscribe("MK");
  }, []);

  useEffect(() => {
    dispatch(
      setTradingPair({ base: pair.split("-")[0], quote: pair.split("-")[1] })
    );

    const _f = market?.find(
      (el) => el.base === pair.split("-")[0] && el.quote === pair.split("-")[1]
    );
    _f && dispatch(setExchangeTrading(_f));
  }, [pair]);

  const [state, setState] = useState({
    buyBalance: 0,
    buyCurrency: "",
    buyValue: tradingPairStats.lastPrice,
    buyAmount: 0,
    buyVolume: 0,
    buyTotal: 0,
    buyTimeInForce: "GTC",

    sellBalance: 0,
    sellCurrency: "",
    sellValue: tradingPairStats.lastPrice,
    sellAmount: 0,
    sellVolume: 0,
    sellTotal: 0,
    sellTimeInForce: "GTC",
  });

  return (
    <div>
      <HotPairSlider />
      <TradePair />

      <div className="container-fluid" style={{ maxWidth: '100%' }}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12 gtter col-xxl-7">
            <Chart />
          </div>
          <div className="col-lg-6 col-xl-6 col-md-12 col-xxl-5">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 gtter col-xxl-6">
                <OrderBook state={state} setState={setState} />
              </div>

              <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 gtter col-xxl-6">
                {/* <TradesHistory /> */}
                <RecentTrades />
              </div>
            </div>
          </div>


          <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6 gtter">
            <div className="blnce">
              <Trading state={state} setState={setState} />
            </div>
          </div>

          <div className="col-12 col-xxl-6 gtter">
            <TradeTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
