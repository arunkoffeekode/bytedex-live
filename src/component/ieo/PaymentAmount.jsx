import numeral from "numeral";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCryptoRates, selectFiatRates } from "../../store/currencySlice";
import { txns } from "./TokenLauncher";

export default function PaymentAmount({
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
        <p className="mb-2 fw-bold">{t("instaTrade.payment")}</p>
      </label>
      <p>
        {t("instaTrade.spendBetween", {
          min: numeral(10 / transaction.price).format("0.0000"), // TODO: THis can be set from currency minimum values
          max: numeral(
            transaction.type === txns.buy ? quote.balance : base.balance
          ).format("0.0000"),
          currency:
            transaction.type === txns.buy ? quote.currency : base.currency,
        })}
      </p>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          placeholder="0.0000"
          aria-describedby="basic-addon2"
          value={transaction.sellAmount}
          onChange={(e) => {
            setTransaction({
              ...transaction,
              sellAmount: parseFloat(e.target.value),
              buyAmount:
                transaction.type === txns.buy
                  ? parseFloat(e.target.value * transaction.price)
                  : parseFloat(e.target.value / transaction.price),
            });
          }}
        />
        <div className="dropdown input-group-text" id="basic-addon2">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
          >
            <img
              src={`/images/cryptocurrency-icons/color/${transaction.sellCurrency}.svg`}
              alt=""
            />
            {transaction.sellCurrency}
          </button>
          <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
            <button
              type="button"
              className="dropdown-item text-start my-1"
              onClick={() => {
                setTransaction({
                  ...transaction,
                  type: txns.sell,
                  buyAmount: parseFloat(
                    transaction.sellAmount / transaction.price
                  ),
                  sellCurrency: base.currency,
                  buyCurrency: quote.currency,
                });
              }}
            >
              <img
                src={`/images/cryptocurrency-icons/color/${base.currency}.svg`}
                alt=""
              />
              {base.currency}
            </button>
            <button
              type="button"
              className="dropdown-item text-start my-1"
              onClick={() => {
                setTransaction({
                  ...transaction,
                  type: txns.buy,
                  buyAmount: parseFloat(
                    transaction.sellAmount * transaction.price
                  ),
                  sellCurrency: quote.currency,
                  buyCurrency: base.currency,
                });
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
