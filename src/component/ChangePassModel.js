import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apis } from "../apis.constants";
import { selectProfile } from "../store/userSlice";
import { authenticatedInstance } from "../utils/api";

function ChangePassModel() {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);

  const [oldpass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [AuthCode, setAuthCode] = useState("");
  const [emailOTP, setEmailOTP] = useState("");

  async function PasswordChange() {
    try {
      const res = await authenticatedInstance({
        url: apis.ChangePassword,
        method: "POST",
        data: {
          oldPassword: oldpass,
          newPassword: newPass,
          otp: AuthCode || emailOTP,
        },
      });

      if (res.data?.status === "Success") {
        Swal.fire({
          title: "PassWord Change SucessFully",
          icon: "success",
          showConfirmButton: false,
          showCancelButton: false,
          position: "top-right",
          timer: 3000,
        });
      } else {
        // GAuth_Enable_Request();
      }
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      setAuthCode("");
      setEmailOTP("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
          {/* Modal  */}
          <div
            className="modal fade"
            id="exampleModalCenter1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {t("forms.changePassword.title")}
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
                      <div className="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("forms.changePassword.oldPassword.placeholder")}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputemail"
                          placeholder={t(
                            "forms.changePassword.oldPassword.placeholder"
                          )}
                          value={oldpass}
                          onChange={(e) => setOldPass(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("forms.changePassword.newPassword.placeholder")}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputemail"
                          placeholder={t(
                            "forms.changePassword.newPassword.placeholder"
                          )}
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t(
                            "forms.changePassword.newPasswordConfirm.placeholder"
                          )}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputemail"
                          placeholder={t(
                            "forms.changePassword.newPasswordConfirm.placeholder"
                          )}
                          value={confirmpass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: 15 }}>
                          {newPass === confirmpass
                            ? ""
                            : "Password Not Matched "}
                        </span>
                      </div>
                      {profile?.is2FAEnabled ? (
                        <div className="form-group col-md-12 mb-5">
                          <label for="inputName">
                            {t("forms.changePassword.otp.gAuthPlaceholder")}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputemail"
                            placeholder={t(
                              "forms.changePassword.otp.gAuthPlaceholder"
                            )}
                            value={AuthCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                          />
                        </div>
                      ) : (
                        <div className="form-group col-md-12 mb-5">
                          <label for="inputName">
                            {t("forms.changePassword.otp.emailPlaceholder")}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputemail"
                            placeholder={t(
                              "forms.changePassword.otp.emailPlaceholder"
                            )}
                            value={emailOTP}
                            onChange={(e) => {
                              setEmailOTP(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      <div className="form-group col-md-12 mb-0">
                        <button
                          type="button"
                          className="forgot-btn"
                          onClick={() =>
                            newPass === confirmpass ? PasswordChange() : ""
                          }
                        >
                          {t("buttons.submit")}
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

export default ChangePassModel;
