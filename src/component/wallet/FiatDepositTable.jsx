import { Pagination } from "@tanstack/react-table";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import ExportDataFiles from "../utils/ExportDataFiles";

export default function FiatDepositTable({ deposits, onCancel, load }) {
  const { t } = useTranslation();

  async function cancelFiatManualDeposit(depositId) {
    try {
      const res = await authenticatedInstance({
        method: "POST",
        url: apis.cancelFiatDeposit,
        data: {
          ID: depositId,
        },
      });

      if (res.data?.status === "Success") {
        successToast(res.data.data);
        onCancel();
      } else {
        errorToast(res.data.data);
      }
    } catch (error) {}
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(deposits, null, 2)}</pre> */}
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
                        {t("tables.depositHistory.requestAmount")}
                      </th>
                      <th scope="col">
                        {t("tables.depositHistory.transactionID")}
                      </th>

                      <th scope="col">{t("tables.depositHistory.status")}</th>
                      <th scope="col">
                        {t("tables.depositHistory.depositType")}
                      </th>
                      <th scope="col">{t("tables.depositHistory.delete")}</th>
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

                  {load === 1 && (
                    <tbody id="alldeposits">
                      {deposits?.length ? (
                        <>
                          {deposits?.map((d, key) => (
                            <tr key={key}>
                              <td>
                                {moment(d.depositReqDate).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </td>
                              <td>{d.requestAmount}</td>
                              <td>{d.transactionID}</td>
                              <td className="text-center">
                                {t(
                                  `tables.depositHistory.${d.status.toLowerCase()}`
                                )}
                              </td>
                              <td className="text-center">{d.type}</td>
                              <td>
                                {d.status === "Pending" && (
                                  <button
                                    type="button"
                                    className="delete"
                                    onClick={() => {
                                      cancelFiatManualDeposit(d.id);
                                    }}
                                  >
                                    {t("tables.depositHistory.delete")}
                                  </button>
                                )}
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
                <div class="pagination-list">
                  {/* <Pagination
                    postsPerPage={DataPerPage}
                    totalPosts={deposits.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
