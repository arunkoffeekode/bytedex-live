import React from "react";
import { Link } from "react-router-dom";
import Ipaddress from "../../component/Ipaddress";

function Whitelisting() {
  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>IP Whitelisting</h3>
              <div className="right-searchbar">
                <button
                  type="button"
                  className="cancel-btn mr-0"
                  data-toggle="modal"
                  data-target="#exampleModalCenter1"
                >
                  + Add IP Address
                </button>
                <Ipaddress />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">IP Addresses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="no-record">
                          <img src="images/no-record.png"></img>
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

export default Whitelisting;
