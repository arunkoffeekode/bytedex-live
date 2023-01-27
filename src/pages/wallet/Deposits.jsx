import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import ExportDataFiles from "../../component/utils/ExportDataFiles";
import FiatDeposit from "../../component/wallet/FiatDeposit";
import Pagination from "../../pagination/Pagination";
import { authenticatedInstance } from "../../utils/api";

function Deposits() {
  const { t } = useTranslation();

  const [load, setLoad] = useState(null);
  const [deposits, setDeposits] = useState([]);

  const [currencies, setCurrencies] = useState([]);

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [currencyName, setCurrencyName] = useState("Select Currency");
  const [QRAddress, setQRAddress] = useState("");

  //pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage] = useState(10);
  // Get current Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = deposits.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    GetDeposits();
    GetCurrencies();
  }, []);

  async function GetDeposits(shortName = "ALL") {
    setLoad(0);
    try {
      const res = await authenticatedInstance({
        url: apis.GetDeposits,
        method: "POST",
        data: { currency: shortName },
      });

      if (res.data?.status === "Success") {
        setDeposits(res.data?.data?.deposits);
        setLoad(1);
      } else setLoad(-1);
    } catch (error) {
      console.log(error);
      setLoad(-1);
    }
  }

  async function GetCurrencies() {
    try {
      const res = await authenticatedInstance({
        url: apis.GetCurrencySettings,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setCurrencies(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function GenerateAddress(shortName, fullName) {
    setCurrencyName(fullName + "  (" + shortName + ")");

    try {
      const res = await authenticatedInstance({
        url: apis.GenerateAddress,
        method: "POST",
        data: { currency: shortName },
      });

      if (res.data?.status === "Success") {
        setQRAddress(res.data?.data?.address);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function copy() {
    const copyText = document.getElementById("copyClipboard");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
  }

  return (
    <div>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            <div className="bank-title">
              <h3>{t("wallet.deposits.link")}</h3>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6">
            <div className="deposit">
              <form>
                <div className="drp">
                  <div className="dropdown">
                    <button
                      className="btn btn-drp dropdown-toggle"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {selectedCurrency && (
                        <img
                          src={`/images/cryptocurrency-icons/color/${selectedCurrency?.shortName?.toLowerCase()}.svg`}
                          style={{ width: "25px" }}
                          alt=""
                        />
                      )}
                      {currencyName}
                    </button>
                    <div className="dropdown-menu scrollable-menu">
                      {currencies.map((item, key) => (
                        <p
                          key={key}
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedCurrency(item);
                            if (item?.walletType !== "Fiat-Manual") {
                              GenerateAddress(item.shortName, item.fullName);
                            }
                          }}
                        >
                          <img
                            src={`/images/cryptocurrency-icons/color/${item.shortName.toLowerCase()}.svg`}
                            alt={`${item.shortName}`}
                          />
                          {item.fullName} ({item.shortName})
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label for="inputName">
                      {t("wallet.deposits.depositAddress")}
                    </label>
                    <div className="clipboard">
                      <input
                        id="copyClipboard"
                        className="copy-input"
                        value={QRAddress}
                        readonly
                        onClick={copy}
                      />
                      <button
                        id="copyButton"
                        type="button"
                        className="copy-btn"
                        onClick={copy}
                      >
                        <i className="fa fa-copy" title="copied"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {selectedCurrency?.walletType !== "Fiat-Manual" && (
            <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6">
              <div className="barcode">
                <QRCode className="mb-4" value={QRAddress} />
                <h6>{currencyName}</h6>
              </div>
            </div>
          )}

          {selectedCurrency?.walletType !== "Fiat-Manual" && (
            <div className="mt-4 col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="deposite-info">
                <ul>
                  <li>
                    {t("wallet.deposits.disclaimerFirst", {
                      currency: currencyName ?? "currency",
                    })}
                  </li>
                  <li>
                    {t("wallet.deposits.disclaimerSecond", {
                      currency: currencyName ?? "currency",
                    })}
                  </li>
                  <li>
                    {t("wallet.deposits.disclaimerThird", {
                      currencyName: currencyName ?? "currency",
                      confirmations: "",
                    })}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCurrency?.walletType !== "Fiat-Manual" && (
        <section className="security">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                <h3>{t("wallet.deposits.link")}</h3>
                <div className="right-searchbar">
                  <ExportDataFiles data={deposits} fileName="Deposits" />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                <div className="start-table overflow-auto">
                  <table className="table">
                    <thead>
                      <tr style={{ borderRadius: "30px" }}>
                        <th scope="col">
                          {t("tables.depositHistory.requestDate")}
                        </th>
                        <th scope="col">
                          {t("tables.depositHistory.approvedDate")}
                        </th>
                        <th scope="col">
                          {t("tables.depositHistory.depositAmount")}
                        </th>
                        <th scope="col">
                          {t("tables.depositHistory.txnHash")}
                        </th>
                        <th scope="col">{t("tables.depositHistory.status")}</th>
                      </tr>
                    </thead>

                    {(load === null || load === -1) && (
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

                    {load === 1 && (
                      <tbody id="alldeposits">
                        {currentData?.length ? (
                          <>
                            {currentData?.map((d, key) => (
                              <tr key={key}>
                                <td>
                                  {moment(d.depositReqDate).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )}
                                </td>
                                <td>
                                  {moment(d.depositConfirmDate).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )}
                                </td>
                                <td>
                                  {d.depositAmount} {d.depositType}
                                </td>
                                <td className="overflow-auto w-25">
                                  {d.txnHash}
                                </td>
                                <td>
                                  <button type="button" className="delete">
                                    {d.txnHash ? "Completed" : "Pending..."}
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
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    )}
                  </table>
                  <div class="pagination-list">
                    <Pagination
                      postsPerPage={DataPerPage}
                      totalPosts={deposits.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedCurrency?.walletType === "Fiat-Manual" && (
        <div className="col-12">
          <FiatDeposit currency={selectedCurrency} />
        </div>
      )}
    </div>
  );
}

export default Deposits;
