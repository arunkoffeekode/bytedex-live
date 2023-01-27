import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apis } from "../apis.constants";
import { authenticate, selectAuth } from "../store/authSlice";
import { authenticatedInstance } from "../utils/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { links } from "../routes.constants";
import { useTranslation } from "react-i18next";
import { errorToast } from "../utils/v2/toasts";
import { ToastContainer } from "react-toastify";

function Verification() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const { state } = useLocation();

  const verificationFormik = useFormik({
    initialValues: {
      deviceOtp: "",
      otp: "",
    },
    onSubmit: (values) => {
      // console.log(values);
    },
    validationSchema: yup.object({
      otp: yup
        .string()
        .required("OTP  is required.")
        .matches(/^\d{6}$/, "OTP must be exact 6 digit "),
    }),
  });

  async function SignupOTPVerificationRequest() {
    try {
      const signupOTPVerification = {
        ...state,
        mobileOTP: verificationFormik.values.otp,
      };

      const res = await authenticatedInstance({
        // url: apis.signUpVerification,
        url: apis.signUp,
        method: "POST",
        data: signupOTPVerification,
      });

      // console.log(res);
      // console.log(res.data);

      if (res.status === 200) {
        // navigate("/account");
        navigate(links.login, { replace: true });
        // https://exchange.bytedex.io/account-verification/b67b3e3b-56c1-48a4-835d-d37ce8bf4409
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {}
  }

  async function LoginOTPVerificationRequest() {
    try {
      // const username = localStorage.getItem("username");
      const username =
        state?.tempAuthToken ??
        state?.username ??
        state?.localStorage.getItem("username");
      const loginOTPVerification = new FormData();

      loginOTPVerification.append("grant_type", "password");
      loginOTPVerification.append("username", username);
      loginOTPVerification.append("password", verificationFormik.values.otp);

      const res = await authenticatedInstance({
        url: apis.signInToken,
        method: "POST",
        data: loginOTPVerification,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data?.access_token);
        dispatch(authenticate({ isAuthorized: true }));
        navigate(links.account, { replace: true });
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {}
  }

  return (
    <div>
      <ToastContainer />
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <h1>
                {state?.login && !state?.signup && t("forms.login.title")}
              </h1>
              <h1>
                {state?.signup && !state?.login && t("forms.signUp.title")}
              </h1>
              <p>
                {/* To continue, please enter OTP below to complete verification. */}
              </p>
              <div className="checkout-login-step mt-5">
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane fade active show"
                  >
                    <form onSubmit={verificationFormik.handleSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="otp"
                            placeholder="Enter OTP"
                            autoFocus
                            value={verificationFormik.values.otp}
                            onChange={verificationFormik.handleChange}
                            onBlur={verificationFormik.handleBlur}
                          />
                          {verificationFormik.errors.otp &&
                          verificationFormik.touched.otp ? (
                            <p style={{ color: "red" }}>
                              {verificationFormik.errors.otp}
                            </p>
                          ) : null}
                        </div>
                        {/* {auth?.deviceVerificationRequired && (
                          <div className="form-group col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              id="otp"
                              placeholder="Enter Device OTP"
                              value={verificationFormik.values.deviceOtp}
                              onChange={verificationFormik.handleChange}
                              onBlur={verificationFormik.handleBlur}
                            />
                          </div>
                        )} */}
                        <div className="form-group col-md-12 mb-0">
                          <button
                            type="submit"
                            className="forgot-btn"
                            onClick={() => {
                              if (state?.login && !state?.signup) {
                                LoginOTPVerificationRequest();
                              } else if (state?.signup && !state?.login) {
                                SignupOTPVerificationRequest();
                              } else {
                                console.log("Something Went Wrong");
                              }
                            }}
                          >
                            {state?.login &&
                              !state?.signup &&
                              t("buttons.login")}
                            {state?.signup &&
                              !state?.login &&
                              t("buttons.signUp")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="account-sign">
                {/* <div className="out">
                  Already have an account?
                  <Link to="/emailLogin"> Log in Now</Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
