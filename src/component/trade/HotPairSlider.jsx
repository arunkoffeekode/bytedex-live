import numeral from "numeral";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectMarket } from "../../store/dataStoreSlice";
import { sortArrayByKey } from "../../utils/v2/sort";

export default function HotPairSlider() {
  const market = useSelector(selectMarket);
  const [sortedMarketValues, setSortedMarketValues] = useState([]);

  useEffect(() => {
    if (market) {
      const _m = JSON.parse(JSON.stringify(market));
      const _s = sortArrayByKey(_m, "base_volume", true);
      setSortedMarketValues(_s);
    }
  }, [market]);

  return (
    <div>
      <div className="tradehistory">
        <div className="row">
          <div className="latest-news">
            <div className="br-title">
              <i className="fa fa-firefox"></i>HOT PAIRS
            </div>
            <marquee scrollAmount="12">
              <ul>
                {sortedMarketValues?.map((el, key) => (
                  <li key={key}>
                    <span>
                      <div className="token">
                        <div className="left-token">
                          <h6>{el.base}</h6>
                          <img
                            src={
                              el.change_in_price > 0
                                ? "/images/arrow-up.png"
                                : "/images/arrow-down.png"
                            }
                            alt="up-down"
                          ></img>
                          <h6
                            className={
                              el.change_in_price > 0
                                ? "greencolor.png"
                                : "redcolor.png"
                            }
                          >
                            {el.change_in_price > 0 && "+"}{" "}
                            {numeral(el.change_in_price).format("0.00")} %
                          </h6>
                        </div>
                      </div>
                    </span>
                  </li>
                ))}
              </ul>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
