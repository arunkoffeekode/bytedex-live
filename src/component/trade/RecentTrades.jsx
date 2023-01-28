import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectMarketTrade } from "../../store/dataStoreSlice";
import { selectTradingPair } from "../../store/exchangeSlice";
import { socket } from "../../WebSocketConnection";

export default function RecentTrades() {
  const { t } = useTranslation();
  const tradingPair = useSelector(selectTradingPair);
  const marketTrade = useSelector(selectMarketTrade);

  useEffect(() => {
    const { baseCurrency, quoteCurrency } = tradingPair;
    socket.unsubscribe("RT.ALL");
    socket.subscribe("RT", [`${baseCurrency}_${quoteCurrency}`]);
  }, [tradingPair]);

  return (
    <div>
      <div className="coin-left-section">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            <div className="start">
              <ul>
                <li>
                  <div className="usdt-txt">{t("exchange.tradeHistory")}</div>
                </li>
              </ul>
              <div
                className="start-table scrollbar mt-0"
                style={{ maxHeight: "440px" }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{t("exchange.price")}</div>
                        <div>({tradingPair.quoteCurrency})</div>
                      </th>
                      <th scope="col">
                        <div className="text-center">{t("exchange.size")}</div>
                        <div className="text-center">
                          ({tradingPair.baseCurrency})
                        </div>
                      </th>
                      <th scope="col">
                        <div className="text-center">{t("exchange.time")}</div>
                      </th>
                    </tr>
                  </thead>
                  {/* <pre>{JSON.stringify(marketTrade, null, 2)}</pre> */}
                  <tbody>
                    {marketTrade?.map((m, key) => (
                      <tr key={key}>
                        <td>
                          {" "}
                          <div
                            className={
                              m.execution_side === "SELL"
                                ? "total-red"
                                : "change"
                            }
                          >
                            {m.rate}
                          </div>
                        </td>
                        <td>{m.volume}</td>
                        <td>{new Date(m.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
