import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectOpenOrders } from "../../store/orderSlice";
import { setToken } from "../../utils/api";
import { socket } from "../../WebSocketConnection";
import OpenOrderTable from "../orders/OpenOrderTable";
import PortfolioTable from "../orders/PortfolioTable";
import TradeHistoryTable from "../orders/TradeHistoryTable";

function TradeTable() {
  const { t } = useTranslation();

  const tabs = [
    { key: "OPEN", label: t("exchange.openOrders") },
    { key: "HISTORY", label: t("exchange.orderHistory") },
    { key: "PORTFOLIO", label: t("exchange.portfolio") },
  ];

  const [tab, setTab] = useState(tabs[0].key);
  const openOrders = useSelector(selectOpenOrders);
  const [renderedOrders, setRenderedOrders] = useState([]);

  useEffect(() => {
    const token = setToken();
    socket.login(token);
    socket.subscribe("PO.ALL");
  }, []);

  useEffect(() => {
    if (openOrders?.length) {
      setRenderedOrders(openOrders);
    }
  }, [openOrders]);

  return (
    <div>
      <section className="security pt-0 table-bx">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="market-trade">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="market-tab">
                      <ul
                        id="myTab1"
                        role="tablist"
                        className="nav nav-tabs nav-pills "
                      >
                        {tabs.map((t, key) => (
                          <li className="nav-item" key={key}>
                            <button
                              className={
                                "nav-link show" +
                                (tab === t.key && " active ")
                              }
                             
                              onClick={() => {
                                setTab(t.key);
                              }}
                            >
                              {t.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              {tab === tabs[0].key && (
                <OpenOrderTable openOrders={renderedOrders} />
              )}
              {tab === tabs[1].key && <TradeHistoryTable />}
              {tab === tabs[2].key && <PortfolioTable />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TradeTable;
