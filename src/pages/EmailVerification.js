import React from "react";

function EmailVerification() {
  return (
    <div>
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <div
                className="checkout-login-step mt-5"
                style={{ borderRadius: "28px" }}
              >
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane fade active show"
                  >
                    <form>
                      <div className="form-row">
                        <h4>Email Verification</h4>
                        <div className="col-md-12">
                          <div className="phone-img">
                            <img src="images/email-verify.png"></img>
                          </div>
                        </div>

                        <div className="form-group col-md-12">
                          <label for="inputName">Email ID</label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputName">Mobile OTP</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <a href="#" style={{ color: "#2C6FE1" }}>
                          Request OTP
                        </a>
                        <div className="form-group col-md-12 mb-0">
                          <button type="button" className="forgot-btn">
                            Change
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

export default EmailVerification;
