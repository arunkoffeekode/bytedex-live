import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setUserProfile } from "../store/userSlice";
import { links } from "../routes.constants";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../utils/v2/toasts";
import countryCodes from "../component/countryCodes.json";
import { ToastContainer } from "react-toastify";

function PhoneVerification() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);

  const [countryCode, setCountryCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [smsotp, setSmsOtp] = useState("");
  const [phoneverifytoken, setPhoneVerifyToken] = useState();

  const [mobVerify] = useState(location.state.MobileVerify);

  const dispatch = useDispatch();

  useEffect(() => {
    AccountRequest();
  }, []);

  async function AccountRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.profile,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        dispatch(setUserProfile(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function PhoneVerifyStep1() {
    try {
      const res = await authenticatedInstance({
        url: apis.PhoneVerificationStep1,
        method: "POST",
        data: {
          country_code: countryCode || profile.country,
          mobile_number: mobile,
        },
      });

      if (res.data?.status === "Success") {
        setPhoneVerifyToken(res.data?.data?.token);
        successToast(t(`messages.${res.data?.message}`));
      } else {
        errorToast(t(`messages.${res.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function PhoneVerifyStep2() {
    try {
      const res = await authenticatedInstance({
        url: apis.PhoneVerificationStep2,
        method: "POST",
        data: { token: phoneverifytoken, sms_otp: smsotp },
      });

      if (res.data?.status === "Success") {
        navigate(links.accountSecurity);
        successToast(t(`messages.${res.data?.message}`));
      } else {
        errorToast(t(`messages.${res.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function DeletePhoneVerificationStep1() {
    try {
      const res = await authenticatedInstance({
        url: apis.DeletePhoneVerificationStep1,
        method: "POST",
        data: {
          country_code: countryCode || profile.country,
          mobile_number: location.state.mobileNumber,
        },
      });

      if (res.data?.status === "Success") {
        setPhoneVerifyToken(res.data?.data?.token);
        successToast(t(`messages.${res.data?.message}`));
      } else {
        errorToast(t(`messages.${res.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function DeletePhoneVerificationStep2() {
    try {
      const res = await authenticatedInstance({
        url: apis.DeletePhoneVerificationStep2,
        method: "POST",
        data: { token: phoneverifytoken, sms_otp: smsotp },
      });

      if (res.data?.status === "Success") {
        navigate(links.accountSecurity);
        successToast(t(`messages.${res.data?.message}`));
      } else {
        errorToast(t(`messages.${res.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <div
                className="checkout-login-step"
                style={{ borderRadius: "28px" }}
              >
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane p-0 fade active show"
                  >
                    <form>
                      <div className="form-row">
                        <h4>{t("account.phoneVerification.link")}</h4>
                        <div className="col-md-12">
                          <div className="phone-img">
                            <img src="images/phone-verify.png"></img>
                          </div>
                        </div>

                        <div className="form-group col-md-12">
                          <label for="inputPhone">
                            {t("account.phoneVerification.selectCountry")}
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setCountryCode(e.target.value);
                            }}
                          >
                            <option value="">
                              {t("account.phoneVerification.selectCountry")}
                            </option>
                            {countryCodes.map((cc, key) => (
                              <option
                                key={key}
                                value={cc.dial_code}
                                selected={cc.code === profile?.country}
                              >
                                {cc.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          {mobVerify === "Disable" ? null : (
                            <div className="form-group col-md-12">
                              <label for="inputName">
                                {t("account.phoneVerification.mobileNumber")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputemail"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                              />
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <label for="inputName">
                            {t("account.phoneVerification.mobileOTP")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputemail"
                            value={smsotp}
                            onChange={(e) => setSmsOtp(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-12 mb-4">
                          <button
                            type="button"
                            className="forgot-btn"
                            onClick={() => {
                              if (mobVerify === "Disable") {
                                DeletePhoneVerificationStep1();
                              } else {
                                if (!mobile) {
                                  errorToast(
                                    t(
                                      `account.phoneVerification.mobileNumberRequired`
                                    )
                                  );
                                  return;
                                }
                                PhoneVerifyStep1();
                              }
                            }}
                          >
                            {t("account.phoneVerification.requestOTP")}
                          </button>
                        </div>

                        <div className="form-group col-md-12 mb-0">
                          {mobVerify === "Disable" ? (
                            <button
                              type="button"
                              className="forgot-btn"
                              onClick={() =>
                                phoneverifytoken && smsotp
                                  ? DeletePhoneVerificationStep2()
                                  : errorToast(
                                    t(
                                      `account.phoneVerification.smsVerificationMsg`,
                                      {
                                        mobileNumber: "",
                                      }
                                    )
                                  )
                              }
                            >
                              {t("account.phoneVerification.disable")}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="forgot-btn"
                              onClick={() =>
                                phoneverifytoken && smsotp
                                  ? PhoneVerifyStep2()
                                  : errorToast(
                                    t(
                                      `account.phoneVerification.smsVerificationMsg`,
                                      {
                                        mobileNumber: "",
                                      }
                                    )
                                  )
                              }
                            >
                              {t("account.phoneVerification.enable")}
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneVerification;
