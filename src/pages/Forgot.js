import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apis } from "../apis.constants";
import { links } from "../routes.constants";
import { authenticatedInstance } from "../utils/api";

function Forgot() {
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();

  const navigate = useNavigate();

  const data = {
    captcha_code: "",
    email: email,
    country_code: "",
    mobile: mobile,
  };

  async function forgotPassword() {
    try {
      const res = await authenticatedInstance({
        url: apis.forgotPassword,
        method: "POST",
        data: data,
      });

      // console.log(res);
      // console.log(res.data);

      if (res.data?.status === "Success") {
        alert("OTP Send Successfully");
        navigate(links.resetPassword, {
          state: { data: res.data.data, email: email, mobile: mobile },
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div>
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre box-width">
              <h1>Forgot Password?</h1>
              <p>
                Enter the email address or mobile phone number
                <br /> associated with your account.
              </p>
              <div className="center-tab">
                <ul
                  id="myTab1"
                  role="tablist"
                  className="nav nav-tabs nav-pills justify-content-center"
                >
                  <li className="nav-item">
                    <a
                      id="description-tab"
                      data-toggle="tab"
                      href="#description"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                      className="nav-link border active show"
                    >
                      Email
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      id="review-tab"
                      data-toggle="tab"
                      href="#review"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                      className="nav-link border"
                    >
                      Mobile
                    </a>
                  </li> */}
                </ul>
              </div>
              <div className="checkout-login-step mt-2">
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane fade active show"
                  >
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input
                            type="email"
                            className="form-control"
                            id="inputemail"
                            placeholder="Enter Your Email ID"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-12 mb-0">
                          <button
                            type="button"
                            onClick={() => forgotPassword()}
                            className="forgot-btn"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                    className="tab-pane fade"
                  >
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input
                            type="number"
                            className="form-control"
                            id="inputmobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter Your Mobile Number"
                          />
                        </div>

                        <div className="form-group col-md-12 mb-0">
                          <button type="button" className="forgot-btn">
                            Continue
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="account-sign">
                <div className="out">
                  Already have an account?
                  <Link to="/Emaillogin"> Log in Now</Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
