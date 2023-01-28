import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { links } from "../routes.constants";
import { useSelector } from "react-redux";
import { selectAuthorized } from "../store/authSlice";
import { selectProfile } from "../store/userSlice";
import { useTranslation } from "react-i18next";

function Header() {
  const authed = useSelector(selectAuthorized);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div id="navbar_top" className="header-item-center">
        <nav className="navbar navbar-default navbar-trans navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarDefault"
              aria-controls="navbarDefault"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span> <span></span> <span></span>
            </button>

            {/* <a className="navbar-brand text-brand" href="#"></a> */}
            <div
              className="navbar-collapse collapse justify-content-left"
              id="navbarDefault"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link" href="#" title="Market">
                    {t("navbar.links.home")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={links.defaultTradeLink}
                    className="nav-link"
                    href="#"
                    title="Trade"
                  >
                    {t("navbar.links.trade")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={links.instantTrade}
                    className="nav-link"
                    href="#"
                    title="Trade"
                  >
                    {/* {t("navbar.links.instaTrade")} */}
                    Insta Trade
                  </Link>
                </li>
                <li className="nav-item">
                  {/* <Link
                    to={links.byteTraders}
                    className="nav-link"
                    href="#"
                    title="Byte Traders"
                  >
                    Byte Traders
                  </Link> */}
                </li>
              </ul>
            </div>
            <div
              className="navbar-collapse collapse justify-content-end"
              id="navbarDefault"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://stake.bytedex.io/"
                    title="Staking"
                  >
                    {t("navbar.links.stake")}
                  </a>
                </li>
                {authed && (
                  <li className="nav-item">
                    <Link
                      to={links.account}
                      className="nav-link"
                      href="#"
                      title="Account"
                    >
                      {t("navbar.links.account")}
                    </Link>
                  </li>
                )}
                {authed && (
                  <li className="nav-item">
                    <Link to={links.orders} className="nav-link" title="Orders">
                      {t("navbar.links.orders")}
                    </Link>
                  </li>
                )}
                {authed && (
                  <li className="nav-item">
                    <Link to={links.wallet} className="nav-link" title="Wallet">
                      {t("navbar.links.wallet")}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
