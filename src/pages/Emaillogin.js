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

function Emailloginold() {
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
            <div className='new-login'>
                <div className='row'>
                    <div className='login-left-section'>
                        <div className='row justify-content-center m-0'>
                            <div className='col-lg-10 col-md-9'>
                                <div className='row' style={{ alignItems: 'center' }}>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="login-logo">
                                            <img src="images/logo.png"></img>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="sign-link">Don't have a Account?  <Link to="/ExchangeAccount">{t("forms.signUp.title")}</Link></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-8'>
                                        <div className='frm-section'>
                                            <h2>{t("forms.login.title")}</h2>
                                            <p>Log in with your Email, Phone number </p>
                                            <div className='start-form'>
                                                <form
                                                    onSubmit={emailFormFormik.handleSubmit}
                                                    autoComplete="off"
                                                >
                                                    <div className='form-row'>
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
                                                    </div>
                                                    <div className='row' style={{ alignItems: 'center' }}>
                                                        <div className='col-lg-6 col-md-6'>
                                                            <Link to={links.forgotPassword}>
                                                                {t("buttons.forgotPassword")}
                                                            </Link>
                                                        </div>
                                                        <div className='col-lg-6 col-md-6'>
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
                                            <div className="cyp">
                                                <h6>Copyright © 2023 by Byte Exchange all Rights Reserved.</h6>
                                                <p>Disclaimer: The purchase of digital currencies is conducted through Byte Exchange. By accessing this site, you agree to be bound by its Terms of Service and Privacy Policy.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-right-img">
                        <img src="images/login.png"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emailloginold