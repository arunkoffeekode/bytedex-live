import React from "react";
import { useTranslation } from "react-i18next";
import { txns } from "./TokenLauncher";

export default function ReceivedAmount({
  pair,
  base,
  quote,
  transaction,
  setTransaction,
}) {
  const { t } = useTranslation();

  return (
    <div className="form-group col-md-12">
      <label for="inputName">
        <p className="mb-2 fw-bold">{t("instaTrade.receive")}</p>
      </label>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          style={{ opacity: "60%" }}
          placeholder="0.0000"
          disabled
          value={transaction.buyAmount}
          // onChange={(e) => {
          //   setTransaction({ ...transaction, buyAmount: e.target.value });
          // }}
        />
        <div className="dropdown input-group-text" id="basic-addon2">
          <button
            className="disabled"
            disabled
            type="button"
            id="dropdownMenuButton"
            // data-toggle="dropdown"
          >
            <img
              src={`/images/cryptocurrency-icons/color/${transaction.buyCurrency}.svg`}
              alt=""
            />
            {transaction.buyCurrency}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button
              className="dropdown-item"
              onClick={() => {
                // setTransaction({
                //   ...transaction,
                //   type: txns.buy,
                //   sellCurrency: base.currency,
                //   buyCurrency: quote.currency,
                // });
              }}
            >
              <img
                src={`/images/cryptocurrency-icons/color/${base.currency}.svg`}
                alt=""
              />
              {base.currency}
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                // setTransaction({
                //   ...transaction,
                //   type: txns.sell,
                //   buyCurrency: quote.currency,
                //   sellCurrency: base.currency,
                // });
              }}
            >
              <img
                src={`/images/cryptocurrency-icons/color/${quote.currency}.svg`}
                alt=""
              />
              {quote.currency}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
