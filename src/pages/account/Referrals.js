import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { successToast } from "../../utils/v2/toasts";
import ReferralJoinTable from "../../component/account/ReferralJoinTable";
import ReferralCommisionTable from "../../component/account/ReferralCommisionTable";

function Referrals() {
  const { t } = useTranslation();
  const [Affiliate_Summary, setAffiliate_Summary] = useState();
  const [copytext, setCopyText] = useState(false);

  async function Affiliate_SummaryData() {
    try {
      const res = await authenticatedInstance({
        url: apis.Affiliate_Summary,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setAffiliate_Summary(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const CopyTextFieldValue = (type) => {
    if (type === "link") {
      var getText = document.getElementById("ReferralLink");
      var copyText = getText.value;
    } else if (type === "code") {
      var copyText = document.getElementById("ReferralCode").innerHTML;
    }

    if (navigator.clipboard.writeText(copyText)) {
      setCopyText(true);
      successToast("Copied!");
      setTimeout(() => {
        setCopyText(false);
      }, 1500);
    }
  };

  useEffect(() => {
    Affiliate_SummaryData();
  }, []);

  return (
    <div>
      <section className="referral">
        <div className="container-fluid">
          <div className="row" style={{alignItems:'center'}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="referral-first">
                <h1>{t("account.affiliates.title")}</h1>
                <ToastContainer />

                <p>{t("account.affiliates.shareLink")}</p>
                <p>{t("account.affiliates.multipleTiers")}</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="referral-second">
                <img src="/images/referral.png"></img>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="referral-code">
                <div className="code">
                  <div className="code-name">
                    <p>{t("account.affiliates.referralCode")}: </p>
                    <div className="code-gen" id="ReferralCode">
                      {Affiliate_Summary?.referralID}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => CopyTextFieldValue("code")}
                  >
                    Copy
                  </button>
                </div>
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <div className="form-group col-md-12">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            aria-describedby="basic-addon2"
                            value={Affiliate_Summary?.referralLink}
                            id="ReferralLink"
                          />
                          <button
                            type="button"
                            className="input-group-text"
                            id="basic-addon2"
                            onClick={() => CopyTextFieldValue("link")}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="referral-box">
                <h4>{t("account.affiliates.tiers")}</h4>
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.rLevel1")}</h3>
                      <div className="free-share">
                        {t("account.affiliates.feeShare")}:{" "}
                        {Affiliate_Summary?.r_Level_1_Perc}%
                      </div>
                      <div className="referral-name">
                        {t("account.affiliates.referrals")}:{" "}
                        {Affiliate_Summary?.r_Level_1}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.rLevel2")}</h3>
                      <div className="free-share">
                        {t("account.affiliates.feeShare")}:{" "}
                        {Affiliate_Summary?.r_Level_2_Perc}%
                      </div>

                      <div className="referral-name">
                        {t("account.affiliates.referrals")}:{" "}
                        {Affiliate_Summary?.r_Level_2}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.rLevel3")}</h3>
                      <div className="free-share">
                        {t("account.affiliates.feeShare")}:{" "}
                        {Affiliate_Summary?.r_Level_3_Perc}%
                      </div>

                      <div className="referral-name">
                        {t("account.affiliates.referrals")}:{" "}
                        {Affiliate_Summary?.r_Level_3}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="referral-box pt-0 pb-0">
                <h4>{t("account.affiliates.earnings")}</h4>
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.allTime")}</h3>
                      <div className="free-share">~0 BTC</div>
                      <div className="referral-name">~$0.00</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.60d")}</h3>
                      <div className="free-share">~0 BTC</div>
                      <div className="referral-name">~$0.00</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.90d")}</h3>
                      <div className="free-share">~0 BTC</div>
                      <div className="referral-name">~$0.00</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3 col-6 gtter">
                    <div className="black-board">
                      <h3>{t("account.affiliates.120d")}</h3>
                      <div className="free-share">~0 BTC</div>
                      <div className="referral-name">~$0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReferralCommisionTable />
      <ReferralJoinTable />
    </div>
  );
}

export default Referrals;
