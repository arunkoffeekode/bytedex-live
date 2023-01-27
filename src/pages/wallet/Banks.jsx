import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast, ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import AddBank from "../../component/wallet/AddBank";
import { authenticatedInstance } from "../../utils/api";

export default function Banks() {
  const { t } = useTranslation();
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    GetBanksRequest();
  }, [banks]);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };

  async function GetBanksRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.getBanks,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        setBanks(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBankRequest(ID) {
    try {
      const data = {
        id: ID,
      };
      const res = await authenticatedInstance({
        url: apis.Delete_bank,
        method: "POST",
        data: data,
      });

      console.log(res.data);

      if (res.data?.status === "Success") {
        toast.success(`Bank Successfully Deleted!`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        GetBanksRequest();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
            <div className="bank-title">
              <h3>{t("wallet.banks.link")}</h3>
              {/* <p>{JSON.stringify(banks,null,2)}</p> */}
              <ToastContainer />
            </div>
            <AddBank />
            <div className="bank-details">
              <div className="bank-name">
                <p>{t("wallet.banks.description")}</p>
              </div>
              <div className="bank-btn">
                <button
                  type="button"
                  className="add-bank"
                  data-toggle="modal"
                  data-target="#addBankModal"
                >
                  {t("wallet.banks.addBanks")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="security">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("wallet.banks.bankAccounts")}</h3>
              {/* <pre>{JSON.stringify(banks, null, 2)}</pre> */}
              <div className="right-searchbar">
                <button type="button" className="external-link">
                  <i className="fa fa-external-link" aria-hidden="true"></i>
                </button>
                {/* <ReactSearchAutocomplete
                  items={items}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  placeholder="Search "
                  autoFocus
                  formatResult={formatResult}
                /> */}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">{t("wallet.banks.bankName")}</th>
                      <th scope="col">{t("wallet.banks.swiftCode")}</th>
                      <th scope="col">{t("wallet.banks.accountNumber")}</th>
                      <th scope="col">{t("wallet.banks.bankName")}</th>
                      <th scope="col">{t("wallet.banks.action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!banks?.length && (
                      <tr>
                        <td colSpan={9}>
                          <div className="no-record">
                            <img
                              src="/images/bank.png"
                              alt="bank"
                              style={{ width: "350px" }}
                            ></img>
                          </div>
                        </td>
                      </tr>
                    )}
                    {banks?.map((b, key) => (
                      <tr>
                        <td>{b.bankName}</td>
                        <td>{b.swiftCode}</td>
                        <td>{b.accountNumber}</td>
                        <td>{b.bankName}</td>
                        <td>
                          <button
                            onClick={() => deleteBankRequest(b.id)}
                            type="button"
                            className="delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
