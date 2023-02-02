import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { apis } from "../apis.constants";
import { links } from "../routes.constants";
import { authenticatedInstance } from "../utils/api";
import countries from "../component/countryCodes.json";
import { errorToast } from "../utils/v2/toasts";

function ExchangeAccount() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function toggleConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    async function MobileOTPRequest() {
        try {
        } catch (error) { }
    }

    async function CreateAccountRequest() {
        try {
            const createAccount = {
                firstname: firstName,
                middlename: "",
                lastname: lastName,
                email,
                country,
                mobile,
                password,
                referralId: "",
                // mobileOTP: "",
            };
            const res = await authenticatedInstance({
                url: apis.requestMobileVerificationOTP,
                // url: apis.signUp,
                method: "POST",
                data: createAccount,
            });

            console.log(res);
            console.log(res.data);

            if (res.data?.status === "Success") {
                navigate(links.verification, {
                    state: {
                        signup: true,
                        ...createAccount,
                    },
                });
            } else {
                errorToast(t(`messages${res?.data?.message}`));
            }
        } catch (error) { }
    }
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
                                        <div class="sign-link">Don't have a Account? <Link to={links.login}>{t("forms.login.title")}</Link></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-10'>
                                        <div className='frm-section'>
                                            <h2>{t("forms.signUp.title")}</h2>
                                            <p>Register with your email or mobile </p>
                                            <div className='start-form'>
                                                <form>
                                                    <div className='row'>
                                                        <div className="form-group col-md-6">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="inputemail"
                                                                placeholder={t(
                                                                    "forms.signUp.firstName.placeholder"
                                                                )}
                                                                autoFocus
                                                                value={firstName}
                                                                onChange={(e) => {
                                                                    setFirstName(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="inputemail"
                                                                placeholder={t("forms.signUp.lastName.placeholder")}
                                                                value={lastName}
                                                                onChange={(e) => {
                                                                    setLastName(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-12">
                                                            <select
                                                                className="form-control "
                                                                onChange={(e) => {
                                                                    setCountry(e.target.value);
                                                                }}
                                                            >
                                                                <option value="">Select Country</option>
                                                                {countries.map((data, key) => (
                                                                    <option value={data.code} key={key}>
                                                                        {data.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="inputemail"
                                                                placeholder={t(
                                                                    "forms.signUp.mobileNumber.placeholder"
                                                                )}
                                                                value={mobile}
                                                                onChange={(e) => {
                                                                    setMobile(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="inputemail"
                                                                placeholder={t(
                                                                    "forms.signUp.emailAddress.placeholder"
                                                                )}
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-12">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                id="txtPassword"
                                                                className="form-control"
                                                                placeholder={t("forms.signUp.password.placeholder")}
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <button
                                                                type="button"
                                                                id="btnToggle"
                                                                className="toggle"
                                                                onClick={togglePassword}
                                                            >
                                                                <i id="eyeIcon" className="fa fa-eye"></i>
                                                            </button>
                                                        </div>
                                                        <div className="form-group col-md-12">
                                                            <input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                id="txtPassword"
                                                                className="form-control"
                                                                placeholder={t(
                                                                    "forms.signUp.confirmPassword.placeholder"
                                                                )}
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                            />
                                                            <button
                                                                type="button"
                                                                id="btnToggle"
                                                                className="toggle"
                                                                onClick={toggleConfirmPassword}
                                                            >
                                                                <i id="eyeIcon" className="fa fa-eye"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='row' style={{ alignItems: 'center' }}>

                                                        <div className='col-lg-6 col-md-6'>
                                                            <button
                                                                type="button"
                                                                className="forgot-btn"
                                                                onClick={() => {
                                                                    CreateAccountRequest();
                                                                }}
                                                            >
                                                                {t("buttons.signUp")}
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
                        <img src="images/sign.png"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExchangeAccount