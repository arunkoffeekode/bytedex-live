import React from "react";
import { Link } from "react-router-dom";
function Volume() {
  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>Trading Volume Discount</h3>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="tier-box">
                <div className="tier-inner">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 col-xl-6 col-md-6">
                      <h3>0 BTC (0% Discount)</h3>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xl-6 col-md-6">
                      <div className="disc">0.5 BTC</div>
                    </div>
                  </div>
                </div>
                <div className="tier-inner">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 col-xl-6 col-md-6">
                      <h3>Tier 0</h3>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xl-6 col-md-6">
                      <div className="disc">Tier 1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="para">
                <p>
                  Every day your trading volume from the last 30 days are
                  evalulated. You will recieve
                  <br /> a trading fee discount based on your past trading
                  volume.
                </p>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">Tier</th>
                      <th scope="col">Holdings</th>
                      <th scope="col">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="active">
                      <td>
                        <button type="button" className="tier">
                          Tier 0 <img src="/images/level.png"></img>
                        </button>
                      </td>
                      <td>0 BTC</td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>Tier 1</td>
                      <td>0.5 BTC </td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>Tier 2</td>
                      <td>0.5 BTC </td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>Tier 3</td>
                      <td>0.5 BTC </td>
                      <td>5%</td>
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

export default Volume;
