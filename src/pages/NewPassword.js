import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { apis } from "../apis.constants";
import { authenticatedInstance } from "../utils/api";
import CryptoJS from "crypto";
import raw from "../public.pem";
import JSEncrypt from "jsencrypt";

function NewPassword() {
  const [newPass, setNewPass] = useState();
  const [cPass, setCPass] = useState();
  const [emailotp, setEmailOTP] = useState();
  const [smsotp, setSMSOTP] = useState();

  let pemContents = "";
  fetch(raw)
    .then((r) => r.text())
    .then((text) => {
      pemContents = text;
    });

  const encrypt = new JSEncrypt();

  const pass = () => {
    let passwordInput = document.getElementById("txtPassword"),
      toggle = document.getElementById("btnToggle"),
      icon = document.getElementById("eyeIcon");

    function togglePassword() {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.add("fa-eye-slash");
        //toggle.innerHTML = 'hide';
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        //toggle.innerHTML = 'show';
      }
    }

    function checkInput() {}
    toggle.addEventListener("click", togglePassword, false);
    passwordInput.addEventListener("keyup", checkInput, false);
  };

  const pass1 = () => {
    let passwordInput = document.getElementById("txtPassword"),
      toggle = document.getElementById("btnToggle"),
      icon = document.getElementById("eyeIcon");

    function togglePassword() {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.add("fa-eye-slash");
        //toggle.innerHTML = 'hide';
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        //toggle.innerHTML = 'show';
      }
    }

    function checkInput() {}
    toggle.addEventListener("click", togglePassword, false);
    passwordInput.addEventListener("keyup", checkInput, false);
  };

  var location = useLocation();

  async function ResetPassword() {

    encrypt.setPublicKey(pemContents);
  var encrypted = encrypt.encrypt(newPass);

  alert(encrypted.toString("base64"));
    const data = {
      email: location.state.email,
      new_password: encrypted,
      email_token: location.state.data.emailToken,
      email_otp: emailotp,
      sms_token: location.state.data.smsToken,
      sms_otp: smsotp,
    };
    console.log(data);
        if (newPass === cPass) {
          try {
            const res = await authenticatedInstance({
              url: apis.resetPassword,
              method: "POST",
              data: data,
            });

            // console.log(res);
            // console.log(res.data);

            if (res.data?.status === "Success") {
              alert("Password Reset Successfully");
              // navigate("/NewPassword")
            }
          } catch (error) {
            console.log(error);
            alert(error);
          }
        } else {
          alert("Password  Not Matched ");
        }
  }

  return (
    <div>
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <h1>Create new password</h1>
              <p>We'll ask for this password whenever you sign in.</p>
              <div className="checkout-login-step mt-5">
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
                            type="password"
                            id="txtPassword"
                            className="form-control"
                            placeholder="New Confirm"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                          />
                          <button
                            type="button"
                            id="btnToggle"
                            className="toggle"
                            onClick={pass}
                          >
                            <i id="eyeIcon" className="fa fa-eye"></i>
                          </button>
                        </div>
                        <div className="form-group col-md-12">
                          <input
                            type="password"
                            id="txtPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={cPass}
                            onChange={(e) => setCPass(e.target.value)}
                          />
                          <button
                            type="button"
                            id="btnToggle"
                            className="toggle"
                            onClick={pass1}
                          >
                            <i id="eyeIcon" className="fa fa-eye"></i>
                          </button>
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="number"
                            id="otp"
                            className="form-control"
                            placeholder="Enter SMS OTP"
                            value={smsotp}
                            onChange={(e) => setSMSOTP(e.target.value)}
                          />
                          <button
                            type="button"
                            id="btnToggle"
                            className="toggle"
                            // onClick={pass1}
                          >
                            <i id="eyeIcon" className="fa fa-eye"></i>
                          </button>
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="number"
                            id="txtPassword"
                            className="form-control"
                            placeholder="Enter Email OTP"
                            value={emailotp}
                            onChange={(e) => setEmailOTP(e.target.value)}
                          />
                          <button
                            type="button"
                            id="btnToggle"
                            className="toggle"
                            onClick={pass1}
                          >
                            <i id="eyeIcon" className="fa fa-eye"></i>
                          </button>
                        </div>

                        <div className="form-group col-md-12 mb-0">
                          <button
                            onClick={() => ResetPassword()}
                            type="button"
                            className="forgot-btn"
                          >
                            Submit
                          </button>
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

export default NewPassword;
