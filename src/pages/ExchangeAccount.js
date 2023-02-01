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
    } catch (error) {}
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
    } catch (error) {}
  }

  return (
    <div>
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <h1>{t("forms.signUp.title")}</h1>
              <div className="checkout-login-step mt-1">
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane fade active show"
                  >
                    <form>
                      <div className="row">
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
                        <div className="form-group col-md-6">
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
                        <div className="form-group col-md-6">
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
                        <p>
                          Password must be no less than 7 characters including
                          uppercase & lowercase letters
                        </p>
                        <div className="form-group col-md-6">
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

                        <div className="form-group col-md-6 mb-0">
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
                </div>
              </div>
              <div className="account-sign">
                <div className="out">
                  <Link to={links.login}>{t("forms.login.title")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangeAccount;
