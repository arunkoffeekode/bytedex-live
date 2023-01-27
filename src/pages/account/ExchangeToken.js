import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectAuthorized } from "../../store/authSlice";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../../utils/v2/toasts";

function ExchangeToken() {
  // const authed = useSelector(selectAuthorized);
  const { t } = useTranslation();

  const [discounttiers, setDiscountTiers] = useState([]);
  const [enrollStatus, setEnrollStatus] = useState();

  async function GetDiscountTiers() {
    try {
      const res = await authenticatedInstance({
        url: apis.GetDiscountTiers,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setDiscountTiers(res.data?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function GetExchangeTokenDiscountEnrollmentStatus() {
    try {
      const res = await authenticatedInstance({
        url: apis.GetExchangeTokenDiscountEnrollmentStatus,
        method: "GET",
      });

      if (res.data?.data) {
        setEnrollStatus(res.data?.data);
      } else {
        setEnrollStatus(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function SetExchangeTokenDiscountEnrollment() {
    try {
      const res = await authenticatedInstance({
        url: apis.SetExchangeTokenDiscountEnrollment,
        method: "POST",
      });

      if (res.data?.status === "Success") {
        setEnrollStatus(true);
      } else {
        setEnrollStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Dis_Enroll_ExchangeTokenDiscount() {
    try {
      const res = await authenticatedInstance({
        url: apis.Dis_Enroll_ExchangeTokenDiscount,
        method: "POST",
      });

      if (res.data?.status === "Success") {
        setEnrollStatus(false);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetExchangeTokenDiscountEnrollmentStatus();
    GetDiscountTiers();
  }, [enrollStatus]);

  return (
    <div>
      <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("account.feeDiscount.title")}</h3>
              <ToastContainer />
            </div>
            <div className="col-lg-7 col-md-9 col-sm-12 col-xl-7 mt-4">
              <h3>
                {t("account.feeDiscount.payInToken", { exchangeToken: "BEXT" })}
              </h3>

              <div className="api-para">
                <p>
                  {t("account.feeDiscount.details", { exchangeToken: "BEXT" })}
                </p>
                <p>
                  {t("account.feeDiscount.discountDetails", {
                    exchangeToken: "BEXT",
                  })}
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-3 col-sm-12 col-xl-5 mb-3">
              <div className="right-searchbar">
                <label className="switch">
                  {enrollStatus ? (
                    <input
                      type="checkbox"
                      onClick={() => Dis_Enroll_ExchangeTokenDiscount()}
                      checked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onClick={() => SetExchangeTokenDiscountEnrollment()}
                    />
                  )}
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("tables.feeDiscount.tier")}</th>
                      <th scope="col">{t("tables.feeDiscount.holdings")}</th>
                      <th scope="col">{t("tables.feeDiscount.discount")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounttiers.map((item) => (
                      <tr scope="row">
                        <td scope="col">{item.tier} </td>
                        <td scope="col">{item.holding} BEXT</td>
                        <td scope="col">{item.discount}%</td>
                      </tr>
                    ))}
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

export default ExchangeToken;
