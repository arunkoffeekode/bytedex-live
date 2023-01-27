import React from "react";
import { useTranslation } from "react-i18next";
import { useAccountVerificationContext } from "./AccountVerificationContext";
import VerificationLevel1 from "./VerificationLevel1";
import VerificationLevel2 from "./VerificationLevel2";
import VerificationLevel3 from "./VerificationLevel3";

export default function AccountVerificationContainer() {
  const { t } = useTranslation();
  const { status, level } = useAccountVerificationContext();

  return (
    <div>
      {status === "Pending" && (
        <div>{t("account.accountVerification.pending")}</div>
      )}
      {status !== "Pending" && (
        <div>
          {level === 0 && <VerificationLevel1 />}
          {level === 1 && <VerificationLevel2 />}
          {level === 2 && <VerificationLevel3 />}
        </div>
      )}
      {status === "Approved" && (
        <div>{level === 3 && <div>Verification Completed</div>}</div>
      )}
    </div>
  );
}
