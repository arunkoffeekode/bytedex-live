import moment from "moment";
import numeral from "numeral";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";

export default function ReferralCommisionTable() {
  const { t } = useTranslation();

  const [load, setLoad] = useState(null);
  const [commission, setCommission] = useState([]);

  useEffect(() => {
    getReferredCommissionAffiliates();
  }, []);

  async function getReferredCommissionAffiliates() {
    setLoad(0);
    try {
      const res = await authenticatedInstance({
        url: apis.Affiliate_Commission,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setCommission(res.data?.data);
        setLoad(1);
      } else {
        setLoad(-1);
      }
    } catch (error) {
      console.log(error);
      setLoad(-1);
    }
  }

  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("account.affiliates.commission")}</h3>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table mb-0">
                <table className="table">
                  <thead>
                    <th>{t("tables.commission.credit")}</th>
                    <th>{t("tables.commission.dot")}</th>
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
                    <tbody>
                      {commission.length ? (
                        <>
                          {commission.map((item) => (
                            <tr>
                              <td>
                                {(item?.amount).toFixed(8)}{" "}
                                {item?.fromCID_Paid_Curr}
                              </td>
                              <td>
                                {moment(item?.dateofTransaction).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )}
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <td colSpan={2}>
                          <div className="no-record">
                            <img src="/images/no-record.png"></img>
                            <p>No records found</p>
                          </div>
                        </td>
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
