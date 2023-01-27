import numeral from "numeral";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import { selectAuthorized } from "../../store/authSlice";
import { selectTradingPairStats } from "../../store/exchangeSlice";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import AmountProgress from "./AmountProgress";
import LoginToTrade from "./LoginToTrade";

export default function StopTrading({ state, setState }) {
  const { t } = useTranslation();
  const authed = useSelector(selectAuthorized);
  const tradingPairStats = useSelector(selectTradingPairStats);
  const [option, setOption] = useState("SL");

  useEffect(() => {
    setState({
      ...state,
      buyStop: 0,
      buyLimit: tradingPairStats.lastPrice,
      buyTrailType: "absolute",
      buyTrail: 0,

      sellStop: 0,
      sellLimit: tradingPairStats.lastPrice,
      sellTrailType: "absolute",
      sellTrail: 0,
    });
  }, []);

  useEffect(() => {
    if (option === "SM") {
      setState({
        ...state,
        buyLimit: 1,
        sellLimit: 1,
      });
    }
  }, [option]);

  async function BuyTradeRequest() {
    try {
      const sl = {
        side: "BUY",
        volume: state.buyAmount.toString(),
        rate: state.buyLimit.toString(),
        stop: state.buyStop.toString(),
        market: state.buyCurrency,
        trade: state.sellCurrency,
        type: "STOPLIMIT",
      };
      const sm = {
        side: "SELL",
        volume: state.buyAmount.toString(),
        stop: state.buyStop.toString(),
        market: state.buyCurrency,
        trade: state.sellCurrency,
        type: "STOPMARKET",
      };
      const tsm = {
        side: "BUY",
        volume: state.buyAmount.toString(),
        trail: state.buyTrail.toString(),
        isTrailInPercentage: state.buyTrailType === "absolute" ? false : true,
        market: state.buyCurrency,
        trade: state.sellCurrency,
        type: "TRAILINGSTOPMARKET",
      };

      let data = {};
      switch (option) {
        case "SL":
          data = sl;
          break;
        case "SM":
          data = sm;
          break;
        case "TSM":
          data = tsm;
          break;
        default:
          break;
      }

      console.log(data);
      const res = await authenticatedInstance({
        url: apis.placeOrder,
        method: "POST",
        data,
      });
      if (res.data?.status === "Success") {
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
      const sl = {
        side: "SELL",
        volume: state.sellAmount.toString(),
        rate: state.sellLimit.toString(),
        stop: state.sellStop.toString(),
        market: state.buyCurrency,
        trade: state.sellCurrency,
        type: "STOPLIMIT",
      };
      const sm = {
        side: "SELL",
        volume: state.sellAmount.toString(),
        stop: state.sellStop.toString(),
        market: state.buyCurrency,
        trade: state.sellCurrency,
        type: "STOPMARKET",
      };
      const tsm = {
        side: "SELL",
        volume: state.sellAmount.toString(),
        trail: state.sellTrail.toString(),
        isTrailInPercentage: state.sellTrailType === "absolute" ? false : true,
        market: state.buyCurrency,
        trade: state.sellCurrency,
        type: "TRAILINGSTOPMARKET",
      };

      let data = {};
      switch (option) {
        case "SL":
          data = sl;
          break;
        case "SM":
          data = sm;
          break;
        case "TSM":
          data = tsm;
          break;
        default:
          break;
      }

      console.log(data);
      const res = await authenticatedInstance({
        url: apis.placeOrder,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
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
      <div className="d-flex">
        <select
          onChange={(e) => setOption(e.target.value)}
          className="form-control mb-3"
        >
          {[
            { label: t("forms.stopOrder.stopLimit"), value: "SL" },
            { label: t("forms.stopOrder.stopMarket"), value: "SM" },
            { label: t("forms.stopOrder.trailingStop"), value: "TSM" },
          ].map((el, key) => (
            <option
              key={key}
              value={el.value}
              selected={el.value === "SL" ? true : false}
            >
              {el.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          class="btn btn-sm"
          data-toggle="modal"
          data-target="#stopTradingRuleModal"
        >
          Rules
        </button>
      </div>

      <div
        class="modal fade"
        id="stopTradingRuleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="stopTradingRuleModal"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5>Buy Stop Limit & Stop Market</h5>

              <ul>
                <li>- Stop Price. &gt; Market Price</li>
                <li>- Stop Price. &lt; Limit Price</li>
              </ul>

              <h5>Sell Stop Limit & Stop Market</h5>
              <ul>
                <li>- Stop Price. &lt; Market Price</li>
                <li>- Stop Price. &gt; Limit Price</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
          <div className="usdt-balence">
            <h6>
              {state.buyCurrency} Balance: {state.buyBalance}
            </h6>
            <div className="usdt-balence-form shadow">
              <div class="contact-form">
                <div class="form-row">
                  {option !== "TSM" && (
                    <div class="form-group col-md-12">
                      <label for="inputName">
                        {t("forms.stopOrder.stopPrice")}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={state.buyStop}
                        onChange={(e) => {
                          setState({ ...state, buyStop: e.target.value });
                        }}
                      />
                    </div>
                  )}
                  {option === "SL" && (
                    <div class="form-group col-md-12">
                      <label for="inputName">{t("forms.stopOrder.rate")}</label>
                      <input
                        className="form-control"
                        type="number"
                        value={state.buyLimit}
                        onChange={(e) => {
                          setState({ ...state, buyLimit: e.target.value });
                        }}
                      />
                    </div>
                  )}
                  <div class="form-group col-md-12">
                    <label for="inputName">{t("forms.stopOrder.volume")}</label>
                    <input
                      className="form-control"
                      type="number"
                      value={state.buyAmount}
                      onChange={(e) => {
                        setState({ ...state, buyAmount: e.target.value });
                      }}
                    />
                  </div>
                  <div class="form-group col-md-12">
                    {/* <label for="inputName">
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
                            buyAmount: parseFloat(_vol) / state.buyLimit,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputName">
                      {t("forms.stopOrder.total")}{" "}
                      {state.buyLimit * state.buyAmount}
                    </label>
                  </div>
                  {option === "TSM" && (
                    <>
                      <div class="form-group col-md-12">
                        <label for="inputName">Trail Type</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setState({
                              ...state,
                              buyTrailType: e.target.value,
                            });
                          }}
                        >
                          <option value="absolute" selected>
                            {t("forms.stopOrder.absolute")}
                          </option>
                          <option value="percentage">
                            {t("forms.stopOrder.percentage")}
                          </option>
                        </select>
                      </div>
                      <div class="form-group col-md-12">
                        <label for="inputName">Trail</label>
                        <input
                          className="form-control"
                          type="number"
                          value={state.buyTrail}
                          onChange={(e) => {
                            setState({ ...state, buyTrail: e.target.value });
                          }}
                        />
                        <label>
                          {state.buyTrailType === "absolute"
                            ? state.buyCurrency
                            : "%"}
                        </label>
                      </div>
                    </>
                  )}
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
              <div class="contact-form">
                <div class="form-row">
                  {option !== "TSM" && (
                    <div class="form-group col-md-12">
                      <label for="inputName">
                        {t("forms.stopOrder.stopPrice")}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={state.sellStop}
                        onChange={(e) => {
                          setState({ ...state, sellStop: e.target.value });
                        }}
                      />
                    </div>
                  )}
                  {option === "SL" && (
                    <div class="form-group col-md-12">
                      <label for="inputName">{t("forms.stopOrder.rate")}</label>
                      <input
                        className="form-control"
                        type="number"
                        value={state.sellLimit}
                        onChange={(e) => {
                          setState({ ...state, sellLimit: e.target.value });
                        }}
                      />
                    </div>
                  )}
                  <div class="form-group col-md-12">
                    <label for="inputName">{t("forms.stopOrder.volume")}</label>
                    <input
                      className="form-control"
                      type="number"
                      value={state.sellAmount}
                      onChange={(e) => {
                        setState({ ...state, sellAmount: e.target.value });
                      }}
                    />
                  </div>
                  <div class="form-group col-md-12">
                    {/* <label for="inputName">
                      Volume {state.sellVolume && state.sellVolume + "%"}
                    </label> */}
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
                            sellAmount: parseFloat(_vol) / state.sellLimit,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputName">
                      {t("forms.stopOrder.total")}{" "}
                      {state.sellLimit * state.sellAmount}
                    </label>
                  </div>
                  {option === "TSM" && (
                    <>
                      <div class="form-group col-md-12">
                        <label for="inputName">Trail Type</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setState({
                              ...state,
                              sellTrailType: e.target.value,
                            });
                          }}
                        >
                          <option value="absolute" selected>
                            {t("forms.stopOrder.absolute")}
                          </option>
                          <option value="percentage">
                            {t("forms.stopOrder.percentage")}
                          </option>
                        </select>
                      </div>
                      <div class="form-group col-md-12">
                        <label for="inputName">Trail</label>
                        <input
                          className="form-control"
                          type="number"
                          value={state.sellTrail}
                          onChange={(e) => {
                            setState({ ...state, sellTrail: e.target.value });
                          }}
                        />
                        <label>
                          {state.sellTrailType === "absolute"
                            ? state.sellCurrency
                            : "%"}
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
          <div className="progbr">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "50%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                50%
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
          <div className="progbr">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "8%", backgroundColor: "#FF5364" }}
                aria-valuenow="8"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                0%
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
