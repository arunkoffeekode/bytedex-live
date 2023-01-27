import numeral from "numeral";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import { selectAuthorized } from "../../store/authSlice";
import { selectTradingPair } from "../../store/exchangeSlice";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import AmountProgress from "./AmountProgress";
import LoginToTrade from "./LoginToTrade";

export default function LimitTrading({ state, setState }) {
  const { t } = useTranslation();
  const tradingPair = useSelector(selectTradingPair);
  const authed = useSelector(selectAuthorized);

  async function BuyTradeRequest() {
    try {
      const data = {
        side: "BUY",
        volume: state.buyAmount,
        rate: state.buyValue,
        type: "LIMIT",
        timeInForce: state.buyTimeInForce,
        market: state.buyCurrency,
        trade: state.sellCurrency,
      };

      // console.log("buy req", data);

      const res = await authenticatedInstance({
        url: apis.placeOrder,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        // console.log("buy res", res.data);
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function SellTradeRequest() {
    try {
      const data = {
        side: "SELL",
        volume: state.sellAmount,
        rate: state.sellValue,
        type: "LIMIT",
        timeInForce: state.sellTimeInForce,
        market: state.buyCurrency,
        trade: state.sellCurrency,
      };

      // console.log("sell req", data);

      const res = await authenticatedInstance({
        url: apis.placeOrder,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        // console.log("sell res", res.data);
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
          <div className="usdt-balence">
            <h6>
              {state.buyCurrency} Balance: {state.buyBalance}
            </h6>
            <div className="usdt-balence-form shadow">
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName">
                      {t("forms.limitOrder.rate")}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={state.buyValue}
                      onChange={(e) => {
                        setState({ ...state, buyValue: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName">
                      {t("forms.limitOrder.volume")}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={state.buyAmount}
                      onChange={(e) => {
                        setState({ ...state, buyAmount: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    {/* <label htmlFor="inputName">
                      Volume {state.buyVolume && state.buyVolume + "%"}
                    </label> */}
                    <div className="my-2 mb-4">
                      <AmountProgress
                        value={state.buyVolume}
                        onChange={(val) => {
                          const _vol = numeral(
                            state.buyBalance * (val / 100)
                          ).format("0.000");

                          setState({
                            ...state,
                            buyTotal: parseFloat(_vol),
                            buyVolume: val,
                            buyAmount: parseFloat(_vol) / state.buyValue,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12 mb-4">
                    <label htmlFor="inputName">
                      {t("forms.limitOrder.total")}{" "}
                      {state.buyValue * state.buyAmount}
                    </label>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName">Time in Force</label>
                    <select
                      className="form-control"
                      defaultValue="GTC"
                      onChange={(e) => {
                        setState({
                          ...state,
                          buyTimeInForce: e.target.value,
                        });
                      }}
                    >
                      <option value="GTC" selected>
                        {t("forms.limitOrder.goodTillCancelled")}
                      </option>
                      <option value="IOC">
                        {t("forms.limitOrder.immediateOrCancel")}
                      </option>
                      <option value="FOK">
                        {t("forms.limitOrder.fillOrKill")}
                      </option>
                      <option value="DO">
                        {t("forms.limitOrder.dayOnly")}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
          <div className="usdt-balence">
            <h6>
              {state.sellCurrency} Balance: {state.sellBalance}
            </h6>
            <div className="usdt-balence-form shadow">
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName">
                      {t("forms.limitOrder.rate")}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      value={state.sellValue}
                      onChange={(e) => {
                        setState({ ...state, sellValue: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName">
                      {t("forms.limitOrder.volume")}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      value={state.sellAmount}
                      onChange={(e) => {
                        setState({ ...state, sellAmount: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <div className="my-2 mb-4">
                      <AmountProgress
                        value={state.sellVolume}
                        onChange={(val) => {
                          const _vol = numeral(
                            state.sellBalance * (val / 100)
                          ).format("0.000");

                          setState({
                            ...state,
                            sellTotal: parseFloat(_vol),
                            sellVolume: val,
                            sellAmount: parseFloat(_vol) / state.sellValue,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12 mb-4">
                    <label htmlFor="inputName">
                      {t("forms.limitOrder.total")}{" "}
                      {state.sellValue * state.sellAmount}
                    </label>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputName">Time in Force</label>
                    <select
                      className="form-control"
                      value="GTC"
                      onChange={(e) => {
                        setState({
                          ...state,
                          sellTimeInForce: e.target.value,
                        });
                      }}
                    >
                      <option value="GTC" selected>
                        {t("forms.limitOrder.goodTillCancelled")}
                      </option>
                      <option value="IOC">
                        {t("forms.limitOrder.immediateOrCancel")}
                      </option>
                      <option value="FOK">
                        {t("forms.limitOrder.fillOrKill")}
                      </option>
                      <option value="DO">
                        {t("forms.limitOrder.dayOnly")}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {authed ? (
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
            <div className="buy-btn">
              <button type="button" className="buy" onClick={BuyTradeRequest}>
                {t("exchange.BUY")} {state.sellCurrency}
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
            <div className="buy-btn">
              <button type="button" className="sell" onClick={SellTradeRequest}>
                {t("exchange.SELL")} {state.sellCurrency}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoginToTrade />
      )}
    </div>
  );
}
