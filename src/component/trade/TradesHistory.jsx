import React from "react";

export default function TradesHistory() {
  return (
    <div>
      <div
        className="coin-left-section mb-3"
        style={{ borderRadius: "20px 0px 0px 20px" }}
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            <div className="start">
              <ul>
                <li>
                  <i className="fa fa-star"></i>
                </li>
                <li>
                  <div className="usdt-txt">USDT</div>
                </li>
                <li>
                  <div className="btc">BTC</div>
                </li>
              </ul>
              <div className="start-table scrollbar mt-0">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Pair </th>
                      <th scope="col">Price </th>
                      <th scope="col">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-text">
                          <i className="fa fa-star"></i>
                          <span>BTC/USDT</span>
                        </div>
                      </td>
                      <td>0.143</td>
                      <td>
                        <div className="change"> 1.27%</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
