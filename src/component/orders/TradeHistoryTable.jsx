import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";

export default function TradeHistoryTable() {
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
    <div className="start-table mb-2">
      <table className="table">
        <thead>
          <tr style={{ borderRadius: "30px" }}>
            <th scope="col" className="brdt">{t("tables.tradeHistory.date")}</th>
            <th scope="col" className="brdt">{t("tables.tradeHistory.pair")}</th>
            {/* <th scope="col">{t("tables.tradeHistory.type")}</th> */}
            <th scope="col" className="brdt">{t("tables.tradeHistory.side")}</th>
            <th scope="col" className="brdt">{t("tables.tradeHistory.price")}</th>
            <th scope="col" className="brdt">{t("tables.tradeHistory.size")}</th>
            <th scope="col" className="brdt">{t("tables.tradeHistory.value")}</th>
            <th scope="col" className="brdt">{t("tables.tradeHistory.fee")}</th>
          </tr>
        </thead>

        {load === null && (
          <tbody>
            <tr>
              <td colSpan={9}>
                <div className="no-record">
                  <img src="/images/no-record.png" alt="No Records Found"></img>
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
                  <div class="spinner-border text-primary" role="status">
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
                  <img src="/images/no-record.png" alt="No Records Found"></img>
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
                        color: h.side === "BUY" ? "#06CD9D" : "#FF5364",
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
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
}
