import React from "react";

function Kycverification1() {
  return (
    <div>
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <h1>KYC Verification</h1>
              <p>
                Complete verification to access services. Get verified to <br />
                achieve higher trading capacity.
              </p>
              <div className="section-complete">
                <ul>
                  <li className="active"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>

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
                        <h4>Personal Information</h4>
                        <div className="form-group col-md-12">
                          <label for="inputPhone">Nationality</label>
                          <select name="" id="" className="form-control">
                            <option value="1" selected="">
                              India
                            </option>
                            <option value="1">Pok</option>
                            <option value="1">USA</option>
                          </select>
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputName">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputName">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <h4>Address Information</h4>
                        <div className="form-group col-md-12">
                          <label for="inputName">Residential Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="inputName">Pin</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="inputPhone">City</label>
                          <select name="" id="" className="form-control">
                            <option value="1" selected="">
                              Surat
                            </option>
                            <option value="1">Surat</option>
                            <option value="1">Surat</option>
                          </select>
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputPhone">State</label>
                          <select name="" id="" className="form-control">
                            <option value="1" selected="">
                              Gujrat
                            </option>
                            <option value="1">Maharashtra</option>
                            <option value="1">Maharashtra</option>
                          </select>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kycverification1;
