import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { links } from "../../routes.constants";
import { matchRoute } from "../../utils/v2/routeMatch";

export default function AccountNavigation() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div>
      <div className="open-order">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="open-button">
                <ul>
                  <li>
                    <Link
                      to={links.account}
                      className={
                        matchRoute(location.pathname, links.wallet)
                          ? "active"
                          : "open-btn"
                      }
                    >
                      {t("account.overview.link")}
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      to={links.accountVerification}
                      className="open-btn"
                    >
                      {t("account.verification.link")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={links.accountSecurity} className="open-btn">
                      {t("account.security.link")}
                    </NavLink>
                  </li>
                  <li>
                    <button
                      to={links.ipWhitelisting}
                      className="open-btn"
                      style={{ cursor: "not-allowed" }}
                    >
                      {t("account.ip-whitelisting.link")}
                    </button>
                  </li>
                  <li>
                    <NavLink
                      to={links.myReferrals}
                      className="open-btn"
                      // style={{ cursor: "not-allowed" }}
                    >
                      {t("account.affiliates.link")}
                    </NavLink>
                  </li>
                  <li>
                    <button
                      to={links.apiKeys}
                      className="open-btn"
                      style={{ cursor: "not-allowed" }}
                    >
                      {t("account.apiKeys.link")}
                    </button>
                  </li>
                  <li>
                    <NavLink
                      to={links.exchangeToken}
                      className="open-btn"
                      // style={{ cursor: "not-allowed" }}
                    >
                      {t("account.feeDiscount.link")}
                    </NavLink>
                  </li>
                  <li>
                    <button
                      to={links.volumeDiscount}
                      className="open-btn"
                      style={{ cursor: "not-allowed" }}
                    >
                      {t("account.tradingDiscount.link")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
