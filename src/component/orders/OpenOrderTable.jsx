import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import { selectOpenOrders } from "../../store/orderSlice";
import { authenticatedInstance, setToken } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import { socket } from "../../WebSocketConnection";

export default function OpenOrderTable({ openOrders }) {
  const { t } = useTranslation();

  async function cancelOrder(order) {
    try {
      const data = {
        // ...order,
        side: order.side,
        orderId: order.order_id,
        pair: `${order.base}_${order.quote}`,
      };
      const res = await authenticatedInstance({
        url: apis.cancelOrders,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        successToast(t(`messages.${res?.data?.message}`));

        socket.subscribe("PO.ALL");
      } else if (res.data?.status === "Error") {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      // toast.error("Something went wrong.", {
      //   position: "top-right",
      //   autoClose: 1500,
      // });
    }
  }

  return (
    <div className="start-table mb-2">
      <ToastContainer />
      <table className="table">
        <thead>
          <tr style={{ borderRadius: "30px" }}>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.date")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.pair")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.type")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.side")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.price")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.stopprice")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.pending")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.volume")}</th>
            <th scope="col" className="brdt">{t("tables.openOrdersTable.action")}</th>
          </tr>
        </thead>
        <tbody>
          {openOrders?.length ? (
            <>
              {openOrders.map((o, key) => (
                <tr key={key}>
                  <td>{new Date(o.timestamp).toLocaleDateString()}</td>
                  <td className="text-wrap">
                    {o.base}/{o.quote}
                  </td>
                  <td className="text-wrap">{o.type}</td>
                  <td
                    className="text-wrap"
                    style={{
                      color: o.side === "BUY" ? "#06CD9D" : "#FF5364",
                    }}
                  >
                    {o.side}
                  </td>
                  <td className="text-wrap">{o.rate}</td>
                  <td className="text-wrap">{o.stop_price}</td>
                  <td className="text-wrap">{o.pending}</td>
                  <td className="text-wrap">{o.volume}</td>
                  <td>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        cancelOrder(o);
                      }}
                    >
                      Cancel
                    </button>
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
      </table>
    </div>
  );
}
