import React from "react";
import react, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.css";
import $ from "jquery";

function Navbar() {
  useEffect(() => {
    jQuery(document).ready(function ($) {
      jQuery(".stellarnav").stellarNav({
        theme: "light",
        breakpoint: 960,
        position: "right",
        phoneBtn: "+91 1234567890",
        locationBtn: "https://goo.gl/maps/wJRogWc3KhjHAuS27",
      });
    });
  }, []);

  return (
    <div>
      <div className="topbar-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="logo">
                <a href="index.html">
                  <img src="/images/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6">
              <div className="register">
                <ul>
                  <li className="top-cart">
                    <a href="#" id="cart" className="crl">
                      <img src="/images/bell.png" alt="" />
                    </a>
                  </li>
                  <li className="top-cart">
                    <a href="#" id="cart" className="crl">
                      <img src="/images/wallet.png" alt="" />
                    </a>
                  </li>

                  <li className="top-cart">
                    <a href="">
                      <div className="circle">
                        <img src="/images/profile.png" alt="" />
                      </div>
                    </a>
                    <div className="account-dropdown">
                      <div className="avtar-section">
                        <p>
                          Hello,
                          <br />
                          {/* <span>Fredi Allan</span> */}
                        </p>
                        <div className="circle">
                          <img src="/images/profile.png" alt="" />
                        </div>
                      </div>
                      <div className="login-details">
                        <ul>
                          <li>
                            <a href="#">
                              {" "}
                              <img
                                src="/images/profile-login.png"
                                alt=""
                                className="lu"
                              />{" "}
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img
                                src="/images/trip.png"
                                alt=""
                                className="lu"
                              />{" "}
                              My Trips
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              {" "}
                              <img
                                src="/images/customer-suport.png"
                                alt=""
                                className="lu"
                              />
                              Customer Suport
                            </a>
                          </li>

                          <li>
                            <div className="logout">
                              <a href="#" className="btn-logout">
                                Logout
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="logo-brand">
                <a href="index.html">
                  <img src="/images/logo.png" alt="" />
                </a>
              </div>
              <div className="stellarnav">
                <ul>
                  <li>
                    <a href="/marketTrend">Home </a>
                  </li>
                  <li>
                    <a href="/about">About Us </a>
                  </li>
                  <li>
                    <a href="/team">Our Team</a>
                  </li>
                  <li>
                    <a href="/character">private charters</a>
                  </li>
                  <li>
                    <a href="/joyrides">Joy Rides</a>
                  </li>
                  <li>
                    <a href="/scheduler">scheduler</a>
                  </li>
                  <li>
                    <a href="/contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
