import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Link, useLocation } from "react-router-dom";
import { links, routes } from "../routes.constants";
import { matchRoute } from "../utils/v2/routeMatch";

export default function WalletPageNavigation() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="open-order pb-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            <div className="open-button">
              <ul>
                <li>
                  <Link
                    to={links.wallet}
                    className={
                      matchRoute(location.pathname, links.wallet)
                        ? "active"
                        : "open-btn"
                    }
                  >
                    {t("wallet.overview.link")}
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={links.deposits}
                    className={
                      matchRoute(location.pathname, links.deposits)
                        ? "active"
                        : "open-btn"
                    }
                  >
                    {t("wallet.deposits.link")}
                  </NavLink>
                </li>
                <li>
                  <Link
                    to={links.withdrawals}
                    className={
                      matchRoute(location.pathname, links.withdrawals)
                        ? "active"
                        : "open-btn"
                    }
                  >
                    {t("wallet.withdrawals.link")}{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={links.addressBook}
                    className={
                      matchRoute(location.pathname, links.addressBook)
                        ? "active"
                        : "open-btn"
                    }
                  >
                    {t("wallet.addressBook.link")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={links.banks}
                    className={
                      matchRoute(location.pathname, links.banks)
                        ? "active"
                        : "open-btn"
                    }
                  >
                    {t("wallet.banks.link")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
