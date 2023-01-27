import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { links } from "../../routes.constants";

export default function LoginToTrade() {
  const { t } = useTranslation();

  return (
    <div className="mb-1">
      {/* {t("forms.common.loginOrRegister", {
        0: "a",
        // 2: "a",
      })} */}
      <Trans i18nKey={"forms.common.loginOrRegister"}>
        <Link to={links.login}>Login</Link>or
        <Link to={links.signup}>Signup</Link> to vote.
      </Trans>
    </div>
  );
}
