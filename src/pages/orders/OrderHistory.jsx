import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import ExportDataFiles from "../../component/utils/ExportDataFiles";
import { authenticatedInstance } from "../../utils/api";

function OrderHistory() {
  const { t } = useTranslation();

  const [load, setLoad] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      setLoad(0);
      try {
        const res = await authenticatedInstance({
          url: apis.getOrders,
          method: "GET",
        });
        // console.log(res.data);

        if (res.data?.status === "Success") {
          setOrders(res.data.data.rows);
          setLoad(1);
        } else if (res.data?.status === "Error") {
          setLoad(-1);
        }
      } catch (error) {
        console.log(error);
        setLoad(-1);
      }
    })();
  }, []);

  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("orders.orderHistory.link")}</h3>
              <div className="right-searchbar">
                {!!orders?.length && (
                  <ExportDataFiles data={orders} fileName="OrderHistory" />
                )}
                {/* <div className="slt">
                  <form>
                    <select>
                      <option value="0" selected="">
                        All
                      </option>
                      <option value="1">All</option>
                      <option value="2">All</option>
                    </select>
                  </form>
                  <form>
                    <select>
                      <option value="0" selected="">
                        10
                      </option>
                      <option value="1">20</option>
                      <option value="2">30</option>
                    </select>
                  </form>
                  <button type="button" className="external-link">
                    <i className="fa fa-external-link" aria-hidden="true"></i>
                  </button>
                </div> */}
              </div>
            </div>
            {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("tables.tradeHistory.date")}</th>
                      <th scope="col">{t("tables.tradeHistory.pair")}</th>
                      <th scope="col">{t("tables.tradeHistory.type")}</th>
                      <th scope="col">{t("tables.tradeHistory.side")}</th>
                      <th scope="col">{t("tables.tradeHistory.price")}</th>
                      <th scope="col">{t("tables.tradeHistory.size")}</th>
                      <th scope="col">{t("tables.tradeHistory.value")}</th>
                      <th scope="col">{t("tables.tradeHistory.fee")}</th>
                      <th scope="col">{t("tables.tradeHistory.status")}</th>
                    </tr>
                  </thead>

                  {load === null && (
                    <tbody>
                      <tr>
                        <td colSpan={9}>
                          <div className="no-record">
                            <img
                              src="/images/no-record.png"
                              alt="No Records Found"
                            ></img>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {load === 0 && (
                    <tbody>
                      <tr>
                        <td colSpan={9}>
                          <div className="no-record">
                            <div
                              class="spinner-border text-primary"
                              role="status"
                            >
                              <span class="visually-hidden"></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {load === -1 && (
                    <tbody>
                      <tr>
                        <td colSpan={9}>
                          <div className="no-record">
                            <img
                              src="/images/no-record.png"
                              alt="No Records Found"
                            ></img>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {load === 1 && (
                    <tbody>
                      {orders?.length ? (
                        <>
                          {orders?.map((o, key) => (
                            <tr key={key}>
                              <td>{new Date(o.date).toLocaleDateString()}</td>
                              <td className="text-wrap">{o.currencyPair}</td>
                              <td
                                className="text-wrap"
                                style={{
                                  maxWidth: "100px",
                                }}
                              >
                                <OrderType type={o.tradeType} />
                              </td>
                              <td
                                style={{
                                  color:
                                    o.side === "BUY" ? "#06CD9D" : "#FF5364",
                                }}
                              >
                                {o.side}
                              </td>
                              <td className="text-wrap">{o.tradePrice}</td>
                              <td className="text-wrap">
                                {getAmountValue(o.filled)} /
                                {getAmountValue(o.size)}{" "}
                                {o.currencyPair.split("-")[0]}
                              </td>
                              <td className="text-wrap">
                                {getAmountValue(o.totalExecutedValue)}{" "}
                                {o.currencyPair.split("-")[1]}
                              </td>
                              <td className="text-wrap">{o.feePaid}</td>
                              <td className="text-wrap">
                                <OrderStatus status={o.orderStatus} />
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={9}>
                            <div className="no-record">
                              <img
                                src="/images/no-record.png"
                                alt="No Records Found"
                              ></img>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderHistory;

function OrderType({ type }) {
  return (
    <>
      {
        {
          LIMIT: "Limit",
          MARKET: "Market",
          STOPMARKET: "Stop Market",
          STOPLIMIT: "Stop Limit",
          TRAILINGSTOPMARKET: "Trailing Stop Market",
        }[type]
      }
    </>
  );
}

function getAmountValue(value) {
  const [amt, cur] = value.split(" ");

  return parseFloat(amt);
}

function OrderStatus({ status }) {
  return (
    <>
      {
        {
          Pending: <div className="text-warning">Pending</div>,
          Filled: <div className="text-success">Filled</div>,
          Cancelled: <div className="text-danger">Cancelled</div>,
        }[status]
      }
    </>
  );
}
