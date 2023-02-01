import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";

export default function ReferralJoinTable() {
  const { t } = useTranslation();

  const [load, setLoad] = useState(null);
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    getJoinedAffiliates();
  }, []);

  async function getJoinedAffiliates() {
    setLoad(0);
    try {
      const res = await authenticatedInstance({
        url: apis.My_Affiliate,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setJoined(res.data?.data);
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
              <h3>{t("account.affiliates.usersReferred")}</h3>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th>{t("tables.referrals.joinedOn")}</th>
                      <th>{t("tables.referrals.userId")}</th>
                      <th>{t("tables.referrals.email")}</th>
                    </tr>
                  </thead>

                  {(load === null || load === -1) && (
                    <tbody>
                      <tr>
                        <td className="col-9">
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
                        <td className="col-9">
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
                  <tbody>
                    {joined.length ? (
                      <>
                        {joined.map((item) => (
                          <tr>
                            <td>
                              {moment(item?.doj).format("DD-MM-YYYY HH:mm:ss")}
                            </td>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <td className="col-3">
                        <div className="no-record">
                          <img src="/images/no-record.png"></img>
                          <p>No records found</p>
                        </div>
                      </td>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
