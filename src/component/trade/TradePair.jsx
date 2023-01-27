import numeral from "numeral";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMarket } from "../../store/dataStoreSlice";
import {
  selectTradingPairStats,
  setExchangeTrading,
} from "../../store/exchangeSlice";

export default function TradePair() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const market = useSelector(selectMarket);
  const tradingPairStats = useSelector(selectTradingPairStats);

  return (
    <div className="coin-info">
      <div className="container-fluid" style={{maxWidth:'100%'}}>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-12 col-xl-2">
            <div className="drp">
              <div className="dropdown">
                <button
                  className="btn-drp dropdown-toggle"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>
                    {tradingPairStats.baseCurrency}/
                    {tradingPairStats.quoteCurrency}
                  </span>

                  <img src="/images/start.png" style={{ width: "25px" }} />
                </button>
                <div
                  className="dropdown-menu overflow-auto"
                  style={{ height: "360px", width: "240px" }}
                  aria-labelledby="dropdownMenuLink"
                >
                  {!!market?.length &&
                    market?.map((m, key) => (
                      <button
                        key={key}
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(setExchangeTrading(m));
                          const pair = `${m.base}-${m.quote}`;
                          navigate(`/trade/${pair}`, {
                            replace: true,
                          });
                        }}
                      >
                        <img
                          src={`/images/cryptocurrency-icons/color/${m.base.toLowerCase()}.svg`}
                          alt={m.base.toLowerCase()}
                        />
                        <span style={{ fontSize: "17px" }}>
                          {m.base}/{m.quote}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-12 col-xl-6">
            <div className="all-coin-details">
              <ul>
                <li>
                  <div className="coin-price">
                    <div className="price-title">
                      {t("navbar.analyticsContainer.lastPrice")}
                    </div>
                    <div className="total-price">
                      {tradingPairStats.lastPrice}{" "}
                      {tradingPairStats.quoteCurrency}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="coin-price">
                    <div className="price-title">
                      {t("navbar.analyticsContainer.change")}
                    </div>
                    <div
                      className="total-price"
                      style={{
                        color:
                          tradingPairStats?.priceChange24h >= 0
                            ? "#06CD9D"
                            : "#FF5364",
                      }}
                    >
                      {numeral(tradingPairStats.priceChange24h).format("0.00")}%
                    </div>
                  </div>
                </li>
                <li>
                  <div className="coin-price">
                    <div className="price-title">
                      {t("navbar.analyticsContainer.priceHigh24h")}
                    </div>
                    <div className="total-price">
                      {numeral(tradingPairStats.priceHigh24h).format("0.00")}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="coin-price">
                    <div className="price-title">
                      {" "}
                      {t("navbar.analyticsContainer.priceLow24h")}
                    </div>
                    <div className="total-price">
                      {numeral(tradingPairStats.priceLow24h).format("0.00")}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="coin-price">
                    <div className="price-title">
                      {t("navbar.analyticsContainer.volume")}
                    </div>
                    <div className="total-price">
                      {numeral(tradingPairStats.volumeBaseCurrency24h).format(
                        "0.00"
                      )}{" "}
                      {tradingPairStats.quoteCurrency}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xl-4">
            <div className="anounance">
              <marquee><span>Wallet Maintenance for Tron Network (TRX) - 2023-01-30</span>
              </marquee>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
