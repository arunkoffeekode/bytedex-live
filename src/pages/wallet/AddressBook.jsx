import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast, ToastContainer } from "react-toastify";
import { apis } from "../../apis.constants";
import AddAddress from "../../component/wallet/AddAddress";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";

export default function AddressBook() {
  const { t } = useTranslation();

  const [address, setAddress] = useState([]);

  useEffect(() => {
    GetAddressBookRequest();
  }, []);

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

  async function GetAddressBookRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.getAddressBooks,
        method: "POST",
        data: {
          Currency: "ALL",
        },
      });

      if (res.data?.status === "Success") {
        setAddress(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Delete_AddressBook(ID, label) {
    try {
      const res = await authenticatedInstance({
        url: apis.Delete_AddressBook,
        method: "POST",
        data: {
          Label: label,
          ID: ID,
        },
      });

      if (res.data?.status === "Success") {
        GetAddressBookRequest();
        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
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
              <h3>{t("wallet.addressBook.link")}</h3>
              <ToastContainer />
            </div>
            <AddAddress />
            <div className="bank-details">
              <div className="row">
                <div className="col-lg-9 col-md-8 col-xl-9 col-sm-12">
                  <div className="bank-name">
                    <p>{t("wallet.addressBook.description")}</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3">
                  <div className="bank-btn">
                    <button
                      type="button"
                      className="add-bank"
                      data-toggle="modal"
                      data-target="#addAddressModal"
                    >
                      {t("wallet.addressBook.addAddress")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-9 col-md-8 col-xl-9 col-sm-12">
                  <div className="bank-name">
                    <p>{t("wallet.addressBook.whitelistDescription")}</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3">
                  <div className="bank-btn">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="security">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("wallet.addressBook.pluralAddresses")}</h3>
              {/* <pre>{JSON.stringify(address, null, 2)}</pre> */}
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
                      <th scope="col">{t("wallet.addressBook.label")}</th>
                      <th scope="col">{t("wallet.addressBook.currency")}</th>
                      <th scope="col">{t("wallet.addressBook.newAddress")}</th>
                      <th scope="col">{t("wallet.addressBook.tag")}</th>
                      <th scope="col">{t("wallet.addressBook.action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {address?.map((ad, key) => (
                      <tr key={key}>
                        <td>{ad.Label}</td>
                        <td>{ad.Currency}</td>
                        <td>{ad.Address}</td>
                        <td>{ad.DT_Memo}</td>
                        <td>
                          <button
                            onClick={() => Delete_AddressBook(ad.ID, ad.Label)}
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
