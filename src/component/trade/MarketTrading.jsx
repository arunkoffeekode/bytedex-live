import numeral from "numeral";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { apis } from "../../apis.constants";
import { selectAuthorized } from "../../store/authSlice";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import AmountProgress from "./AmountProgress";
import LoginToTrade from "./LoginToTrade";

export default function MarketTrading({ state, setState }) {
  const { t } = useTranslation();

  const authed = useSelector(selectAuthorized);

  async function BuyTradeRequest() {
    try {
      const data = {
        side: "BUY",
        amount: state.buyAmount,
        market: state.buyCurrency,
        trade: state.sellCurrency,
      };

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

      alert(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function SellTradeRequest() {
    try {
      const data = {
        side: "SELL",
        amount: state.sellAmount,
        market: state.buyCurrency,
        trade: state.sellCurrency,
      };

      console.log(data);
      const res = await authenticatedInstance({
        url: apis.placeOrder,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        errorToast(t(`messages.${res?.data?.message}`));
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
              <div class="contact-form">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputName">{t("forms.marketOrder.rate")}</label>
                    <input
                      className="form-control"
                      type="number"
                      value={state.buyValue}
                      onChange={(e) => {
                        setState({ ...state, buyValue: e.target.value });
                      }}
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputName">
                      {t("forms.marketOrder.volume")}
                    </label>
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
                            buyAmount: parseFloat(_vol) / state.buyValue,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-12 mb-4">
                    <label for="inputName">
                      {t("forms.marketOrder.total")}{" "}
                      {state.buyValue * state.buyAmount}
                    </label>
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
              <div class="contact-form">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputName">{t("forms.marketOrder.rate")}</label>
                    <input
                      className="form-control"
                      type="number"
                      value={state.sellValue}
                      onChange={(e) => {
                        setState({ ...state, sellValue: e.target.value });
                      }}
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="inputName">
                      {t("forms.marketOrder.volume")}
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
                            sellAmount: parseFloat(_vol) / state.sellValue,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group col-md-12 mb-4">
                    <label for="inputName">
                      {t("forms.marketOrder.total")}{" "}
                      {state.sellValue * state.sellAmount}
                    </label>
                  </div>
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
                {t("exchange.BUY")}
                {state.sellCurrency}
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
