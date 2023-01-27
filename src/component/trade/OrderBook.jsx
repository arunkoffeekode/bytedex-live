import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrderBook } from "../../store/dataStoreSlice";
import {
  selectTradingPair,
  selectTradingPairStats,
} from "../../store/exchangeSlice";
import { socket } from "../../WebSocketConnection";
import ReactTooltip from "react-tooltip";
import numeral from "numeral";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function OrderBook({ state, setState }) {
  const { t } = useTranslation();
  const tradingPair = useSelector(selectTradingPair);
  const { lastPrice, priceChange24h } = useSelector(selectTradingPairStats);
  const orderBook = useSelector(selectOrderBook);

  const [hoveredOrder, setHoveredOrder] = useState({
    show: false,
    type: null,
    key: null,
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [average, setAverage] = useState({});

  useEffect(() => {
    let price = 0,
      baseTotal = 0,
      quoteTotal = 0;

    for (let i = 0; i < selectedRows.length; i++) {
      price += selectedRows[i][0];
      baseTotal += selectedRows[i][1];
      quoteTotal += selectedRows[i][0] * selectedRows[i][1];
    }

    setAverage({
      price: price / selectedRows.length,
      baseTotal: baseTotal,
      quoteTotal: quoteTotal,
    });
  }, [selectedRows]);

  useEffect(() => {
    const { baseCurrency, quoteCurrency } = tradingPair;
    socket.unsubscribe("OB.ALL");
    socket.subscribe("OB", [`${baseCurrency}_${quoteCurrency}`]);
  }, [tradingPair]);

  const averageOfTotal = useMemo(() => {
    if (orderBook) {
      const { bids, asks } = orderBook;
      let bidsTotal = 0,
        asksTotal = 0;
      for (let b = 0; b < bids.length; b++) {
        bidsTotal += bids[b][0] * bids[b][1];
      }
      for (let a = 0; a < asks.length; a++) {
        asksTotal += asks[a][0] * asks[0][1];
      }
      return numeral(bidsTotal - asksTotal).format("00.00");
    }
  }, [orderBook]);

  return (
    <div>
      <div className="coin-left-section">
        <div className="start">
          <ul>
            <li>
              <div className="usdt-txt">{t("exchange.orderBook")}</div>
            </li>
          </ul>

          {/* <ul>
            <li className="active">
              <img src="/images/price-icon.png"></img>
            </li>
            <li>
              <img src="/images/price-icon1.png"></img>
            </li>
            <li>
              <img src="/images/price-icon2.png"></img>
            </li>
            <li className="flt">
              <select>
                <option value="0">0.1</option>
                <option value="1">0.1</option>
                <option value="2">0.12</option>
              </select>
            </li>
          </ul> */}

          {/* <pre>{JSON.stringify(orderBook, null, 2)}</pre> */}

          <div className="start-table scrollbar" style={{ maxHeight: "200px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <div>{t("exchange.price")}</div>
                    <div>({tradingPair?.quoteCurrency})</div>
                  </th>
                  <th scope="col">
                    <div className="text-center">{t("exchange.size")}</div>
                    <div className="text-center">
                      ({tradingPair?.baseCurrency})
                    </div>
                  </th>
                  <th scope="col">
                    <div className="text-center">{t("exchange.total")}</div>
                    <div className="text-center"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderBook?.bids?.map((o, key) => (
                  <tr
                    className="cursor-default"
                    data-tip
                    data-for="global"
                    key={key}
                    onMouseOver={() => {
                      setHoveredOrder({
                        ...hoveredOrder,
                        show: true,
                        type: "bids",
                        key,
                      });
                      const _selc = orderBook?.bids?.slice(key);
                      setSelectedRows(_selc);
                    }}
                    onMouseOut={() => {
                      setHoveredOrder({
                        ...hoveredOrder,
                        show: false,
                        type: null,
                        key: null,
                      });
                    }}
                    onClick={() => {
                      setState({
                        ...state,
                        buyValue: o[0],
                        buyLimit: o[0],
                        buyAmount: state.buyBalance / o[0],
                        buyVolume:
                          Math.round(
                            (state.buyBalance * 100) / state.buyBalance
                          ) || 0,

                        sellValue: o[0],
                        sellLimit: o[0],
                        sellAmount: state.sellBalance,
                        sellVolume: Math.round(
                          (state.sellBalance * o[0] * 100) / state.buyBalance
                        ),
                      });
                    }}
                  >
                    <td>
                      <div
                        className="cursor-pointer"
                        style={{ color: "#06CD9D" }}
                      >
                        {o[0]}
                      </div>
                    </td>

                    <td className="cursor-pointer">{o[1]}</td>
                    <td className="cursor-pointer">
                      {numeral(o[0] * o[1]).format("0.0000")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="start-table"
           style={{overflow:'hidden'}}
          >
            <table className="table">
              <tbody>
                <tr className="drag cursor-default">
                  <td>
                    <div className="total cursor-pointer">{lastPrice}</div>
                  </td>
                  <td className="cursor-pointer">
                    {priceChange24h >= 0 ? (
                      <i
                        className="fa fa-arrow-up"
                        style={{ color: "#06CD9D" }}
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        className="fa fa-arrow-down red"
                        style={{ color: "#FF5364" }}
                        aria-hidden="true"
                      ></i>
                    )}
                  </td>
                  <td>
                    <div className="subtotal cursor-pointer">
                      {averageOfTotal}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="start-table scrollbar" style={{ maxHeight: "200px" }}>
            <table className="table">
              <tbody>
                {orderBook?.asks?.map((o, key) => (
                  <tr
                    className="cursor-default"
                    data-tip
                    data-for="global"
                    key={key}
                    onMouseOver={() => {
                      setHoveredOrder({
                        ...hoveredOrder,
                        show: true,
                        type: "asks",
                        key,
                      });

                      const _selc = orderBook?.bids?.slice(0, key + 1);
                      setSelectedRows(_selc);
                    }}
                    onMouseOut={() => {
                      setHoveredOrder({
                        ...hoveredOrder,
                        show: false,
                        type: null,
                        key: null,
                      });
                    }}
                    onClick={() => {
                      setState({
                        ...state,
                        buyValue: o[0],
                        buyLimit: o[0],
                        buyAmount: state.buyBalance / o[0],
                        buyVolume:
                          Math.round(
                            (state.buyBalance * 100) / state.buyBalance
                          ) || 0,

                        sellValue: o[0],
                        sellLimit: o[0],
                        sellAmount: state.sellBalance,
                        sellVolume: Math.round(
                          (state.sellBalance * o[0] * 100) / state.buyBalance
                        ),
                      });
                    }}
                  >
                    <td>
                      <div
                        className="cursor-pointer"
                        style={{ color: "#FF5364" }}
                      >
                        {o[0]}
                      </div>
                    </td>
                    <td className="cursor-pointer">{o[1]}</td>
                    <td className="cursor-pointer">
                      {numeral(o[0] * o[1]).format("0.0000")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <pre>
        {JSON.stringify(
          orderBook[hoveredOrder.type][hoveredOrder.key],
          null,
          2
        )}
      </pre> */}

      {hoveredOrder.show && (
        <ReactTooltip
          id="global"
          aria-haspopup="true"
          place="left"
          effect="solid"
        >
          <div className="row">
            <div className="col text-nowrap">Avg. Price: </div>
            <div className="col text-nowrap">
              {/* {orderBook[hoveredOrder?.type][hoveredOrder?.key][0]} */}
              {numeral(average?.price).format("0.0000")}
            </div>
          </div>
          <div className="row">
            <div className="col text-nowrap">
              Total {tradingPair?.baseCurrency}{" "}
            </div>
            <div className="col text-nowrap">
              {/* {orderBook[hoveredOrder?.type][hoveredOrder?.key][1]} */}
              {numeral(average?.baseTotal).format("0.0000")}
            </div>
          </div>
          <div className="row">
            <div className="col text-nowrap">
              Total {tradingPair?.quoteCurrency}{" "}
            </div>
            <div className="col text-nowrap">
              {/* {orderBook[hoveredOrder?.type][hoveredOrder?.key][1]} */}
              {numeral(average?.quoteTotal).format("0.0000")}
            </div>
          </div>
        </ReactTooltip>
      )}
    </div>
  );
}
