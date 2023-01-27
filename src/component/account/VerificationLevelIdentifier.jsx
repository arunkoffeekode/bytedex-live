import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectProfile } from "../../store/userSlice";
import { useAccountVerificationContext } from "./AccountVerificationContext";

export default function VerificationLevelIdentifier() {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);
  const { status, level } = useAccountVerificationContext();

  return (
    <div>
      <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
        <div className="verification-blue-box">
          {status === "Never Submitted" && (
            <div className="flt">
              <h4>{t("account.accountVerification.formTitle")}</h4>
            </div>
          )}
          {status === "Request Info" && (
            <div className="flt">
              <h4>{t("account.accountVerification.rejected")}</h4>
              <p className="mt-2 text-white">{profile?.kycRequestInfo}</p>
            </div>
          )}
          {status === "Pending" && (
            <div className="flt">
              <h4>{t("account.accountVerification.pending")}</h4>
            </div>
          )}
          {status === "Approved" && (
            <>
              <div className="flt">
                <h4>
                  {t("account.accountVerification.verificationMsg", {
                    level: level,
                  })}
                </h4>
              </div>
              <div className="rlt">
                <button type="button" className="level">
                  Level {level}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
