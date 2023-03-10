import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";
import { axiosPost } from "../utils/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { links } from "../routes.constants";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../utils/v2/toasts";

export default function Emaillogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");

  const emailFormFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      EmailLoginRequest();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email  is Required.")
        .email("Email is not Valid "),

      password: yup
        .string()
        .required("Password is Required")
        .min(8, "Password must contain atleast 8 characters"),
    }),
  });

  /*  INFO: NO MOBILE OTP FORM */
  // const mobileFormFormik = useFormik({
  //   initialValues: {
  //     mobile: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     // MobileLoginRequest();
  //   },
  //   validationSchema: yup.object({
  //     mobile: yup
  //       .string()
  //       .required("Mobile Number is required.")
  //       .matches(/^\d{10}$/, "Mobile Number is Not Valid."),
  //     password: yup
  //       .string()
  //       .required("Password is required.")
  //       .min(8, "Password must contain atleast 8 characters."),
  //   }),
  // });

  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  async function EmailLoginRequest() {
    try {
      const emailPassword = emailFormFormik.values;
      // const data = await axiosPost(apis.signIn, emailPassword);
      // console.log(data);
      const res = await authenticatedInstance({
        url: apis.signIn,
        method: "POST",
        data: emailPassword,
      });

      // console.log(res);
      // console.log(res.data);

      if (res?.status === 200 && res?.data?.status === "Success") {
        const tempAuthToken = res.data.data.tempAuthToken;
        dispatch(setAuth(res.data?.data));
        localStorage.setItem("username", tempAuthToken);

        navigate(links.verification, {
          state: {
            login: true,
            username: tempAuthToken,
            tempAuthToken,
          },
        });
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      alert(error);
    }
  }

  /*  INFO: NO MOBILE OTP FORM */
  // async function MobileLoginRequest() {
  //   try {
  //     const mobilePassword = mobileFormFormik.values;
  //     // const data = await axiosPost(apis.signIn, mobilePassword);
  //     // console.log(data);
  //     const res = await authenticatedInstance({
  //       url: apis.signIn,
  //       method: "POST",
  //       data: mobilePassword,
  //     });
  //     // console.log(res);
  //     // console.log(res.data);
  //     if (res.data?.status === "Success") {
  //       const tempAuthToken = res.data.data.tempAuthToken;
  //       dispatch(setAuth(res.data?.data));
  //       localStorage.setItem("username", tempAuthToken);
  //       navigate(links.verification, {
  //         state: {
  //           login: true,
  //           username: tempAuthToken,
  //           tempAuthToken,
  //         },
  //       });
  //     }
  //   } catch (error) {}
  // }

  return (
    <div>
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre box-width">
              {/* <h1>Welcome To ByteDex</h1> */}
              <h1>{t("forms.login.title")}</h1>
              <ToastContainer />
              <p>Log In with your Email, Phone number.</p>

              {/* <pre>{JSON.stringify(emailFormFormik.values, null, 2)}</pre>
              <pre>{JSON.stringify(emailFormFormik.errors, null, 2)}</pre>

              <pre>{JSON.stringify(mobileFormFormik.values, null, 2)}</pre>
              <pre>{JSON.stringify(mobileFormFormik.errors, null, 2)}</pre> */}
              <div className="center-tab">
                <ul
                  id="myTab1"
                  role="tablist"
                  className="nav nav-tabs nav-pills justify-content-center"
                >
                  <li className="nav-item">
                    <a
                      id="email-tab"
                      data-toggle="tab"
                      href="#email"
                      role="tab"
                      aria-controls="email"
                      aria-selected="true"
                      className="nav-link border active show"
                    >
                      Email
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      id="mobile-tab"
                      data-toggle="tab"
                      href="#mobile"
                      role="tab"
                      aria-controls="mobile"
                      aria-selected="false"
                      className="nav-link border"
                    >
                      Mobile
                    </a>
                  </li> */}
                </ul>
              </div>
              <div className="checkout-login-step mt-1">
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="email"
                    role="tabpanel"
                    aria-labelledby="email-tab"
                    className="tab-pane fade active show"
                  >
                    <form
                      onSubmit={emailFormFormik.handleSubmit}
                      autoComplete="off"
                    >
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder={t("forms.login.email.placeholder")}
                            autoFocus
                            value={emailFormFormik.values.email}
                            onChange={emailFormFormik.handleChange}
                            onBlur={emailFormFormik.handleBlur}
                          />
                          {emailFormFormik.errors.email &&
                          emailFormFormik.touched.email ? (
                            <p className="ms-4 text-start text-danger">
                              {emailFormFormik.errors.email}{" "}
                            </p>
                          ) : null}
                        </div>
                        <div className="form-group col-md-12">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            placeholder={t("forms.login.password.placeholder")}
                            onChange={emailFormFormik.handleChange}
                            value={emailFormFormik.values.password}
                            onBlur={emailFormFormik.handleBlur}
                          />
                          {emailFormFormik.errors.password &&
                          emailFormFormik.touched.password ? (
                            <p className="ms-4 text-start text-danger">
                              {emailFormFormik.errors.password}{" "}
                            </p>
                          ) : null}
                          <button
                            type="button"
                            id="btnToggle"
                            className="toggle"
                            onClick={togglePassword}
                          >
                            <i id="eyeIcon" className="fa fa-eye"></i>
                          </button>
                        </div>
                        <div className="text-center mb-4">
                          <Link to={links.forgotPassword}>
                            {t("buttons.forgotPassword")}
                          </Link>
                        </div>
                        <div className="form-group col-md-12 mb-0">
                          <button
                            type="submit"
                            className="forgot-btn"
                            // onClick={() => {
                            //   EmailLoginRequest();
                            //   // console.log("Submit", values);
                            // }}
                          >
                            {t("forms.login.title")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    id="mobile"
                    role="tabpanel"
                    aria-labelledby="mobile-tab"
                    className="tab-pane fade"
                  >
                    {/*  INFO: NO MOBILE OTP FORM */}
                    {/* <form onSubmit={mobileFormFormik.handleSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            id="mobile"
                            className="form-control"
                            placeholder="Enter Your Mobile Number"
                            autoFocus
                            value={mobileFormFormik.values.mobile}
                            onChange={mobileFormFormik.handleChange}
                            onBlur={mobileFormFormik.handleBlur}
                          />
                          {mobileFormFormik.errors.mobile &&
                            mobileFormFormik.touched.mobile && (
                              <p className="ms-4 text-start text-danger">
                                {mobileFormFormik.errors.mobile}{" "}
                              </p>
                            )}
                        </div>
                        <div className="form-group col-md-12">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={mobileFormFormik.values.password}
                            onChange={mobileFormFormik.handleChange}
                            onBlur={mobileFormFormik.handleBlur}
                          />
                          {mobileFormFormik.errors.password &&
                            mobileFormFormik.touched.password && (
                              <p className="ms-4 text-start text-danger">
                                {mobileFormFormik.errors.password}{" "}
                              </p>
                            )}
                          <button
                            type="button"
                            id="btnToggle"
                            className="toggle"
                            onClick={togglePassword}
                          >
                            <i id="eyeIcon" className="fa fa-eye"></i>
                          </button>
                        </div>
                        <div className="text-center mb-4">
                          <Link to={links.forgotPassword}>
                            {t("buttons.forgotPassword")}
                          </Link>
                        </div>
                        <div className="form-group col-md-12 mb-0">
                          <button
                            type="submit"
                            className="forgot-btn"
                            // onClick={() => {
                            //   MobileLoginRequest();
                            // }}
                          >
                            {t("forms.login.title")}
                          </button>
                        </div>
                      </div>
                    </form> */}
                  </div>
                </div>
              </div>
              <div className="account-sign">
                <div className="out">
                  {/* Don't have a Account?{" "} */}
                  <Link to="/exchangeAccount">{t("forms.signUp.title")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
