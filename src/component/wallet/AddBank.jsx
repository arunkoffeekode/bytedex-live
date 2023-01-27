import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import { selectProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";
import "../BankModel.css";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../../utils/v2/toasts";

export default function AddBank() {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);

  const [tokens, setTokens] = useState({
    sms: "",
    email: "",
  });

  async function requestEmailOTP(values) {
    try {
      const data = {
        BankName: values.bank,
        AccountCurrency: values.currency,
        AccountNumber: values.acNumber,
        type: "email",
      };
      const res = await authenticatedInstance({
        url: apis.requestAddBankOTP,
        method: "POST",
        data: data,
      });

      console.log("email OTP", res.data);

      if (res.data?.status === "Success") {
        setTokens({
          ...tokens,
          email: res.data?.data?.temp_token,
        });

        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function requestSMSOTP(values) {
    try {
      const data = {
        BankName: values.bank,
        AccountCurrency: values.currency,
        AccountNumber: values.acNumber,
        type: "sms",
      };
      const res = await authenticatedInstance({
        url: apis.requestAddBankOTP,
        method: "POST",
        data: data,
      });

      console.log(res.data);

      if (res.data?.status === "Success") {
        setTokens({
          ...tokens,
          sms: res.data?.data?.temp_token,
        });
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function SubmitAddBankRequest(values) {
    try {
      const data = {
        BankName: values.bank,
        AccountCurrency: values.currency,
        AccountType: values.type,
        AccountNumber: values.acNumber,
        BankRoutingCode: values.routingCode,
        SwiftCode: values.swiftCode,
        gauth_code: values?.gAuthCode ?? "",
        smsotp: values?.smsOTP ?? "",
        smstoken: tokens.sms ?? "",
        emailotp: values?.emailOTP ?? "",
        emailtoken: tokens.email ?? "",
      };

      console.log(data);
      const res = await authenticatedInstance({
        url: apis.addBank,
        method: "POST",
        data: data,
      });

      console.log(res.data);
      if (res.data.status === "Success") {
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {}
  }

  return (
    <div>
      <ToastContainer />
      <div
        class="modal fade"
        id="addBankModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addBankModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBankModalTitle">
                {t("wallet.banks.link")}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  SubmitAddBankRequest(values);
                }}
                validateOnBlur={false}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  dirty,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form>
                    <div class="form-row">
                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("wallet.banks.accountCurrency")}
                        </label>
                        <Field
                          name="currency"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select Currency</option>
                          {currencies.map((cur, key) => (
                            <option key={key} value={cur.code}>
                              {cur.label}({cur.code})
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger">
                          <ErrorMessage name="currency" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("wallet.banks.accountType")}
                        </label>
                        <Field name="type" as="select" className="form-control">
                          <option value="">Select Account Type</option>
                          <option value="Savings">Saving</option>
                          <option value="Credit">Credit</option>
                        </Field>
                        <div className="text-danger">
                          <ErrorMessage name="type" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("wallet.banks.accountNumber")}
                        </label>
                        <Field name="acNumber" class="form-control" />
                        <div className="text-danger">
                          <ErrorMessage name="acNumber" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("wallet.banks.bankName")}
                        </label>
                        <Field name="bank" class="form-control" />
                        <div className="text-danger">
                          <ErrorMessage name="bank" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("wallet.banks.bankRoutingCode")}
                        </label>
                        <Field name="routingCode" class="form-control" />
                        <div className="text-danger">
                          <ErrorMessage name="routingCode" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t("wallet.banks.swiftCode")}
                        </label>
                        <Field name="swiftCode" class="form-control" />
                        <div className="text-danger">
                          <ErrorMessage name="swiftCode" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t(
                            "forms.fiatWithdrawalManual.emailandSMSVerificationCode.placeholder"
                          )}
                        </label>
                        <div class="input-group">
                          <Field
                            class="form-control frm"
                            name="emailOTP"
                            placeholder={t(
                              "forms.fiatWithdrawalManual.emailandSMSVerificationCode.placeholder"
                            )}
                          />
                          <div class="input-group-append">
                            <button
                              type="button"
                              className="apnd"
                              onClick={() => {
                                requestEmailOTP(values);
                              }}
                            >
                              {t("wallet.banks.requestOtp")}
                            </button>
                          </div>
                        </div>
                        <label for="inputName">
                          {t(
                            "forms.fiatWithdrawalManual.emailVerificationMsg",
                            { email: profile?.email }
                          )}
                        </label>
                        <div className="text-danger">
                          <ErrorMessage name="emailOTP" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-5">
                        <label for="inputName">
                          {t(
                            "forms.fiatWithdrawalManual.smsVerificationCode.placeholder"
                          )}
                        </label>
                        <div class="input-group">
                          <Field class="form-control frm" name="smsOTP" />
                          <div class="input-group-append">
                            <button
                              type="button"
                              className="apnd"
                              placeholder={t(
                                "forms.fiatWithdrawalManual.smsVerificationCode.placeholder"
                              )}
                              onClick={() => {
                                requestSMSOTP(values);
                              }}
                            >
                              {t("wallet.banks.requestOtp")}
                            </button>
                          </div>
                        </div>
                        <label for="inputName">
                          {t("forms.fiatWithdrawalManual.smsVerificationMsg", {
                            mobileNumber: profile?.mobileNumber,
                          })}
                        </label>
                        <div className="text-danger">
                          <ErrorMessage name="smsOTP" />
                        </div>
                      </div>

                      {profile?.is2FAEnabled && (
                        <div class="form-group col-md-12">
                          <label for="inputName">Authenticator Code</label>
                          <Field name="gAuthCode" class="form-control" />
                          <div className="text-danger">
                            <ErrorMessage name="gAuthCode" />
                          </div>
                        </div>
                      )}

                      {/* <pre>
                        {JSON.stringify({ tokens, values, errors }, null, 2)}
                      </pre> */}
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mt-4">
                        <div className="submit-btn">
                          <button type="submit" className="submit">
                            {t("buttons.submit")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const initialValues = {
  currency: "",
  type: "",
  acNumber: "",
  bank: "",
  routingCode: genRoutingCode(),
  swiftCode: genSwiftCode(),
  emailOTP: "",
  smsOTP: "",
};

const validationSchema = yup.object({
  currency: yup.string().required("Currency is Required"),
  type: yup.string().required("Bank Type is Required"),
  acNumber: yup
    .string()
    .required("Account Number is Required")
    .min(8, "Account Number must be of minimum 8 characters")
    .max(16, "Account Number must be of maximum 16 characters"),
  bank: yup
    .string()
    .required("Bank Number is Required")
    .min(8, "Bank must be of minimum 8 characters")
    .max(32, "Bank Name must be of maximum 32 characters"),
  routingCode: yup
    .string()
    .required("Routing Code is Required")
    .min(9, "Routing Code must be minimum of 9 characters")
    .max(12, "Routing Code must be maximum of 12 characters"),
  swiftCode: yup
    .string()
    .required("Swift Code is Required")
    .min(9, "Swift Code must be minimum of 9 characters")
    .max(12, "Swift Code must be maximum of 12 characters"),
  emailOTP: yup
    .string()
    .required("Email OTP is Required.")
    .matches(/^\d+$/, "OTP is only Numeric characters.")
    .length(6, "OTP has to be Exact 6 characters."),
  smsOTP: yup
    .string()
    .required("SMS OTP is Required.")
    .matches(/^\d+$/, "OTP is only Numeric characters.")
    .length(6, "OTP has to be Exact 6 characters."),
  gAuthCode: yup
    .string()
    .matches(/^\d+$/, "Authenticator code is only of Numeric characters.")
    .length(6, "Authenticator code has to be Exact 6 characters."),
});

const currencies = [
  { label: "Btyedex Rezerve", code: "BRZV" },
  { label: "Euro", code: "EUR" },
  { label: "Metaverse Synthetic", code: "MULTI" },
  { label: "Russian Ruble", code: "RUB" },
  { label: "Turkish Lira", code: "TRY" },
  { label: "US Doller", code: "USD" },
];

function genRoutingCode() {
  return (Math.random() * 1000000000).toString().split(".")[0];
}

function genSwiftCode() {
  const wPool = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let swiftCode = "";
  for (let i = 0; i < 7; i++) {
    swiftCode += wPool[Math.floor(Math.random() * wPool.length)];
  }
  swiftCode += (Math.random() * 1000).toString().split(".")[0];
  return swiftCode;
}
