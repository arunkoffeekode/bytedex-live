import numeral from "numeral";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { selectMarket } from "../../store/dataStoreSlice";
import { socket } from "../../WebSocketConnection";
import { useCombobox } from "downshift";
import { selectCryptoRates, selectFiatRates } from "../../store/currencySlice";

export default function PairSelection({
  base,
  quote,
  transaction,
  setTransaction,
  onSelect,
}) {
  const { t } = useTranslation();

  const market = useSelector(selectMarket);

  const [items, setItems] = useState([]);
  let {
    isOpen,
    setInputValue,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      // let filter = [];
      // const segments = inputValue.split("/");
      // segments.forEach((term) => {
      //   const results = market.filter(
      //     (el) =>
      //       !term ||
      //       `${el?.["base"]}/${el?.["quote"]}`.toLowerCase().includes(term) ||
      //       el?.["base"].toLowerCase().includes(term) ||
      //       el?.["quote"].toLowerCase().includes(term)
      //   );
      //   filter = [...filter, ...results];
      // });

      const filter = market.filter(
        (el) =>
          !inputValue ||
          `${el?.["base"]}/${el?.["quote"]}`
            .toLowerCase()
            .includes(inputValue.toLowerCase())
      );

      setItems([...filter]);
    },
    items,
    itemToString(item) {
      return item ? item.base + "/" + item.quote : "";
    },
  });

  useEffect(() => {
    socket.subscribe("MK");
  }, []);

  useEffect(() => {
    if (base && quote) {
      const filteredMarket = market?.find(
        (el) => el.base === base.currency && el.quote === quote.currency
      );
      // console.log(base, quote, filteredMarket);
      setTransaction({ ...transaction, price: filteredMarket.price });
    }
  }, [market, base, quote]);

  return (
    <div>
      {market?.length > 0 ? (
        <div>
          <label className="mb-2" {...getLabelProps()}>
            Choose Pair to trade
          </label>
          <div>
            <input
              className="form-control shadow border-0 rounded-pill"
              placeholder={t("forms.common.search")}
              {...getInputProps()}
            />
            {/* <button {...getToggleButtonProps()}>
            {isOpen ? <>Open</> : <>Close</>}
          </button> */}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>
      )}

      <ul className="mt-3" {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <div
                className="py-2 cursor-pointer"
                onClick={() => {
                  onSelect(item);
                  setInputValue("");
                }}
              >
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
                <div className="pr-4 pe-4 d-flex justify-content-between">
                  <div className="balance">
                    <div className="balance-details">
                      <div>{numeral(item.price).format("00,00,000.0000")}</div>
                    </div>
                  </div>
                  <div
                    className="small fw-bold"
                    style={{
                      color: item.change_in_price > 0 ? "#06CD9D" : "#FF5364",
                    }}
                  >
                    {item.change_in_price > 0 && "+"}
                    {numeral(item.change_in_price).format("0.00")}%
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>

      {base && quote && (
        <div className="">
          <div className="usdt-avex-details">
            <span className="fs-3">
              {t("instaTrade.estimate", {
                currency: quote?.currency,
              })}{" "}
              {transaction.price} {} {base?.currency}
            </span>
            <div className="name-used">{t("instaTrade.youHave")}</div>
            <div className="used">
              <span className="p-1">
                {quote?.balance} {quote?.currency}
              </span>
              <span className="p-1"> & </span>
              <span className="p-1">
                {base?.balance} {base?.currency}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
