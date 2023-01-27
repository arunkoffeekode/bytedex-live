import React, { useEffect, useState } from "react";
import "./Model.css";
import "./BankModel.css";
import { authenticatedInstance } from "../utils/api";
import { apis } from "../apis.constants";
import Swal from "sweetalert2";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../utils/v2/toasts";

export default function Authenticator({ onSuccess }) {
  const { t } = useTranslation();

  const [QRCodeImage, setQRCodeImage] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [authenticatorCode, setAuthenticatorCode] = useState("");
  const [copytext, setCopyText] = useState(false);
  // const [TwoFAVerify, setTwoFAVerify] = useState();

  async function GAuth_Enable_Request() {
    try {
      const res = await authenticatedInstance({
        url: apis.GAuth,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        // dispatch(setUserProfile(res.data?.data));
        setQRCodeImage(res.data.data?.qR_Code);
        setPairingCode(res.data.data?.pairingCode);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const CopyTextFieldValue = () => {
    let copyText = document.getElementById("VerifyCode");

    if (navigator.clipboard.writeText(copyText.value)) {
      setCopyText(true);
      setTimeout(() => {
        setCopyText(false);
      }, 1500);
    }
  };

  async function GAuth_Check_Status() {
    try {
      const res = await authenticatedInstance({
        url: apis.Check2FA_isEnabled,
        method: "GET",
      });

      if (res.data?.data) {
        // dispatch(setUserProfile(res.data?.data));
        // setTwoFAVerify(res.data?.data);
      } else {
        GAuth_Enable_Request();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Enable2FA() {
    try {
      const res = await authenticatedInstance({
        url: apis.Enable2FA,
        method: "POST",
        data: { GAuth_Code: authenticatorCode },
      });

      if (res.data?.status === "Success") {
        onSuccess();
        const closeModalButton = document.getElementById("closeModal");
        closeModalButton.click();
        successToast(t(`messages.${res.data.message}`));
      } else {
        errorToast(t(`messages.${res.data.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GAuth_Check_Status();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
          {/* Modal  */}
          <div
            className="modal fade"
            id="enableAuthenticatorModal"
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
                    {t("account.security.twoFactorDisabled")}
                  </h5>
                  <button
                    type="button"
                    className="close btn"
                    id="closeModal"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h6>
                    {t("account.security.boxHeading", {
                      exchangeName: "Byte Exchange",
                    })}
                  </h6>
                  <p>
                    {/* {t("account.security.boxParagraphFirst", {
                      exchangeName: "Byte Exchange",
                    })} */}
                    <Trans
                      i18nKey={"account.security.boxParagraphFirst"}
                      values={{ exchangeName: "Byte Exchange" }}
                    >
                      <Link to={t("multiFactorAuth.download")}>
                        Google Authenticator
                      </Link>
                    </Trans>
                  </p>
                  <p>
                    {t("account.security.boxParagraphSecond", {
                      exchangeName: "Byte Exchange",
                    })}
                  </p>
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-12 mb-3">
                        <div className="d-flex justify-content-center mb-3 ">
                          <img src={QRCodeImage} className="border" />
                        </div>
                        <label for="inputName" style={{ fontSize: "18px" }}>
                          {t("account.security.secretKey")}
                        </label>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "normal",
                            color: "color: #181A20;",
                          }}
                        ></p>
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control frm"
                            id="VerifyCode"
                            aria-label="Email Verification Code"
                            aria-describedby="basic-addon2"
                            value={pairingCode}
                          />
                          <div class="input-group-append">
                            <button
                              onClick={() => CopyTextFieldValue()}
                              type="button"
                              className={copytext ? "apng" : "apnd"}
                            >
                              {t("buttons.copy")}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-12 mb-3">
                        <input
                          type="number"
                          maxLength={6}
                          value={authenticatorCode}
                          class="form-control text-center"
                          id="inputemail"
                          placeholder="Input your 6 digit authenticator code "
                          onChange={(e) => setAuthenticatorCode(e.target.value)}
                        />
                      </div>
                      <div class="form-group col-md-12 mb-0">
                        <button
                          type="button"
                          className="forgot-btn"
                          onClick={() => Enable2FA()}
                        >
                          {t("buttons.enable2FA")}
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
