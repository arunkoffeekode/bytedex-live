import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import ExportDataFiles from "../../component/utils/ExportDataFiles";
import { authenticatedInstance } from "../../utils/api";

function TradeHistory() {
  const { t } = useTranslation();

  const [load, setLoad] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      setLoad(0);
      try {
        const res = await authenticatedInstance({
          url: apis.tradeHistory,
          method: "GET",
        });
        // console.log(res.data);

        if (res.data?.status === "Success") {
          setHistory(res.data.data.rows);
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
              <h3>{t("orders.tradeHistory.link")}</h3>
              <div className="right-searchbar wt">
                {!!history?.length && (
                  <ExportDataFiles data={history} fileName="TradeHistory" />
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
            {/* <pre>{JSON.stringify(history, null, 2)}</pre> */}
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("tables.tradeHistory.date")}</th>
                      <th scope="col">{t("tables.tradeHistory.pair")}</th>
                      <th scope="col">{t("tables.tradeHistory.side")}</th>
                      <th scope="col">{t("tables.tradeHistory.price")}</th>
                      <th scope="col">{t("tables.tradeHistory.size")}</th>
                      <th scope="col">{t("tables.tradeHistory.value")}</th>
                      <th scope="col">{t("tables.tradeHistory.fee")}</th>
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
                             <p>No records found</p>
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
                             <p>No records found</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {load === 1 && (
                    <tbody>
                      {history?.length ? (
                        <>
                          {history?.map((h, key) => (
                            <tr key={key}>
                              <td>{new Date(h.date).toLocaleDateString()}</td>
                              <td className="text-wrap">
                                {h.trade}/{h.market}
                              </td>
                              {/* <td>{h.type}</td> */}
                              <td
                                className="text-wrap"
                                style={{
                                  color:
                                    h.side === "BUY" ? "#06CD9D" : "#FF5364",
                                }}
                              >
                                {h.side}
                              </td>
                              <td className="text-wrap">
                                {h.rate} {h.market}
                              </td>
                              <td className="text-wrap">
                                {h.volume} {h.trade}
                              </td>
                              <td className="text-wrap">
                                {h.amount} {h.market}
                              </td>
                              <td className="text-wrap">
                                {h.serviceCharge} {h.trade}
                              </td>
                              {/* <td>{h.fee}</td> */}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={9}>
                            <div className="no-record">
                              <img src="/images/no-record.png"></img>
                              <p>No records found</p>
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

export default TradeHistory;
