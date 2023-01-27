import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import TwoFactorAuth from "../../component/TwoFactorAuth";
import ChangePassModel from "../../component/ChangePassModel";
import Authenticator from "../../component/Authenticator";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setUserProfile } from "../../store/userSlice";
import Swal from "sweetalert2";
import moment from "moment";
import Pagination from "../../pagination/Pagination";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

function Security() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const [loaded, setLoaded] = useState(false);

  const [isEnabled2FA, setIsEnabled2FA] = useState();
  const [LoginHistory, setLoginHistory] = useState([]);
  const [renderedData, setRenderedData] = useState([]);

  //pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const DataPerPage = 10;

  // Get current Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!loaded) {
      (async () => {
        try {
          const res = await authenticatedInstance({
            url: apis.profile,
            method: "GET",
          });

          if (res.data?.status === "Success") {
            dispatch(setUserProfile(res.data?.data));
            setIsEnabled2FA(res.data?.data?.is2FAEnabled);
          }
        } catch (error) {
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [loaded]);

  useEffect(() => {
    if (LoginHistory?.length) {
      setRenderedData(LoginHistory);
    }
  }, [LoginHistory]);

  const handleOnSearch = (string, results) => {
    if (string !== "") {
      setRenderedData([...results]);
    }
  };

  const formatResult = (item) => {
    return null;
  };

  async function GAuth_Check_Status() {
    try {
      const res = await authenticatedInstance({
        url: apis.Check2FA_isEnabled,
        method: "GET",
      });

      // console.log(res);
      // console.log(res.data);

      if (res.data?.data) {
        // dispatch(setUserProfile(res.data?.data));

        setIsEnabled2FA(res.data?.data);
      } else {
        // GAuth_Enable_Request();
        setIsEnabled2FA(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RequestChangePasswordOTP() {
    try {
      const res = await authenticatedInstance({
        url: apis.RequestChangePasswordOTP,
        method: "POST",
      });

      // console.log(res);
      // console.log(res.data);

      if (res.data?.status === "Success") {
        // dispatch(setUserProfile(res.data?.data));
        // Swal.fire({
        //   title: res.data.message,
        //   icon: "success",
        //   showConfirmButton: false,
        //   showCancelButton: false,
        //   position: "top-right",
        //   timer: 3000,
        // })
      } else {
        // GAuth_Enable_Request code();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function LoginHistoryData() {
    try {
      const res = await authenticatedInstance({
        url: apis.LoginHistory,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setLoginHistory(res.data?.data);
      } else {
        setLoginHistory();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GAuth_Check_Status();
    LoginHistoryData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <section className="security pb-0">
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("account.security.link")}</h3>
            </div>
          </div>
          {/* <div className="sec-pro">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xl-8">
                <div className="protection">
                  <img src="/images/google-authentication.png"></img>
                  <div className="protection-details">
                    <h6>Google Authenticator</h6>
                    <p>
                      It is strongly recommended to enable Google Authenticator
                      to protect your account.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="enable">
                  <button
                    type="button"
                    class="enable-btn"
                    data-toggle="modal"
                    data-target={isEnabled2FA ? "" : "#exampleModalCenter5"}
                    onClick={() =>
                      isEnabled2FA
                        ? Swal.fire({
                            title: "2FA is Already enabled",
                            icon: "info",
                            showCancelButton: false,
                            showConfirmButton: false,
                            position: "center",
                            timer: 2000,
                          })
                        : ""
                    }
                  >
                    {isEnabled2FA ? "Enabled" : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="sec-pro">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xl-8">
                <div className="protection">
                  <img src="/images/two-factor.png"></img>
                  <div className="protection-details">
                    <h6>
                      {t("account.security.twoFactorText")}
                      {isEnabled2FA
                        ? t("account.security.twoFactorEnabled")
                        : t("account.security.twoFactorDisabled")}
                    </h6>
                    <p>
                      Manage mobile and authenticator verification for login and
                      withdrawals
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="enable">
                  <button
                    type="button"
                    className="enable-btn"
                    data-toggle="modal"
                    data-target={
                      isEnabled2FA
                        ? "#disableAuthenticatorModal"
                        : "#enableAuthenticatorModal"
                    }
                  >
                    {isEnabled2FA
                      ? t("buttons.disable2FA")
                      : t("buttons.enable2FA")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="sec-pro">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xl-8">
                <div className="protection">
                  <img src="/images/phone-verification.png"></img>
                  <div className="protection-details">
                    <h6>{t("account.phoneVerification.link")}</h6>
                    <p>
                      Manage mobile and authenticator verification for login and
                      withdrawals
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="enable">
                  <button
                    type="button"
                    className="enable-btn"
                    onClick={() =>
                      profile?.isMobileVerified
                        ? navigate("/phoneVerification", {
                            state: {
                              MobileVerify: "Disable",
                              mobileNumber: profile?.mobileNumber,
                            },
                          })
                        : navigate("/phoneVerification", {
                            state: { MobileVerify: "verify" },
                          })
                    }
                  >
                    {profile?.isMobileVerified
                      ? t("account.phoneVerification.disable")
                      : t("account.phoneVerification.enable")}
                  </button>
                  {/* <button type="button" className="enable-btn-right">
                    Change
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="sec-pro">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xl-8">
                <div className="protection">
                  <img src="/images/email-verification.png"></img>
                  <div className="protection-details">
                    <h6>Email Verification</h6>
                    <p>
                      Manage Email and authenticator verification for login and
                      withdrawals
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="enable">
                  <button
                    type="button"
                    className="enable-btn"
                    onClick={() => {
                      navigate("/emailVerification");
                    }}
                  >
                    {t("account.phoneVerification.enable")}
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="sec-pro">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xl-8">
                <div className="protection">
                  <img src="/images/change-pass.png"></img>
                  <div className="protection-details">
                    <h6>{t("account.changePassword.link")}</h6>
                    <p>Login password is used to log in to your account.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="enable">
                  <button
                    type="button"
                    className="enable-btn"
                    data-toggle="modal"
                    data-target="#exampleModalCenter1"
                    onClick={() => RequestChangePasswordOTP()}
                  >
                    {t("forms.changePassword.title")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              {/* <pre>{JSON.stringify(LoginHistory[0], null, 2)}</pre> */}
              <h3>{t("account.deviceWhitelisting.title")}</h3>
              <div className="right-searchbar">
                <ReactSearchAutocomplete
                  items={LoginHistory}
                  fuseOptions={{
                    keys: ["lcoation", "device", "ip", "browser"],
                  }}
                  onSearch={handleOnSearch}
                  placeholder="Search "
                  formatResult={formatResult}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">
                        {t("tables.deviceWhitelisting.addedOn")}
                      </th>
                      <th scope="col">
                        {t("tables.deviceWhitelisting.device")}
                      </th>
                      <th scope="col">
                        {t("tables.deviceWhitelisting.browser")}
                      </th>
                      <th scope="col">{t("tables.deviceWhitelisting.ip")}</th>
                      <th scope="col">{t("tables.deviceWhitelisting.os")}</th>
                      <th scope="col">{t("tables.loginHistory.location")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderedData
                      ?.slice(indexOfFirstData, indexOfLastData)
                      ?.map((item, index) => (
                        <tr>
                          <td>
                            {moment(item.startedOn).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </td>

                          <td>{item.device}</td>
                          <td>{item.browser}</td>
                          <td>{item.ip}</td>
                          <td>{item.os}</td>
                          <td>{item.location}</td>
                          <td>
                            <button type="button" className="delete">
                              {t("tables.deviceWhitelisting.delete")}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div class="pagination-list">
                  <Pagination
                    postsPerPage={DataPerPage}
                    totalPosts={LoginHistory.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Authenticator
        onSuccess={() => {
          setLoaded(false);
        }}
      />
      <TwoFactorAuth
        onSuccess={() => {
          setLoaded(false);
        }}
      />
      <ChangePassModel />
    </div>
  );
}

export default Security;
