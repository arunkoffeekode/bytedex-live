import React from "react";
import { Link } from "react-router-dom";
function Apikeys() {
  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>API Keys</h3>
              <div className="right-searchbar">
                <button type="button" className="cancel-btn mr-0">
                  + Add New Key
                </button>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="api-para">
                <p>
                  Use this page to manage your API keys to interact with the
                  exchange.
                </p>
                <p>
                  {" "}
                  When creating an API key be sure to store the private key
                  somewhere safe, you will only see it once.
                </p>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">Key</th>
                      <th scope="col">Type</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3}>
                        <div className="no-record">
                          <img src="/images/no-record.png"></img>
                          <p>No records found</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apikeys;
