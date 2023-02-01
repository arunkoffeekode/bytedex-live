import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import { selectAuthorized } from "../../store/authSlice";
import { selectBaseFiat } from "../../store/currencySlice";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import LoginToTrade from "../trade/LoginToTrade";
import PairSelection from "./PairSelection";
import PaymentAmount from "./PaymentAmount";
import ReceivedAmount from "./ReceivedAmount";

export const txns = Object.freeze({
  buy: "BUY",
  sell: "SELL",
});

export default function TokenLauncher() {
  const { t } = useTranslation();

  const authed = useSelector(selectAuthorized);

  const [tradePair, setTradePair] = useState(null);
  const [base, setBase] = useState(null);
  const [quote, setQuote] = useState(null);
  const [transaction, setTransaction] = useState({
    type: txns.buy,
    price: null,
    buyCurrency: "",
    buyAmount: 0,
    sellCurrency: "",
    sellAmount: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (tradePair) {
      getBalanceForTradeCurrencies();
    }
  }, [tradePair]);

  async function getBalanceForTradeCurrencies() {
    try {
      const baseReq = authenticatedInstance({
        url: apis.walletBalance,
        method: "POST",
        data: {
          currency: tradePair.base,
        },
      });
      const quoteReq = authenticatedInstance({
        url: apis.walletBalance,
        method: "POST",
        data: {
          currency: tradePair.quote,
        },
      });

      const [baseRes, quoteRes] = await Promise.all([baseReq, quoteReq]);

      // console.log(baseRes.data, quoteRes);
      setBase({ ...base, ...baseRes.data.data[0] });
      setQuote({ ...quote, ...quoteRes.data.data[0] });
      setTransaction({
        ...transaction,
        sellCurrency: quoteRes.data.data[0].currency,
        buyCurrency: baseRes.data.data[0].currency,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function placeOrder() {
    try {
      let data = {
        side: transaction.type,
        volume: transaction.sellAmount, // user defined value
        rate: transaction.price,
        timeInForce: "GTC",
        type: "LIMIT",

        market: tradePair.quote,
        trade: tradePair.base,
      };

      console.log(data);

      const res = await await authenticatedInstance({
        url: apis.placeOrder,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        console.log(res.data);
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
      {/* <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="images/banner.png"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="images/banner.png"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="images/banner.png"
              alt="Third slide"
            />
          </div>
        </div>
      </div> */}
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-interval="10000">

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              className="d-block w-100"
              src="/images/banner.png"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              className="d-block w-100"
              src="/images/market-trand.png"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              className="d-block w-100"
              src="/images/banner.png"
              alt="First slide"
            />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <section className="token-launch">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="launch">
              <div className="launch-step">
                <div className="launch-title">
                  {/* <p>{JSON.stringify(instapairs,null,2)}</p> */}
                  <h2>{t("instaTrade.title")}</h2>
                </div>

                <div className="launch-details">
                  <PairSelection
                    base={base}
                    quote={quote}
                    transaction={transaction}
                    setTransaction={setTransaction}
                    onSelect={(value) => {
                      setTradePair(value);
                    }}
                  />

                  {base && quote && (
                    <form>
                      <div className="form-row">
                        <div className="mb-4">
                          <PaymentAmount
                            pair={tradePair}
                            base={base}
                            setBase={setBase}
                            quote={quote}
                            setQuote={setQuote}
                            transaction={transaction}
                            setTransaction={setTransaction}
                          />
                        </div>
                        <div className="mb-4">
                          <ReceivedAmount
                            pair={tradePair}
                            base={base}
                            setBase={setBase}
                            quote={quote}
                            setQuote={setQuote}
                            transaction={transaction}
                            setTransaction={setTransaction}
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <p
                            style={{ color: "red", size: 4, marginLeft: 20 }}
                            id="error_message"
                          >
                            {error || ""}
                          </p>
                          <p>{t("instaTrade.feeText")} </p>
                        </div>
                        <div className="form-group col-md-12">
                          <div className="buy-btn">
                            {authed ? (
                              <button
                                type="button"
                                className="buy"
                                onClick={() => {
                                  placeOrder();
                                }}
                              >
                                Trade
                              </button>
                            ) : (
                              <LoginToTrade />
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  {!authed && <LoginToTrade />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
