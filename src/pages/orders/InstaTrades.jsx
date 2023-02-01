import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import ExportDataFiles from "../../component/utils/ExportDataFiles";
import { setOpenOrders } from "../../store/orderSlice";
import { authenticatedInstance } from "../../utils/api";

function InstaTrades() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(null);
  const [instaTrades, setInstaTrades] = useState([]);

  useEffect(() => {
    (async () => {
      setLoad(0);
      try {
        const res = await authenticatedInstance({
          url: apis.getInstaTrades,
          method: "POST",
        });
        // console.log(res.data);

        if (res.data?.status === "Success") {
          setInstaTrades(res.data.data);
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
              <h3>{t("instaTrade.title")}</h3>
              <div className="right-searchbar">
                {!!instaTrades?.length && (
                  <ExportDataFiles
                    data={instaTrades}
                    fileName="InstantTrades"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("tables.instaTradeHistory.date")}</th>
                      <th scope="col">
                        {t("tables.instaTradeHistory.purchased")}
                      </th>
                      <th scope="col">
                        {t("tables.instaTradeHistory.paymentAmount")}
                      </th>
                      <th scope="col">{t("tables.instaTradeHistory.rate")}</th>
                      <th scope="col">
                        {t("tables.instaTradeHistory.status")}
                      </th>
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
                      {instaTrades?.length ? (
                        <>
                          {instaTrades?.map((it, key) => (
                            <tr key={key}>
                              <td className="text-wrap">
                                {new Date(it.requestedOn).toLocaleDateString()}{" "}
                                {new Date(it.requestedOn).toLocaleTimeString()}
                              </td>
                              <td className="text-wrap">
                                {it.quoteAmount} {it.quoteCurrency}
                              </td>
                              <td className="text-wrap">
                                {it.baseAmount} {it.baseCurrency}
                              </td>
                              <td className="text-wrap">
                                {it.commission} {it.baseCurrency}
                              </td>
                              <td className="text-wrap">
                                <OrderStatus status={it.status} />
                              </td>
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

export default InstaTrades;

function OrderStatus({ status }) {
  return (
    <>
      {
        {
          false: <div className="text-warning">Pending</div>,
          true: <div className="text-success">Completed</div>,
          // Cancelled: <div className="text-danger">Cancelled</div>,
        }[status]
      }
    </>
  );
}
