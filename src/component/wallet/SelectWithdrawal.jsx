import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { apis } from "../../apis.constants";
import { selectProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";
import AddAddress from "./AddAddress";
import "../BankModel.css";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { errorToast, successToast } from "../../utils/v2/toasts";

export default function SelectWithdrawal() {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [withdrawalCurrency, setWithdrawalCurrency] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [otps, setOTPs] = useState({
    gAuthCode: "",
    emailOTP: "",
    smsOTP: "",
  });

  const [state, setState] = useState({
    amount: "",
    currency: "",
    address: "",
  });

  const [tokens, setTokens] = useState({
    email: "",
    sms: "",
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

  // async function GetWithdrawalRequest(currency) {
  //   try {
  //     const res = await authenticatedInstance({
  //       url: apis.withdrawals,
  //       method: "POST",
  //       data: {
  //         currency,
  //       },
  //     });
  //   } catch (error) {}
  // }

  async function GetCurrencyBalanceRequest(currency) {
    try {
      const res = await authenticatedInstance({
        url: apis.walletBalance,
        method: "POST",
        data: {
          currency,
        },
      });

      if (res.data?.status === "Success") {
        setWithdrawalCurrency(res.data?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function GetAddressBookRequest(currency) {
    try {
      const res = await authenticatedInstance({
        url: apis.getAddressBooks,
        method: "POST",
        data: {
          Currency: currency,
        },
      });

      if (res.data?.status === "Success") {
        setAddresses(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function requestEmailOTP() {
    try {
      const data = {
        amount: state.amount,
        currency: state.currency,
        address: state.address,
        otp_type: "email",
      };

      const res = await authenticatedInstance({
        url: apis.requestWithdrawalOTP,
        method: "POST",
        data: data,
      });

      console.log("email OTP", res.data);

      if (res.data?.status === "Success") {
        setTokens({
          ...tokens,
          email: res.data?.data?.token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function requestSMSOTP() {
    try {
      const data = {
        amount: state.amount,
        currency: state.currency,
        address: state.address,
        otp_type: "sms",
      };

      const res = await authenticatedInstance({
        url: apis.requestWithdrawalOTP,
        method: "POST",
        data: data,
      });

      console.log(res.data);

      if (res.data?.status === "Success") {
        setTokens({
          ...tokens,
          sms: res.data?.data?.token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function SubmitWithdrawalRequest() {
    try {
      let url = apis.cryptoWithdraw;
      if (selectedCurrency?.walletType === "Fiat-Manual") {
        url = apis.fiatWithdraw;
      }

      const data = {
        currency: state.currency,
        amount: parseFloat(state.amount),
        address: state.address,
        addressTag: null,
        gauth_code: otps.gAuthCode,
        email_token: tokens.email,
        email_otp: otps.emailOTP,
        sms_token: tokens.sms,
        sms_otp: otps.smsOTP,
      };

      const res = await authenticatedInstance({
        url,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      errorToast("Something went wrong.");
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            <div className="bank-title">
              <h3>{t("wallet.withdrawals.link")}</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-xl-3 gtter">
            <div className="withdraw-left">
              <h6>
                {t("wallet.withdrawals.withdrawalLimitStatus")} 0 / 0.00001 BTC
              </h6>
              <div className="drp">
                <div className="dropdown">
                  <button
                    className="btn btn-drp dropdown-toggle"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                  >
                    {selectedCurrency?.shortName ?? "ALL"}
                  </button>
                  <div
                    className="dropdown-menu scrollable-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {currencies.map((c, key) => (
                      <button
                        className="dropdown-item"
                        key={key}
                        onClick={() => {
                          // GetWithdrawalRequest(c.shortName);
                          setSelectedCurrency(c);
                          setState({ ...state, currency: c.shortName });
                          GetCurrencyBalanceRequest(c.shortName);
                          GetAddressBookRequest(c.shortName);
                        }}
                      >
                        <img
                          src={`/images/cryptocurrency-icons/color/${c.shortName.toLowerCase()}.svg`}
                          alt={c.shortName.toLowerCase()}
                        />
                        {c.fullName} ({c.shortName})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* <pre>{JSON.stringify(withdrawalCurrency, null, 2)}</pre>
              <pre>{JSON.stringify(selectedCurrency, null, 2)}</pre> */}
              <ul>
                <li>
                  {t("wallet.withdrawals.totalBalance")}
                  {withdrawalCurrency?.balance} {withdrawalCurrency?.currency}
                </li>
                <li>
                  {t("wallet.withdrawals.inOrders")}{" "}
                  {withdrawalCurrency?.balanceInTrade}{" "}
                  {withdrawalCurrency?.currency}
                </li>
                <li>
                  {t("wallet.withdrawals.availableBalance")}{" "}
                  {withdrawalCurrency?.balance +
                    withdrawalCurrency?.balanceInTrade}{" "}
                  {withdrawalCurrency?.currency}
                </li>
              </ul>
              <div className="paraghrph">
                <p>{t("wallet.withdrawals.warning")}</p>
                <button type="button" className="bext-btn">
                  {t("wallet.withdrawals.fee")}{" "}
                  {selectedCurrency?.withdrawalServiceCharge}{" "}
                  {selectedCurrency?.shortName}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 col-xl-5 gtter">
            <AddAddress
              onSubmit={(values) => {
                console.log("address book value", values);
              }}
            />
            <div className="withdraw-right">
             
              <form>
                <div className="form-row">
                  <div className="form-group col-md-12 mb-4">
                    <div className="input-group ">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          // console.log(addresses);

                          const _selected = addresses?.find((a) => {
                            // console.log(a, e.target.value);
                            return a.ID.toString() === e.target.value;
                          });

                          // console.log(_selected);
                          setState({ ...state, address: _selected?.Address });
                          setSelectedAddress(_selected);
                        }}
                      >
                        <option value={null} selected>
                          Select Address
                        </option>
                        {addresses?.map((a, key) => (
                          <option value={a.ID} key={key}>
                            {a.Label}
                          </option>
                        ))}
                      </select>
                      <button
                        className="input-group-text"
                        id="basic-addon2"
                        type="button"
                        data-toggle="modal"
                        data-target="#addAddressModal"
                        // disabled
                        // style={{ opactity: 0.5, cursor: "not-allowed" }}
                      >
                        {t("wallet.addressBook.addAddress")}
                      </button>
                    </div>
                  </div>

                  <div className="form-group col-md-12 mb-4">
                    <label for="inputName">
                      {t("wallet.withdrawals.addressLabel")}
                    </label>
                    <input
                      type="text"
                      className="form-control radius"
                      placeholder={t("wallet.withdrawals.addressLabel")}
                      value={state?.address}
                      onChange={(e) => {
                        setState({ ...state, address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-12 mb-4">
                    <label for="inputName">
                      {t("wallet.withdrawals.amountLabel")}
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1450.00000000"
                        aria-describedby="basic-addon2"
                        value={state.amount}
                        onChange={(e) => {
                          setState({ ...state, amount: e.target.value });
                        }}
                      />
                      <button
                        type="button"
                        className="input-group-text"
                        id="basic-addon2"
                        disabled
                        style={{ cursor: "not-allowed" }}
                      >
                        {isNaN(
                          Math.floor(withdrawalCurrency?.balance)
                            ? ""
                            : Math.floor(withdrawalCurrency?.balance)
                        )}{" "}
                        {selectedCurrency?.shortName ?? "BEXT"}
                      </button>
                    </div>
                  </div>
                  {/* TODO: Hiding this for now later actual calculated value to be used */}
                  {/* <div className="form-group col-md-12">
                    <label for="inputName">USD Amount</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="11.45"
                        aria-describedby="basic-addon2"
                      />
                      <button
                        type="button"
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        21.48 USD
                      </button>
                    </div>
                  </div> */}
                  <div class="form-group col-md-12 mb-4">
                    <label for="inputName">
                      {t(
                        "forms.walletWithdrawal.emailandSMSVerificationCode.placeholder"
                      )}
                    </label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control frm"
                        placeholder={t(
                          "forms.walletWithdrawal.emailandSMSVerificationCode.placeholder"
                        )}
                        value={otps.emailOTP}
                        onChange={(e) =>
                          setOTPs({ ...otps, emailOTP: e.target.value })
                        }
                      />
                      {/* <div class="input-group-append input-group-text"> */}
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => {
                          requestEmailOTP();
                        }}
                      >
                        {t("wallet.addressBook.requestOtp")}
                      </button>
                      {/* </div> */}
                    </div>
                    <label for="inputName lowercase" style={{fontSize:'14px',fontWeight:'300',marginTop:'5px'}}>
                      {t("forms.walletWithdrawal.emailVerificationMsg", {
                        email: profile?.email,
                      })}
                    </label>
                  </div>
                  {profile?.isMobileVerified && (
                    <div class="form-group col-md-12 mb-4">
                      <label for="inputName">
                        {t(
                          "forms.walletWithdrawal.smsVerificationCode.placeholder"
                        )}
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control frm"
                          placeholder={t(
                            "forms.walletWithdrawal.smsVerificationCode.placeholder"
                          )}
                          value={otps.smsOTP}
                          onChange={(e) =>
                            setOTPs({ ...otps, smsOTP: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() => {
                            requestSMSOTP();
                          }}
                        >
                          {t("wallet.addressBook.requestOtp")}
                        </button>
                      </div>
                      <label for="inputName lowercase">
                        {t("forms.walletWithdrawal.smsVerificationMsg", {
                          mobileNumber: profile?.mobileNumber,
                        })}
                      </label>
                    </div>
                  )}

                  {profile?.is2FAEnabled && (
                    <div class="form-group col-md-12">
                      <label for="inputName">Authenticator Code</label>
                      <input
                        type="text"
                        className="form-control radius"
                        placeholder="Authenticator Code"
                        value={otps.gAuthCode}
                        onChange={(e) => {
                          setOTPs({ ...otps, gAuthCode: e.target.value });
                        }}
                      />
                    </div>
                  )}
                  {/* <pre>{JSON.stringify({ state, otps, tokens }, null, 2)}</pre> */}
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xl-4 gtter">
            <div className="bank-details">
              <div className="row">
                <div className="col-lg-9 col-md-8 col-xl-9 col-sm-12">
                  <div className="bank-name">
                    <ul>
                      {/* <li>Service Charge: 50 BEXT ~ 0.71 USD</li>
                      <li>You will Receive: 1,450 BEXT ~ 20.77 USD</li>
                      <li>Balance after withdrawal: 0 BEXT ~ 0 USD</li> */}
                      <li>
                        {t("wallet.withdrawals.serviceCharge")}:{" "}
                        {selectedCurrency?.withdrawalServiceCharge}{" "}
                        {selectedCurrency?.shortName}
                      </li>
                      <li>
                        {t("wallet.withdrawals.willReceive")} {state?.amount}{" "}
                        {selectedCurrency?.shortName}
                      </li>
                      <li>
                        {t("wallet.withdrawals.balanceAfter")}
                        {parseFloat(state?.amount) +
                          parseFloat(
                            selectedCurrency?.withdrawalServiceCharge
                          )}{" "}
                        {selectedCurrency?.shortName}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3">
                  <div className="bank-btn">
                    <button
                      type="button"
                      className="add-bank"
                      onClick={() => {
                        SubmitWithdrawalRequest();
                      }}
                    >
                      CONTINUE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
