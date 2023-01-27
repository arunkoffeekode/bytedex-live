import React, { useEffect, useState } from "react";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectAuthorized } from "../store/authSlice";
import LoginToTrade from "../component/trade/LoginToTrade";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../utils/v2/toasts";

function TokenLauncher() {
  const { t } = useTranslation();
  const authed = useSelector(selectAuthorized);

  const [instapairs, setInstaPairs] = useState([]);
  const [balance, setBalance] = useState();
  const [quote, setQuote] = useState();
  const [base, setBase] = useState();
  const [selectedQuote, setSelectedQuote] = useState();
  const [IndexofQuote, setIndexofQuote] = useState(0);

  const [error, setError] = useState("");

  const unique = [...new Set(instapairs.map((item) => item.quoteCurrency))];

  const options = instapairs.filter((el) =>
    el.quoteCurrency === selectedQuote ? el.baseCurrency : null
  );

  async function GetInstaPairsData() {
    try {
      const res = await authenticatedInstance({
        url: apis.GetInstaPairs,
        method: "GET",
      });
      if (res.data?.status === "Success") {
        setInstaPairs(res.data?.data);
        // successToast(t(`messages.${res?.data?.message}`));
      } else {
        // errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function GetBalance() {
    try {
      const res = await authenticatedInstance({
        url: apis.walletBalance,
        method: "POST",
        data: {
          currency: "ALL",
        },
      });

      if (res.data?.status === "Success") {
        setBalance(res.data?.data[0].balance);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RequestInstaTradeData(e) {
    e.preventDefault();
    try {
      const res = await authenticatedInstance({
        url: apis.RequestInstaTrade,
        method: "POST",
        data: {
          baseAmount: base,
          baseCurrency: instapairs[0].baseCurrency,
          okx_quote_id: "",
          order_id: "",
          quoteCurrency: instapairs[0].quoteCurrency,
        },
      });

      if (res.data?.status === "Success") {
        setError(res.data?.message);
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        setError(`${res.data?.data}.  ${res.data?.message}`);
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function toFixed(x) {
    if (!x) return;

    let data = x.rate - (x.rate * x.commission) / 100;
    let num = 1 / data;

    if (Math.abs(num) < 1.0) {
      let e = parseInt(num.toString().split("e-")[1]);
      if (e) {
        num *= Math.pow(10, e - 1);
        num = "0." + new Array(e).join("0") + num.toString().substring(2);
      }
    } else {
      let e = parseInt(num.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        num /= Math.pow(10, e);
        num += new Array(e + 1).join("0");
      }
    }
    return num;
  }

  function QuoteToBaseCurrency(x, event) {
    // alert(JSON.stringify(x))
    setQuote(event.target.value);
    let data = x.rate - (x.rate * x.commission) / 100;
    let num = event.target.value / data;

    if (Math.abs(num) < 1.0) {
      let e = parseInt(num.toString().split("e-")[1]);
      if (e) {
        num *= Math.pow(10, e - 1);
        num = "0." + new Array(e).join("0") + num.toString().substring(2);
      }
    } else {
      let e = parseInt(num.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        num /= Math.pow(10, e);
        num += new Array(e + 1).join("0");
      }
    }
    setBase(num.toString().slice(0, 10));
  }

  const BaseToQuote = (x, event) => {
    setBase(event.target.value);
    let data = x.rate - (x.rate * x.commission) / 100;
    let num = event.target.value * data;
    return setQuote(num);
  };

  const SetUniqueReceievd = (el, index) => {
    setSelectedQuote(el);
    setIndexofQuote(index);
    setQuote(0);
    setBase(0);
  };

  useEffect(() => {
    GetInstaPairsData();
    GetBalance();
  }, []);

  return (
    <div>
      <div
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
      </div>
      <section className="token-launch">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="launch">
              <div className="launch-step">
                <div className="launch-title">
                  {/* <p>{JSON.stringify(instapairs,null,2)}</p> */}
                  <h2>{t("instaTrade.title")}</h2>
                  <ToastContainer />
                </div>
                {
                  <div className="launch-details">
                    <p>
                      {t("instaTrade.estimate", {
                        currency: instapairs[IndexofQuote]?.quoteCurrency,
                      })}
                    </p>
                    <h3>
                      {toFixed(instapairs[IndexofQuote])}{" "}
                      {instapairs[IndexofQuote]?.baseCurrency}
                    </h3>
                    <div className="usdt-avex-details">
                      <div className="name-used">{t("instaTrade.youHave")}</div>
                      <div className="used">
                        <span className="p-1">
                          {balance} {instapairs[IndexofQuote]?.baseCurrency}
                        </span>
                        <span className="p-1">
                          {instapairs[IndexofQuote]?.quoteCurrency}
                        </span>
                      </div>
                    </div>
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="inputName">
                            {t("instaTrade.payment")}
                          </label>
                          <p>
                            {t("instaTrade.spendBetween", {
                              min: instapairs[IndexofQuote]?.minLimit,
                              max: instapairs[IndexofQuote]?.maxLimit,
                              currency: instapairs[IndexofQuote]?.baseCurrency,
                            })}
                          </p>
                          <div className="input-group">
                            <input
                              // type="text" pattern="\d*" maxlength="9"
                              type="number"
                              className="form-control"
                              value={base}
                              placeholder="0.0000000"
                              aria-describedby="basic-addon2"
                              onChange={(e) =>
                                BaseToQuote(instapairs[IndexofQuote], e)
                              }
                            />
                            <div
                              className="dropdown input-group-text"
                              id="basic-addon2"
                            >
                              <button
                                className=" dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <img
                                  src={`/images/cryptocurrency-icons/color/${instapairs[
                                    IndexofQuote
                                  ]?.baseCurrency.toLowerCase()}.svg`}
                                  alt=""
                                />
                                {instapairs[IndexofQuote]?.baseCurrency}
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {options.map((d, index) => (
                                  <button className="dropdown-item">
                                    <img
                                      src={`/images/cryptocurrency-icons/color/${d.baseCurrency.toLowerCase()}.svg`}
                                      alt=""
                                    />
                                    {d.baseCurrency}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputName">
                            {t("instaTrade.receive")}
                          </label>
                          <div className="input-group">
                            <input
                              // type="text" pattern="\d*" maxlength="8"
                              type="number"
                              className="form-control"
                              placeholder="0.0000000"
                              aria-describedby="basic-addon2"
                              value={quote}
                              onChange={(e) =>
                                QuoteToBaseCurrency(instapairs[IndexofQuote], e)
                              }
                            />
                            <div
                              className="dropdown input-group-text"
                              id="basic-addon2"
                            >
                              <button
                                className=" dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <img
                                  src={`/images/cryptocurrency-icons/color/${instapairs[
                                    IndexofQuote
                                  ]?.quoteCurrency.toLowerCase()}.svg`}
                                  alt=""
                                />
                                {instapairs[IndexofQuote]?.quoteCurrency}
                              </button>
                              <div
                                className="dropdown-menu"
                                // aria-labelledby="dropdownMenuButton"
                              >
                                {unique?.map((el, index) => (
                                  <button
                                    className="dropdown-item"
                                    onClick={() => SetUniqueReceievd(el, index)}
                                  >
                                    <img
                                      src={`/images/cryptocurrency-icons/color/${el.toLowerCase()}.svg`}
                                      alt=""
                                    />
                                    {el}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
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
                                type="submit"
                                onClick={(e) => RequestInstaTradeData(e)}
                                className="buy"
                              >
                                Buy {instapairs[IndexofQuote]?.quoteCurrency}
                              </button>
                            ) : (
                              <LoginToTrade />
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TokenLauncher;
