import QueryString from "qs";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import FiatDepositTable from "./FiatDepositTable";

export default function FiatDeposit({ currency }) {
  const { t } = useTranslation();
  const [fiatBanks, setFiatBanks] = useState([]);
  const [depositForm, setDepositForm] = useState({
    BankID: null,
    RequestAmount: "",
    TransactionID: "",
    Comments: "",
  });
  const [load, setLoad] = useState(null);
  const [depositsHistory, setDepositsHistory] = useState([]);

  useEffect(() => {
    getFiatBanks(currency.shortName);
    getListFiatManualDeposit(currency.shortName);
  }, [currency]);

  async function getFiatBanks(currency = "ALL") {
    try {
      const res = await authenticatedInstance({
        method: "GET",
        url: apis.fiatBanks + `/${currency}`,
      });

      if (res.data?.status === "Success") {
        setFiatBanks(res.data?.data);
      }
    } catch (error) {}
  }

  async function getListFiatManualDeposit(currency = "ALL") {
    setLoad(0);
    try {
      const res = await authenticatedInstance({
        method: "GET",
        url: apis.fiatManualDeposit,
        data: {
          currency,
        },
      });

      if (res.data?.status === "Success") {
        setDepositsHistory(res.data?.data);
        setLoad(1);
      } else {
        setLoad(-1);
      }
    } catch (error) {
      setLoad(-1);
    }
  }

  async function submitFiatManualDeposit() {
    try {
      const res = await authenticatedInstance({
        method: "POST",
        url: apis.addFiatDeposit,
        data: depositForm,
      });

      if (res.data?.status === "Success") {
        setDepositForm({
          BankID: null,
          RequestAmount: "",
          TransactionID: "",
          Comments: "",
        });
        successToast(res.data?.message);
        // successToast(t(`messages.${res.data?.message}`));

        getListFiatManualDeposit(currency.shortName);
      } else {
        errorToast(res.data?.data);
        // errorToast(t(`messages.${res.data.message}`));
      }
    } catch (error) {}
  }

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div>
              <h4>{t("forms.fiatDeposit.notice.title")}</h4>
              <hr />
              <p className="mb-4">{t("forms.fiatDeposit.notice.note")}</p>
              <h4>{t("wallet.deposits.bankDetails")}</h4>
              <hr />

              {fiatBanks?.map((bank, key) => (
                <div className="mb-4" key={key}>
                  <h5 className="fw-semibold">
                    {t("forms.fiatWithdrawalManual.bankName.placeholder")}
                  </h5>
                  <p className="mb-2">{bank.bankName}</p>
                  <h5 className="fw-semibold">
                    {t(
                      "forms.fiatWithdrawalManual.beneficiaryName.placeholder"
                    )}
                  </h5>
                  <p className="mb-2">{bank.beneficiaryName}</p>
                  <h5 className="fw-semibold">
                    {t("forms.fiatWithdrawalManual.accountNumber.placeholder")}
                  </h5>
                  <p className="mb-2">{bank.accountNumber}</p>
                  <h5 className="fw-semibold">
                    {t(
                      "forms.fiatWithdrawalManual.bankRoutingCode.placeholder"
                    )}
                  </h5>
                  <p className="mb-2">{bank.bankRoutingCode}</p>
                  <h5 className="fw-semibold">
                    {t("forms.fiatWithdrawalManual.swiftCode.placeholder")}
                  </h5>
                  <p className="mb-2">{bank.swiftCode}</p>
                  <h5 className="fw-semibold">
                    {t("wallet.deposits.bankLocation")}
                  </h5>
                  <p className="mb-2">
                    {bank.branchName}, {bank.branchCity}, {bank.branchProvince},{" "}
                    {bank.branchCountry}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h4>{t("wallet.deposits.formTitle")}</h4>
            <hr />
            <p className="mb-4">{t("forms.fiatDeposit.formNotice")}</p>
            <div>{/* <pre>{JSON.stringify(depositForm, null, 2)}</pre> */}</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitFiatManualDeposit();
              }}
            >
              <div>
                <div className="mb-4 form-group">
                  <label htmlFor="amount" className="form-label">
                    {t("forms.fiatDeposit.bankName.label")}
                  </label>
                  <select
                    id="bank"
                    className="form-control"
                    onChange={(e) => {
                      setDepositForm({
                        ...depositForm,
                        BankID: e.target.value,
                      });
                    }}
                  >
                    <option value="" selec>
                      {t("forms.fiatDepositPg.selectBank.label")}
                    </option>
                    {fiatBanks?.map((bank, key) => (
                      <option key={key} value={bank.id} selec>
                        {bank.bankName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="amount" className="form-label">
                    {t("forms.fiatDeposit.requestAmount.label")}
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    value={depositForm.RequestAmount}
                    onChange={(e) => {
                      setDepositForm({
                        ...depositForm,
                        RequestAmount: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="transactionId" className="form-label">
                    {t("forms.fiatDeposit.transactionId.label")}
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    className="form-control"
                    value={depositForm.TransactionID}
                    onChange={(e) => {
                      setDepositForm({
                        ...depositForm,
                        TransactionID: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4 form-group">
                  <label htmlFor="comment" className="form-label">
                    {t("forms.fiatDeposit.comments.label")}
                  </label>
                  <input
                    type="text"
                    id="comment"
                    className="form-control"
                    onChange={(e) => {
                      setDepositForm({
                        ...depositForm,
                        Comments: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* <div className="mb-4 form-group">
                  <label htmlFor="amount" className="form-label">
                    {t("forms.fiatDeposit.proof.label")}
                  </label>
                  <input type="file" id="amount" className="form-control" />
                </div> */}
                <div>
                  <button className="btn btn-primary" type="submit">
                    {t("buttons.submit")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FiatDepositTable
        deposits={depositsHistory}
        onCancel={() => {
          getListFiatManualDeposit(currency.shortName);
        }}
        load={load}
      />
    </div>
  );
}
