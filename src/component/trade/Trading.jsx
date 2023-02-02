import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { apis } from "../../apis.constants";
import { selectCryptoRates } from "../../store/currencySlice";
import {
  selectTradingPair,
  selectTradingPairSettings,
  selectTradingPairStats,
} from "../../store/exchangeSlice";
import { authenticatedInstance } from "../../utils/api";
import LimitTrading from "./LimitTrading";
import MarketTrading from "./MarketTrading";
import StopTrading from "./StopTrading";

export default function Trading({ state, setState }) {
  const { t } = useTranslation();

  const tradeModes = [
    { key: "LIMIT", label: t("exchange.limitOrder") },
    { key: "MARKET", label: t("exchange.marketOrder") },
    { key: "STOP", label: t("exchange.stopOrder") },
  ];

  const tradingPair = useSelector(selectTradingPair);
  const tradingPairStats = useSelector(selectTradingPairStats);
  const tradingPairSettings = useSelector(selectTradingPairSettings);
  const cryptoRates = useSelector(selectCryptoRates);

  const [mode, setMode] = useState("LIMIT");

  useEffect(() => {
    try {
      const { baseCurrency, quoteCurrency } = tradingPair;

      (async () => {
        const baseBalRes = authenticatedInstance({
          url: apis.walletBalance,
          method: "POST",
          data: {
            currency: baseCurrency,
          },
        });

        const quoteBalRes = authenticatedInstance({
          url: apis.walletBalance,
          method: "POST",
          data: {
            currency: quoteCurrency,
          },
        });

        const [_baseBalRes, _quoteBalRes] = await Promise.all([
          baseBalRes,
          quoteBalRes,
        ]);

        // console.log(_baseBalRes.data.data[0], _quoteBalRes.data.data[0]);

        setState({
          ...state,
          buyBalance: _quoteBalRes.data?.data[0]?.balance,
          buyCurrency: _quoteBalRes.data?.data[0]?.currency,
          sellBalance: _baseBalRes.data?.data[0]?.balance,
          sellCurrency: _baseBalRes.data?.data[0]?.currency,
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [tradingPair]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="trade-tab">
            <div style={{float:'left'}}>
              {/* {["LIMIT", "MARKET", "STOP"].map((el) => ( */}
              {tradeModes.map((el, key) => (
                <button
                  key={key}
                  onClick={() => setMode(el.key)}
                  className="limit-tab"
                  type="button"
                >
                  {el.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn-sm"
              data-toggle="modal"
              data-target="#tradingRuleModal"
            style={{float:'right'}}>
              Trading Rules
            </button>
          </div>
        </div>
      </div>

      {mode === "LIMIT" && <LimitTrading state={state} setState={setState} />}
      {mode === "MARKET" && <MarketTrading state={state} setState={setState} />}
      {mode === "STOP" && <StopTrading state={state} setState={setState} />}

      {/* <pre>{JSON.stringify({ state }, null, 2)}</pre> */}
      <div
        className="modal fade"
        id="tradingRuleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="tradingRuleModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="tradingRuleModal">
                Trading Rules
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                {/* Min Price Movement {tradingPairSettings} {tradingPairStats.quoteCurrency} */}
              </div>
              <div>
                Min Trade Amount (Size) {tradingPairSettings.minTradeAmount}{" "}
                {tradingPairStats.baseCurrency}
              </div>
              <div>
                Min Order Size {tradingPairSettings.minOrderValue}{" "}
                {tradingPairStats.quoteCurrency}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
