import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import OpenOrderTable from "../../component/orders/OpenOrderTable";
import ExportDataFiles from "../../component/utils/ExportDataFiles";
import { selectOpenOrders } from "../../store/orderSlice";
import { setToken } from "../../utils/api";
import { socket } from "../../WebSocketConnection";

function OpenOrder() {
  const { t } = useTranslation();
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

  const handleOnSearch = (string, results) => {
    if (string !== "") {
      setRenderedOrders([...results]);
    }
  };

  const formatResult = (item) => {
    return (
      <div className="py-2 cursor-pointer">
        <div className="pr-4 pe-4 d-flex justify-content-between">
          <div className="img-text">
            <img
              style={{ width: "1rem", height: "1rem" }}
              className="mr-2 me-2"
              src={`/images/cryptocurrency-icons/color/${item.base.toLowerCase()}.svg`}
              alt={item.base.toLowerCase()}
            />
            <span className="fw-bold">
              {item.base}/{item.quote}
            </span>
          </div>

          <div
            className="text-wrap"
            style={{
              color: item.side === "BUY" ? "#06CD9D" : "#FF5364",
            }}
          >
            {item.side}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("orders.openOrders.link")}</h3>
              <div className="right-searchbar">
                {/* <button type="button" className="cancel-btn">
                  Cancle all
                </button> */}

                {!!openOrders?.length && (
                  <ExportDataFiles data={openOrders} fileName="OpenOrders" />
                )}

                <ReactSearchAutocomplete
                  items={openOrders}
                  fuseOptions={{ keys: ["base", "quote"] }}
                  onSearch={handleOnSearch}
                  formatResult={formatResult}
                  placeholder="Search "
                />
              </div>
            </div>
            {/* <pre>{JSON.stringify({ openOrders }, null, 2)}</pre> */}
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              {/* <OpenOrderTable openOrders={openOrders} /> */}
              <OpenOrderTable openOrders={renderedOrders} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OpenOrder;
