import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { apis } from "../../apis.constants";
import Pagination from "../../pagination/Pagination";
import {
  selectLoginHistory,
  selectProfile,
  setLoginHistory,
  setUserProfile,
} from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";

function AccountOverview() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tradeVolumeDiscount, setVolumeDiscount] = useState([]);
  const [widrawlLimit, setWidrawlLimit] = useState([]);

  const profile = useSelector(selectProfile);
  const loginHistory = useSelector(selectLoginHistory);

  const [currentPage, setCurrentPage] = useState(1);
  const DataPerPage = 10;

  // Get current Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    widrawlLimitData();
    LoginHistory();
    Get_User_Volume_Discount_LimitsData();
  }, []);

  async function Get_User_Volume_Discount_LimitsData() {
    try {
      const res = await authenticatedInstance({
        url: apis.tradingVolumeDiscount,
        method: "GET",
      });
      if (res.data?.status === "Success") {
        setVolumeDiscount(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function widrawlLimitData() {
    try {
      const res = await authenticatedInstance({
        url: apis.Get_User_Withdrawal_Limits,
        method: "GET",
      });
      if (res.data?.status === "Success") {
        setWidrawlLimit(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function LoginHistory() {
    try {
      const res = await authenticatedInstance({
        url: apis.loginHistory,
        method: "GET",
      });

      // console.log(res);
      // console.log(res.data);

      if (res.data?.status === "Success") {
        dispatch(setLoginHistory(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <section className="account-section pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="account-box">
                <div className="account-left">
                  <div className="client-box">
                    {/* <img src="images/client.png"></img> */}
                  </div>
                  <div className="client-name">
                    <div className="d-block mb-3">
                      <h3>
                        {profile?.firstName} {profile?.middleName}{" "}
                        {profile?.lastName}
                      </h3>
                      <p className="text-lowercase">
                        <small>{profile?.email}</small>|
                        <span>
                          {t("account.overview.customerId")}
                          {profile?.customerID}
                        </span>
                      </p>
                    </div>
                    <div className="join-date">
                      {t("account.overview.joinedOn")}
                      <span>{profile?.joinedOn.slice(0, 10)}</span>{" "}
                    </div>
                    <div className="join-date">
                      {t("account.overview.loginHistory")}{" "}
                      <span> Device / WEB </span> | Date & Time:{" "}
                      <span>
                        {new Date(loginHistory?.at(-1).startedOn).toUTCString()}
                      </span>{" "}
                      | IP: <span>{loginHistory?.at(-1).ip}</span>
                    </div>
                  </div>
                </div>
                {!profile?.kycStatus === "Approved" ? (
                  <div className="account-right mt-2">
                    <button type="button" className="account-verify">
                      <img src="images/level.png"></img>
                      {t("account.accountVerification.statusApproved")}
                    </button>
                  </div>
                ) : (
                  <div className="account-right mt-2">
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill py-2 px-4"
                    >
                      {t("account.accountVerification.statusPending")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="withdraw-discount">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 colxl-6">
              <div className="withdraw-discount-white-box">
                <div className="box-title">Withdrawal Limit Status:</div>
                <div className="disc-total">
                  {widrawlLimit[0]?.withdrawn}/{widrawlLimit[0]?.limit}{" "}
                  {widrawlLimit[0]?.currency}
                </div>
                {/* <pre>{JSON.stringify(widrawlLimit?.map((item)=>item),null,12)}</pre> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 colxl-6">
              <div className="withdraw-discount-white-box">
                <div className="box-title">Trading Volume Discount</div>
                <div className="disc-box">
                  <div className="disc-total">
                    {tradeVolumeDiscount[0]?.tradedVolume}{" "}
                    {tradeVolumeDiscount[0]?.currency}(
                    {tradeVolumeDiscount[0]?.discount}% Discount)
                  </div>
                  <div className="total-right">
                    {tradeVolumeDiscount[0]?.tradedVolumeLimit}{" "}
                    {tradeVolumeDiscount[0]?.currency}
                  </div>
                </div>

                <div className="disc-box">
                  <div className="disc-total">Tier 0</div>
                  <div className="total-right">Tier 1</div>
                </div>
                {/* <pre>{JSON.stringify(tradeVolumeDiscount?.filter((item)=>item.tradedVolumeLimit),null,12)}</pre> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="road-map">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <ul className="timeline">
                <li className="active-tl">Register Account</li>
                <li>
                  2FA
                  <p>
                    Secure your account with two-factor authentication！Verified
                  </p>
                </li>
                <li>
                  Deposit Funds
                  <p>
                    Add cash or crypto funds to your wallet and start trading
                    right away
                  </p>
                  <button type="button" className="dpt">
                    Deposit
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="security">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("account.overview.loginHistory")}</h3>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table mb-0">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("tables.loginHistory.startedOn")}</th>
                      <th scope="col">{t("tables.loginHistory.ipAddress")}</th>
                      <th scope="col">{t("tables.loginHistory.os")}</th>
                      <th scope="col">{t("tables.loginHistory.browser")}</th>
                      <th scope="col">{t("tables.loginHistory.location")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginHistory
                      ?.slice(indexOfFirstData, indexOfLastData)
                      ?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {moment(item.startedOn).format(
                              "DD-MM-YYYY HH:mm:ss "
                            )}
                          </td>
                          <td>{item.ip}</td>
                          <td>{item.os}</td>
                          <td>{item.browser}</td>
                          <td>{item.location}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div class="pagination-list">
                  <Pagination
                    postsPerPage={DataPerPage}
                    totalPosts={loginHistory?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="announcements">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-announcements">
                <h3>Announcements</h3>
                <div className="row pt-4">
                  <div className="col-lg-8 col-md-9 col-xl-8 col-sm-12">
                    <div className="announcements-details">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet at tellus, viverra a. Malesuada id felis auctor
                        enim sociis. Consectetur nunc dictum viverra elit.
                        Laoreet nisl elementum quis turpis proin ut imperdiet.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3 col-xl-4 col-sm-12">
                    <div className="announcements-date">
                      <div className="date">2022-01-10</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-9 col-xl-8 col-sm-12">
                    <div className="announcements-details">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet at tellus, viverra a. Malesuada id felis auctor
                        enim sociis. Consectetur nunc dictum viverra elit.
                        Laoreet nisl elementum quis turpis proin ut imperdiet.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3 col-xl-4 col-sm-12">
                    <div className="announcements-date">
                      <div className="date">2022-01-10</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-9 col-xl-8 col-sm-12">
                    <div className="announcements-details">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet at tellus, viverra a. Malesuada id felis auctor
                        enim sociis. Consectetur nunc dictum viverra elit.
                        Laoreet nisl elementum quis turpis proin ut imperdiet.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3 col-xl-4 col-sm-12">
                    <div className="announcements-date">
                      <div className="date">2022-01-10</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="announcements-btn">
                      <button type="button" className="anniunce-btn">
                        See All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountOverview;
