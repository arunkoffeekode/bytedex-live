import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authenticatedInstance } from "../utils/api";
import { apis } from "../apis.constants";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthorized } from "../store/authSlice";
import { links } from "../routes.constants";
import { selectProfile } from "../store/userSlice";
import { useTranslation } from "react-i18next";

function TopHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authed = useSelector(selectAuthorized);
  const profile = useSelector(selectProfile);

  const { t, i18n } = useTranslation();

  const [notification, setNotifications] = useState([]);

  async function GetAllNotificationsData() {
    try {
      const res = await authenticatedInstance({
        url: apis.GetAllNotifications,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        // setNotiFications(res.data?.data)
        setNotifications([
          {
            Id: 2,
            CID: 563434,
            MessageTitle: "Price movement alert!",
            MessageBody:
              "<div>Dear Customer,<br><br>The price of XLM has moved more than 0.00% in the last 24 hours. The current price is USD 0.11.</b><br><br>Modulus Exchange Demo5</div>",
            AddedOn: "2022-07-04T13:15:15.277Z",
          },
        ]);
      } else {
        setNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // GetAllNotificationsData();
  }, []);

  return (
    <div>
      <section className="top-section">
        <div className="container-fluid" style={{maxWidth:'100%'}}>
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 col-xl-7">
              <div className="drp-section">
                <div className="logobrand">
                  <Link to="/">
                    <img src="/images/logo.png"></img>
                  </Link>
                </div>
                {/* <div className="d-flex">
                  <div className="dropdown">
                    <button
                      className="btn drp dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src="/images/avalance.png"></img> ethereum
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        <img src="/images/avalance.png"></img> ethereum
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src="/images/avalance.png"></img> ethereum
                      </a>
                      <a className="dropdown-item" href="#">
                        <img src="/images/avalance.png"></img> ethereum
                      </a>
                    </div>
                  </div>
                  <div className="token-details">ETH: $2,998.01</div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-xl-5">
              <div className="register">
                <div className="mobile-res">
                  <ul>
                    <li className="top-cart">
                      <Link to={links.notification} id="cart" className="crl">
                        <img src="/images/bell.png" alt="" />
                      </Link>
                    </li>
                    <li>
                      <button className="btn btn-mobile" data-toggle="collapse">
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </button>
                    </li>

                    {authed ? (
                      <li className="top-cart">
                        <Link to={links.account}>
                          <div className="circle">
                            <img
                              className="rounded-circle"
                              src="/images/bg.png"
                              alt=""
                            />
                          </div>
                        </Link>
                        <div className="account-dropdown">
                          <div className="avtar-section">
                            <p>
                              Hello,
                              <br />
                              <span className="text-wrap">
                                {profile?.firstName} {profile?.lastName}
                              </span>
                            </p>
                            {/* <div className="circle">
                              <img
                                className="rounded-circle"
                                src="/images/bg.png"
                                alt=""
                              />
                            </div> */}
                          </div>
                          <div className="login-details">
                            <ul>
                              <li>
                                <Link to={links.account}>
                                  <img
                                    src="/images/dashboard.png"
                                    alt=""
                                    className="lu"
                                  />
                                  Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link to={links.accountSecurity}>
                                  <img
                                    src="/images/security.png"
                                    alt=""
                                    className="lu"
                                  />
                                  Security
                                </Link>
                              </li>
                              <li>
                                <Link to={links.settings}>
                                  <img
                                    src="/images/setting-blue.png"
                                    alt=""
                                    className="lu"
                                  />
                                  Setting
                                </Link>
                              </li>
                              <li>
                                <div className="logout">
                                  <Link
                                    to={links.login}
                                    onClick={() => {
                                      dispatch(logout());
                                      navigate(links.login);
                                    }}
                                  >
                                    <img
                                      src="/images/logout.png"
                                      alt=""
                                      className="lu"
                                    />
                                    {t("navbar.links.logout")}
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <Link
                          type="button"
                          to={links.login}
                          className="btn btn-primary px-4 rounded-pill"
                        >
                          {t("navbar.links.login")}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="desk">
                  <ul>
                    {/* <li className="top-cart search">
                      <form id="formbase">
                        <label className="searchbox">
                          <input className="searchfield" type="search" />
                        </label>
                      </form>
                    </li> */}
                    <li className="top-cart">
                      <Link to={links.help} id="cart" className="crl">
                        <img src="/images/headphone.png" alt="" />
                      </Link>
                    </li>
                    <li className="top-cart">
                      <Link to={links.settings} id="cart" className="crl">
                        <img src="/images/setting.png" alt="" />
                      </Link>
                    </li>
                    <li className="top-cart">
                      <Link to={links.notification} id="cart" className="crl">
                        <img src="/images/bell.png" alt="" />
                      </Link>
                    </li>

                    {authed ? (
                      <li className="top-cart">
                        <a href="#">
                          <div className="circle">
                            <img
                              className="rounded-circle"
                              src="/images/bg.png"
                              alt=""
                            />
                          </div>
                        </a>
                        <div className="account-dropdown">
                          <div className="avtar-section">
                            <p>
                              Hello,
                              <br />
                              <span className="text-wrap">
                                {profile?.firstName} {profile?.lastName}
                              </span>
                            </p>
                            {/* <div className="circle">
                              <img
                                className="rounded-circle"
                                src="/images/bg.png"
                                alt=""
                              />
                            </div> */}
                          </div>
                          <div className="login-details">
                            <ul>
                              <li>
                                <Link to={links.account}>
                                  <img
                                    src="/images/dashboard.png"
                                    alt=""
                                    className="lu"
                                  />
                                  Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link to={links.accountSecurity}>
                                  <img
                                    src="/images/security.png"
                                    alt=""
                                    className="lu"
                                  />
                                  Security
                                </Link>
                              </li>
                              <li>
                                <Link to={links.settings}>
                                  <img
                                    src="/images/setting-blue.png"
                                    alt=""
                                    className="lu"
                                  />
                                  Setting
                                </Link>
                              </li>

                              <li>
                                <div className="logout">
                                  <Link
                                    to={links.login}
                                    onClick={() => {
                                      dispatch(logout());
                                      navigate(links.login);
                                    }}
                                  >
                                    <img
                                      src="/images/logout.png"
                                      alt=""
                                      className="lu"
                                    />
                                    {t("navbar.links.logout")}
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <Link
                          type="button"
                          to={links.login}
                          className="btn btn-primary px-4 rounded-pill"
                        >
                          {t("navbar.links.login")}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="collapse mobile-device" id="collapseExample">
                <ul>
                  <li className="top-cart search">
                    <form id="formbase">
                      <label className="searchbox">
                        <input className="searchfield" type="search" />
                      </label>
                    </form>
                  </li>
                  <li className="top-cart">
                    <a href="#" id="cart" className="crl">
                      <img src="/images/headphone.png" alt="" />
                    </a>
                  </li>
                  <li className="top-cart">
                    <a href="#" id="cart" className="crl">
                      <img src="/images/setting.png" alt="" />
                    </a>
                  </li>
                  <li className="top-cart">
                    <a href="#" id="cart" className="crl">
                      <img src="/images/light.png" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopHeader;
