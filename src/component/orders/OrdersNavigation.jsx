import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import { links } from "../../routes.constants";
import { matchRoute } from "../../utils/v2/routeMatch";

export default function OrdersNavigation() {
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
                    <NavLink
                      to={links.openOrders}
                      className={
                        matchRoute(location.pathname, links.openOrders)
                          ? "active"
                          : "open-btn"
                      }
                    >
                      {t("orders.openOrders.link")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={links.ordersHistory}
                      className={
                        matchRoute(location.pathname, links.ordersHistory)
                          ? "active"
                          : "open-btn"
                      }
                    >
                      {t("orders.orderHistory.link")}
                    </NavLink>
                  </li>
                  <li>
                    <Link
                      to={links.tradeHistory}
                      className={
                        matchRoute(location.pathname, links.tradeHistory)
                          ? "active"
                          : "open-btn"
                      }
                    >
                      {t("orders.tradeHistory.link")}
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to={links.instaTrade}
                      className={
                        matchRoute(location.pathname, links.instaTrade)
                          ? "active"
                          : "open-btn"
                      }
                    >
                      {t("wallet.instaTrade.link")}
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
