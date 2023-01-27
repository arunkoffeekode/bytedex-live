import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";
import * as yup from "yup";
import "../BankModel.css";
import { error } from "jquery";
import { apis } from "../../apis.constants";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../../utils/v2/toasts";

export default function AddAddress({ onSubmit = () => {} }) {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);

  const [currencies, setCurrencies] = useState([]);

  const [tokens, setTokens] = useState({
    sms: "",
    email: "",
  });

  useEffect(() => {
    GetCurrencyRequest();
  }, []);

  async function GetCurrencyRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.getCurrencies,
        method: "GET",
      });

      setCurrencies(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function requestEmailOTP(values) {
    try {
      const data = {
        BankName: values.bank,
        AccountCurrency: values.currency,
        AccountNumber: values.acNumber,
        type: "email",
      };
      const res = await authenticatedInstance({
        url: apis.requestAddressBookOTP,
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
        url: apis.requestAddressBookOTP,
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

  async function SubmitAddAddressRequest(values) {
    try {
      const data = {
        Currency: values.currency,
        Label: values.label,
        Address: values.address,
        gauth_code: values.gAuthCode,
        smsotp: values?.smsOTP ?? "",
        smstoken: tokens.sms ?? "",
        emailotp: values?.emailOTP ?? "",
        emailtoken: tokens.email ?? "",
        // DT_Memo: "12345",
      };
      console.log(data);
      const res = await authenticatedInstance({
        url: apis.addAddressBook,
        method: "POST",
        data: data,
      });

      onSubmit(data);
      console.log(res.data);
      if (res.data.status === "Success") {
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = yup.object({
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
    currency: yup.string().required("Currency Required"),
    address: yup
      .string()
      .required("Address is Required")
      .min(16, "Address must be of minimum of 16 characters")
      .max(64, "Address must be of maximum 64 characters"),
    label: yup
      .string()
      .required("Label is Required")
      .min(4, "Label must be of minimum 4 characters")
      .max(64, "Label must be of maximum 64 characters"),
  });

  return (
    <div>
      <ToastContainer />
      <div
        class="modal fade"
        id="addAddressModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addAddressModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addAddressModal">
                Add Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  currency: "",
                  label: "",
                  address: "",
                  emailOTP: "",
                  smsOTP: "",
                  gAuthCode: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  SubmitAddAddressRequest(values);
                }}
                validationSchema={validationSchema}
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
                  <Form onSubmit={handleSubmit}>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="inputName"> Currency</label>
                        <Field
                          name="currency"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select Currency</option>
                          {currencies.map((cur, key) => (
                            <option key={key} value={cur.shortName}>
                              {cur.fullName}({cur.shortName})
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger">
                          <ErrorMessage name="currency" />
                        </div>
                      </div>

                      <div class="form-group col-md-12">
                        <label for="inputName">Label</label>
                        <Field name="label" class="form-control" />
                        <div className="text-danger">
                          <ErrorMessage name="label" />
                        </div>
                      </div>

                      <div class="form-group col-md-12">
                        <label for="inputName">Address</label>
                        <Field name="address" class="form-control" />
                        <div className="text-danger">
                          <ErrorMessage name="address" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-4">
                        <label for="inputName">
                          {t(
                            "forms.walletWithdrawal.emailandSMSVerificationCode.placeholder"
                          )}
                        </label>
                        <div class="input-group">
                          <Field
                            class="form-control frm"
                            name="emailOTP"
                            placeholder={t(
                              "forms.walletWithdrawal.emailandSMSVerificationCode.placeholder"
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
                              {t("wallet.addressBook.requestOtp")}
                            </button>
                          </div>
                        </div>
                        <label for="inputName">
                          {t("forms.walletWithdrawal.emailVerificationMsg", {
                            email: profile?.email,
                          })}
                        </label>
                        <div className="text-danger">
                          <ErrorMessage name="emailOTP" />
                        </div>
                      </div>

                      <div class="form-group col-md-12 mb-5">
                        <label for="inputName">
                          {t(
                            "forms.walletWithdrawal.smsVerificationCode.placeholder"
                          )}
                        </label>
                        <div class="input-group">
                          <Field
                            class="form-control frm"
                            name="smsOTP"
                            placeholder={t(
                              "forms.walletWithdrawal.smsVerificationCode.placeholder"
                            )}
                          />
                          <div class="input-group-append">
                            <button
                              type="button"
                              className="apnd"
                              onClick={() => {
                                requestSMSOTP(values);
                              }}
                            >
                              {t("wallet.addressBook.requestOtp")}
                            </button>
                          </div>
                        </div>
                        <label for="inputName">
                          {t("forms.walletWithdrawal.smsVerificationMsg", {
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

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mt-4">
                        <div className="submit-btn">
                          <button type="submit" className="submit">
                            {t("buttons.submit")}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <pre>{JSON.stringify({ values, errors }, null, 2)}</pre> */}
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
