import React from "react";

function Ipaddress() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
          {/* Modal  */}
          <div
            className="modal fade"
            id="exampleModalCenter1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    IP Address
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          id="inputemail"
                          placeholder="Input your 6 digit authenticator code "
                        />
                      </div>
                      <div className="form-group col-md-12 mb-0 m">
                        <button type="button" className="forgot-btn">
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
  );
}

export default Ipaddress;
