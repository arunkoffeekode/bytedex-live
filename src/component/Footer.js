import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "English", code: "en" },
  { label: "Türkçe", code: "tr" },
  { label: "عربى", code: "ar" },
];

function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <section className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xl-4">
              <div className="footer-logo">
                <img src="/images/logo.png" alt="" />
                <div className="byte-contact">+1 226 798 0000</div>
                <p> ©2022 bytedex.io</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-xl-2">
              <div className="footer-links-1">
                <div className="footer-title">
                  <h5>Company</h5>
                </div>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Partners</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-xl-2">
              <div className="footer-links-1">
                <div className="footer-title">
                  <h5>Product</h5>
                </div>
                <ul>
                  <li>
                    <a href="#">Spot</a>
                  </li>
                  <li>
                    <a href="#">API</a>
                  </li>
                  <li>
                    <a href="#">Trade</a>
                  </li>
                  <li>
                    <a href="#">Launchpad</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-xl-2">
              <div className="footer-links-1">
                <div className="footer-title">
                  <h5>Service</h5>
                </div>
                <ul>
                  <li>
                    <a href="#">Help Center </a>
                  </li>
                  <li>
                    <a href="#">Fees</a>
                  </li>
                  <li>
                    <a href="#">Security</a>
                  </li>
                  <li>
                    <a href="#">User Agreement </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-xl-2">
              <div className="footer-links-1">
                <div className="footer-title">
                  <h5>Support</h5>
                </div>
                <ul>
                  <li>
                    <a href="#">Apply to List</a>
                  </li>
                  <li>
                    <a href="#">Marketing Cooperation</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Official Verification</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="footer-address">
                <div className="address-title">
                  <h5>Social Media</h5>
                </div>
                <div className="socialfoot">
                  <ul>
                    <li>
                      <a target="_blank" href="#">
                        <i className="fa fa-facebook fb"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i className="fa fa-twitter yt"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i className="fa fa-instagram insta"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i className="fa fa-linkedin linked"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i className="fa fa-google yt"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="button-right">
                <form>
                  <select
                    name=""
                    id=""
                    // className="form-control"
                    defaultValue={getSelectedLanguage()}
                    onChange={(e) => {
                      i18n.changeLanguage(e.target.value);
                    }}
                  >
                    {languages.map((lng, key) => (
                      <option
                        key={key}
                        value={lng.code}
                        selected={lng.code === getSelectedLanguage()}
                      >
                        {lng.label}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="copy-right">
                <div className="text">
                  Copyright 2022 © Designs. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getSelectedLanguage() {
  const lsi18 = localStorage.getItem("i18nextLng");
  if (lsi18) return lsi18;

  return languages[0].code;
}

export default Footer;
