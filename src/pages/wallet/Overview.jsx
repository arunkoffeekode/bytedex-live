import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { apis } from "../../apis.constants";
import {
  selectBaseFiat,
  selectCryptoRates,
  selectFiatRates,
} from "../../store/currencySlice";
import { setUserProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";

export default function WalletOverview() {
  const { t } = useTranslation();

  const cryptoRates = useSelector(selectCryptoRates);
  const fiatRates = useSelector(selectFiatRates);
  const baseFiat = useSelector(selectBaseFiat);

  const dispatch = useDispatch();

  const [balances, setBalances] = useState([]);
  const [renderedData, setRenderedData] = useState([]);
  const [btcRate, setBTCRate] = useState(null);

  const [hideBalance, setHideBalance] = useState(false);
  const [hideLowBalance, setHideLowBalance] = useState(false);

  useEffect(() => {
    ProfileRequest();
    WalletBalanceRequest();
    // CryptoAddresesRequest();
    // AllTransactionsRequest();
  }, []);

  async function ProfileRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.profile,
        method: "GET",
      });
      if (res.data?.status === "Success") {
        dispatch(setUserProfile(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function WalletBalanceRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.walletBalance,
        method: "POST",
        data: {
          currency: "ALL",
        },
      });
      // console.log(res);
      // console.log(res.data);
      if (res.data?.status === "Success") {
        res.data?.data?.sort((a, b) => b.balance - a.balance);
        setBalances(res.data?.data);
        setRenderedData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(cryptoRates, fiatRates, baseFiat);
    if (cryptoRates?.length) {
      setBTCRate({ ...cryptoRates?.find((el) => el.currency === "BTC") });
    }
  }, [cryptoRates, fiatRates, baseFiat]);

  const getPortfolioValues = useCallback(() => {
    let btcTotal = 0,
      fiatTotal = 0;
    for (let i = 0; i < balances.length; i++) {
      const el = balances[i];
      if (el.balance > 0) {
        btcTotal += parseFloat(
          toBTC(
            el?.balance + el?.balanceInTrade,
            cryptoRates?.find((c) => c.currency === el.currency),
            btcRate
          )
        );
        fiatTotal += parseFloat(
          toFiat(
            el?.balance + el.balanceInTrade,
            cryptoRates?.find((c) => c.currency === el.currency),
            baseFiat
          )
        );
      }
    }

    return { btc: btcTotal, fiat: fiatTotal };
  }, [balances, baseFiat]);

  const handleOnSearch = (string, results) => {
    if (string !== "") {
      setRenderedData(results);
    }
  };

  const formatResult = (item) => {
    return (
      <div className="py-2 cursor-pointer">
        <div className="img-text">
          <img
            style={{ width: "1rem", height: "1rem" }}
            className="mr-2 me-2"
            src={`/images/cryptocurrency-icons/color/${item.currency.toLowerCase()}.svg`}
            alt={item.currency.toLowerCase()}
          />
          <span className="fw-bold">{item.currency}</span>
        </div>
        <div className="pr-4 pe-4 d-flex justify-content-between">
          <div className="balance">
            <div className="balance-details">
              <div>
                {numeral(item.balance).format("00,00,000.0000")} {item.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            {/* <pre>{JSON.stringify(profile, null, 12)}</pre> */}
            <div className="wallet-overview">
              <h3>{t("wallet.overview.link")}</h3>
              <div className="row">
                <div className="col-lg-8 col-md-12 col-xl-8 col-sm-12">
                  <div className="account-balance">
                    <p>{t("wallet.overview.portfolio")}</p>
                    <div className="balance-ac">
                      {numeral(getPortfolioValues().btc).format("0.000000")} BTC
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-xl-4 col-sm-12">
                  <div className="account-balance1">
                    <div className="estimated-value">
                      ≈ {numeral(getPortfolioValues().fiat).format("0.00")}{" "}
                      {baseFiat.currency}
                      <span>Estimated Value</span>
                    </div>
                    <div className="estimated-value mb-0">
                      0.00001 BTC{" "}
                      <span>{t("wallet.withdrawals.withdrawalLimit")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="security pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hideBalanceInput"
                  id="inlineRadio1"
                  checked={hideBalance}
                  onClick={() => {
                    setHideBalance(!hideBalance);
                  }}
                />
                <label className="form-check-label" for="inlineRadio1">
                  {t("tables.walletOverview.hideBalances")}
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hideLowBalance"
                  id="inlineRadio2"
                  checked={hideLowBalance}
                  onClick={() => {
                    setHideLowBalance(!hideLowBalance);
                  }}
                />
                <label className="form-check-label" for="inlineRadio2">
                  {t("tables.walletOverview.lowBalances")}
                </label>
              </div>
              <div className="right-searchbar">
                <button type="button" className="external-link">
                  <i className="fa fa-external-link" aria-hidden="true"></i>
                </button>
                <ReactSearchAutocomplete
                  items={balances}
                  showIcon={false}
                  fuseOptions={{ keys: ["currency"] }}
                  placeholder={t("forms.common.search")}
                  onSearch={handleOnSearch}
                  formatResult={formatResult}
                />
              </div>
            </div>

            {/* <pre>{JSON.stringify(baseFiat, null, 2)}</pre> */}

            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("tables.walletOverview.currency")}</th>
                      <th scope="col">{t("tables.walletOverview.balance")}</th>
                      <th scope="col">{t("tables.walletOverview.inOrders")}</th>
                      <th scope="col">{t("tables.walletOverview.total")}</th>
                      <th scope="col">{t("tables.walletOverview.actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderedData?.map((bal, key) => (
                      <React.Fragment key={key}>
                        {!(bal.balance === 0 && hideLowBalance) && (
                          <tr>
                            <td>
                              <div className="img-text">
                                <img
                                  src={`/images/cryptocurrency-icons/color/${bal.currency}.svg`}
                                  alt={bal.currency}
                                ></img>
                                <span>{bal.currency}</span>
                              </div>
                            </td>
                            <td>
                              <div className="balance">
                                <div className="name">
                                  {hideBalance ? "****.**" : bal.balance}{" "}
                                  {bal.currency}
                                </div>
                                <div className="balance-details">
                                  <div className="text-muted">
                                    {hideBalance
                                      ? "****.**"
                                      : bal?.balance > 0
                                      ? toBTC(
                                          bal?.balance,
                                          cryptoRates?.find(
                                            (el) => el.currency === bal.currency
                                          ),
                                          btcRate
                                        )
                                      : bal.balance}{" "}
                                    BTC
                                  </div>
                                  <div className="text-muted">
                                    {hideBalance
                                      ? "****.**"
                                      : bal?.balance > 0
                                      ? toFiat(
                                          bal.balance,
                                          cryptoRates?.find(
                                            (el) => el.currency === bal.currency
                                          ),
                                          baseFiat
                                        )
                                      : bal.balance}{" "}
                                    {baseFiat?.currency}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="balance">
                                <div className="name">
                                  {hideBalance ? "****.**" : bal.balanceInTrade}{" "}
                                  {bal.currency}
                                </div>
                                <div className="text-muted">
                                  {hideBalance
                                    ? "****.**"
                                    : bal?.balanceInTrade > 0
                                    ? toBTC(
                                        bal?.balanceInTrade,
                                        cryptoRates?.find(
                                          (el) => el.currency === bal.currency
                                        ),
                                        btcRate
                                      )
                                    : bal.balanceInTrade}{" "}
                                  BTC
                                </div>
                                <div className="text-muted">
                                  {hideBalance
                                    ? "****.**"
                                    : bal?.balanceInTrade > 0
                                    ? toFiat(
                                        bal.balanceInTrade,
                                        cryptoRates?.find(
                                          (el) => el.currency === bal.currency
                                        ),
                                        baseFiat
                                      )
                                    : bal.balanceInTrade}{" "}
                                  {baseFiat?.currency}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="balance">
                                <div className="name">
                                  {hideBalance
                                    ? "****.**"
                                    : bal?.balance + bal?.balanceInTrade}{" "}
                                  {bal.currency}
                                </div>
                                <div className="text-muted">
                                  {hideBalance
                                    ? "****.**"
                                    : bal?.balance + bal?.balanceInTrade > 0
                                    ? toBTC(
                                        bal?.balance + bal?.balanceInTrade,
                                        cryptoRates?.find(
                                          (el) => el.currency === bal.currency
                                        ),
                                        btcRate
                                      )
                                    : bal?.balance + bal?.balanceInTrade}{" "}
                                  BTC
                                </div>
                                <div className="text-muted">
                                  {hideBalance
                                    ? "****.**"
                                    : bal?.balance + bal.balanceInTrade > 0
                                    ? toFiat(
                                        bal?.balance + bal.balanceInTrade,
                                        cryptoRates?.find(
                                          (el) => el.currency === bal.currency
                                        ),
                                        baseFiat
                                      )
                                    : bal.balance + bal.balanceInTrade}{" "}
                                  {baseFiat?.currency}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-ellipsis-v"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Deposit
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Withdraw
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Trade
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function toBTC(balance, cryptoRate, BTCrate) {
  return numeral(
    ((balance * cryptoRate?.rate) / BTCrate?.rate).toFixed(8)
  ).format("0.00000");
}

function toFiat(balance, cryptoRate, baseFiat) {
  return numeral(
    (balance * cryptoRate?.rate * baseFiat?.rate).toFixed(8)
  ).format("0.00000");
}
