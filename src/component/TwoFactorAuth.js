import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { apis } from "../apis.constants";
import { selectProfile } from "../store/userSlice";
import { authenticatedInstance } from "../utils/api";
import { errorToast, successToast } from "../utils/v2/toasts";
import "./Model.css";

function TwoFactorAuth({ onSuccess }) {
  const { t } = useTranslation();

  const [authenticatorCode, setAuthenticatorCode] = useState();

  async function Disable2FA() {
    try {
      const res = await authenticatedInstance({
        url: apis.Disable2FA,
        method: "POST",
        data: { GAuth_Code: authenticatorCode },
      });

      if (res.data?.status === "Success") {
        onSuccess();
        successToast(t(`messages.${res.data.message}`));
      } else {
        errorToast(t(`messages.${res.data.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
          <div
            className="modal fade"
            id="disableAuthenticatorModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {t("account.security.twoFactorText")}
                    {t("account.security.twoFactorEnabled")}
                  </h5>
                  <button
                    type="button"
                    className="close btn"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-12 mb-3">
                        <label for="inputName">
                          {/* Disable */}
                          {t("account.phoneVerification.disable")}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputGAuthCode"
                          placeholder={t(
                            "forms.enableGoogleAuth.authCode.placeholder"
                          )}
                          value={authenticatorCode}
                          onChange={(e) => setAuthenticatorCode(e.target.value)}
                        />
                      </div>
                      <div className="text-center mb-4"></div>
                      <div className="form-group col-md-12 mb-0">
                        <button
                          type="button"
                          className="forgot-btn"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => Disable2FA()}
                        >
                          {t("buttons.disable2FA")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoFactorAuth;
