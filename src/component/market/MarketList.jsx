import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { links } from "../../routes.constants";
import {
  selectBaseFiat,
  selectCryptoRates,
  selectFiatRates,
} from "../../store/currencySlice";
import { selectMarket } from "../../store/dataStoreSlice";
import { setExchangeTrading } from "../../store/exchangeSlice";
import { selectSettings } from "../../store/settingsSlice";
import { sortArrayByKey } from "../../utils/v2/sort";
import { socket } from "../../WebSocketConnection";

export default function MarketList({ mini = false }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const market = useSelector(selectMarket);
  const settings = useSelector(selectSettings);

  const baseFiat = useSelector(selectBaseFiat);
  const cryptoRates = useSelector(selectCryptoRates);

  const dispatch = useDispatch();

  const [loadMore, setLoadMore] = useState(false);

  const [filter, setFilter] = useState("USDT");
  const [filteredMarketData, setFilteredMarketData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("base_volume");

  useEffect(() => {
    socket.subscribe("MK");
  }, []);

  useEffect(() => {
    let _f = [],
      _m = [];

    if (settings?.market_groups?.length) {
      _m = settings?.market_groups[0]?.markets ?? [];
    }

    switch (filter) {
      case "USDT":
        _f = market?.filter(
          (el) =>
            // el.base === filter || !_m.includes(el.quote)
            el.quote === filter
        );
        break;

      case "BTC":
        _f = market?.filter(
          (el) => el.quote === filter
          // el.quote === filter || el.base === filter || !_m.includes(el.quote)
        );
        break;

      case "FIAT":
        _f = market?.filter(
          (el) => _m.includes(el.quote) || _m.includes(el.base)
        );
        break;

      default:
        break;
    }

    if (search) {
      const searched = market.filter(
        (el) => el.quote === search || el.base === search
      );
      _f = sortArrayByKey(searched, sortKey, true);
    }

    _f = sortArrayByKey(_f, sortKey, true);
    if (!loadMore) {
      _f = _f.slice(0, 5);
    }
    setFilteredMarketData(_f);
  }, [market, filter, search, sortKey, settings?.market_groups, loadMore]);

  // const handleOnSearch = (string, results) => {
  //   // string = string.toUpperCase();
  //   // setSearch(string);
  //   // const _f = market.filter((el) => el.quote === string || el.base === string);
  //   // setFilteredMarketData(_f);
  // };

  const handleOnSelect = (item) => {
    dispatch(setExchangeTrading(item));
    const pair = `${item.base}-${item.quote}`;
    navigate(`/trade/${pair}`, {
      replace: true,
    });
  };

  const formatResult = (item) => {
    return (
      <div className="py-2 cursor-pointer">
        <div className="img-text">
          <img
            style={{ width: "1rem", height: "1rem" }}
            className="mr-2 me-2"
            src={`/images/cryptocurrency-icons/color/${item.base.toLowerCase()}.svg`}
            alt={item.base.toLowerCase()}
          />
          <span className="fw-bold">
            {item.base}/{item.quote}
          </span>
        </div>
        <div className="pr-4 pe-4 d-flex justify-content-between">
          <div className="balance">
            <div className="balance-details">
              <div>{numeral(item.price).format("00,00,000.0000")}</div>
            </div>
          </div>
          <div
            className="small fw-bold"
            style={{
              color: item.change_in_price > 0 ? "#06CD9D" : "#FF5364",
            }}
          >
            {item.change_in_price > 0 && "+"}
            {numeral(item.change_in_price).format("0.00")}%
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="security pt-0 mb-0 pb-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>Market Trend</h3>
              <div className="right-searchbar">
                <ReactSearchAutocomplete
                  items={market}
                  showIcon={false}
                  fuseOptions={{ keys: ["base", "quote"] }}
                  placeholder={t("forms.common.search")}
                  onSelect={handleOnSelect}
                  formatResult={formatResult}
                />
              </div>
            </div>

            {!mini && (
              <div className="market-trade">
                <div className="container-fluid" style={{paddingLeft:'15px',paddingRight:'15px'}}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="market-tab">
                        <ul
                          id="myTab1"
                          role="tablist"
                          className="nav nav-tabs nav-pills "
                        >
                          {["USDT", "BTC", "FIAT"].map((el, key) => (
                            <li className="nav-item" key={key}>
                              <a
                                id="description-tab"
                                data-toggle="tab"
                                href="#description"
                                role="tab"
                                aria-controls="description"
                                aria-selected="false"
                                className={
                                  " nav-link" +
                                  (el === filter ? " active " : "")
                                }
                                onClick={() => {
                                  setFilter(el);
                                }}
                              >
                                {el}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              {/* <pre>{JSON.stringify(baseFiat, null, 2)}</pre> */}
              <div id="myTab1Content" className="tab-content">
                <div
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                  className="tab-pane fade active show"
                >
                  <div
                    className="start-table scrollbar mb-2"
                    style={{ boxShadow: "none", background: "transparent" }}
                  >
                    <table className="table mb-0">
                      <thead>
                        <tr style={{ borderRadius: "30px" }}>
                          <th scope="col" onClick={() => setSortKey("base")}>
                            {t("tables.coinTracker.pair")}
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("prev_price")}
                          >
                            {t("tables.coinTracker.price")}
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("change_in_price")}
                          >
                            {t("tables.coinTracker.change")}
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("high_24hr")}
                          >
                            {t("tables.coinTracker.24hHigh")}
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("low_24hr")}
                          >
                            {t("tables.coinTracker.24hLow")}
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("base_volume")}
                          >
                            {t("tables.coinTracker.volume")}
                          </th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMarketData &&
                          filteredMarketData?.map((el, key) => (
                            <tr key={key}>
                              <td>
                                <div className="img-text mr-3">
                                  <i className="fa fa-star"></i>
                                  <img
                                    src={`/images/cryptocurrency-icons/color/${el.base.toLowerCase()}.svg`}
                                    alt={el.base.toLowerCase()}
                                  />
                                  <span style={{ fontSize: "17px" }}>
                                    {el.base}/{el.quote}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="balance">
                                  <div className="balance-details">
                                    <div>
                                      {numeral(el.price).format(
                                        "00,00,000.0000"
                                      )}
                                    </div>
                                    {cryptoRates?.length && (
                                      <div className="text-muted">
                                        {numeral(
                                          cryptoRates?.find(
                                            (f) => f?.currency === el.base
                                          )?.rate * baseFiat?.rate
                                        ).format("00,00,000.00")}{" "}
                                        {baseFiat?.currency}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{
                                  color:
                                    el.change_in_price > 0
                                      ? "#06CD9D"
                                      : "#FF5364",
                                }}
                              >
                                {el.change_in_price > 0 && "+"}
                                {numeral(el.change_in_price).format("0.00")}%
                              </td>
                              <td>
                                <div>
                                  {numeral(parseFloat(el.high_24hr)).format(
                                    "00,00,000.00"
                                  )}
                                </div>
                                <div>
                                  {cryptoRates?.length && (
                                    <div className="text-muted">
                                      {numeral(
                                        cryptoRates?.find(
                                          (f) => f?.currency === el.base
                                        )?.rate * baseFiat?.rate
                                      ).format("00,00,000.00")}{" "}
                                      {baseFiat?.currency}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div>
                                  {numeral(parseFloat(el.low_24hr)).format(
                                    "00,00,000.00"
                                  )}
                                </div>
                                <div>
                                  {cryptoRates?.length && (
                                    <div className="text-muted">
                                      {numeral(
                                        cryptoRates?.find(
                                          (f) => f?.currency === el.base
                                        )?.rate * baseFiat?.rate
                                      ).format("00,00,000.00")}{" "}
                                      {baseFiat?.currency}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>
                                {numeral(parseFloat(el.base_volume)).format(
                                  "00,00,00,000.00"
                                )}{" "}
                                {filter}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="delete w-100"
                                  onClick={() => {
                                    dispatch(setExchangeTrading(el));
                                    const pair = `${el.base}-${el.quote}`;
                                    navigate(`/trade/${pair}`, {
                                      replace: true,
                                    });
                                  }}
                                >
                                  Trade
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {!mini && (
              <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                <div className="load-more">
                  <button
                    type="button"
                    className="load"
                    onClick={() => {
                      setLoadMore(!loadMore);
                    }}
                  >
                    Load {loadMore ? "Less" : "More"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
