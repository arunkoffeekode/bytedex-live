import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { utils, writeFile } from "xlsx";
import { apis } from "../../apis.constants";
import SelectWithdrawal from "../../component/wallet/SelectWithdrawal";
import Pagination from "../../pagination/Pagination";
import { authenticatedInstance } from "../../utils/api";

function Withdrawals() {
  const { t } = useTranslation();
  const [withdrawals, setWithdrawals] = useState([]);

  //pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage] = useState(10);

  // Get current Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;

  const currentData = withdrawals.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    WalletWithdrawalsRequest();
  }, []);

  async function WalletWithdrawalsRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.withdrawals,
        method: "POST",
        data: {
          currency: "ALL",
        },
      });

      // console.log(res);
      // console.log(res.data);

      if (res.data?.status === "Success") {
        setWithdrawals(res.data?.data?.withdrawals);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnSearch = (string, results) => {
    if (string) {
      // GetDeposits(string.toUpperCase());
    } else {
      // WalletDepositsRequest();
    }
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
  //--------- Search-Bar-start------

  function exportToPdf() {
    try {
      const _withdrawals = withdrawals;
      _withdrawals.forEach((el) => {
        delete el.bankDetails;
        delete el.rejectReason;
        delete el.withdrawal_Fee;
        delete el.withdrawalConfirmDate;
      });

      const widths = _withdrawals.map(() =>
        parseInt(800 / _withdrawals.length)
      );

      const headerRow = Object.keys(_withdrawals[0]);
      const dataRows = _withdrawals.map((it) => {
        return Object.values(it);
      });

      const data = [headerRow, ...dataRows];

      pdfmake.vfs = pdfFonts.pdfMake.vfs;
      pdfmake
        .createPdf({
          pageOrientation: "landscape",
          content: [
            {
              table: {
                headerRows: 1,
                widths,
                body: data,
              },
            },
          ],
        })
        .download(`withdrawals.pdf`);
    } catch (error) {
      console.log(error);
    }
  }

  function exportToExcel(fileType) {
    try {
      const headerRow = Object.keys(withdrawals[0]);
      const dataRows = withdrawals.map((it) => {
        return Object.values(it);
      });

      dataRows.shift(1);
      const data = [headerRow, ...dataRows];

      const wb = utils.book_new();
      const sheet = utils.aoa_to_sheet(data);
      utils.book_append_sheet(wb, sheet);

      writeFile(wb, `withdrawals.${fileType}`, {
        bookType: fileType,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <SelectWithdrawal />

      <section className="security">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>{t("wallet.withdrawals.history")}</h3>
              <div className="right-searchbar wt">
                <div class="dropdown">
                  <button
                    type="button"
                    className="external-link"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button
                        onClick={() => exportToExcel("csv")}
                        class="dropdown-item"
                      >
                        <i class="fa fa-file-text-o" aria-hidden="true"></i>CSV
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => exportToPdf()}
                        class="dropdown-item"
                        href="#"
                      >
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>PDF
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => exportToExcel("xlsx")}
                        class="dropdown-item"
                        href="#"
                      >
                        <i class="fa fa-file-excel-o" aria-hidden="true"></i>{" "}
                        EXCEL
                      </button>
                    </li>
                  </ul>
                </div>
                {/* <ReactSearchAutocomplete
                  items={items}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  placeholder="Search"
                  formatResult={formatResult}
                /> */}
              </div>
            </div>
            {/* <pre>{JSON.stringify(withdrawals, null, 2)}</pre> */}

            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="start-table">
                <table className="table">
                  <thead>
                    <tr style={{ borderRadius: "30px" }}>
                      <th scope="col">
                        {t("tables.withdrawalHistory.withdrawalReqDate")}
                      </th>
                      <th scope="col">
                        {t("tables.withdrawalHistory.withdrawalAmount")}
                      </th>
                      <th scope="col">
                        {t("tables.withdrawalHistory.txnHash")}
                      </th>
                      <th scope="col">
                        {t("tables.withdrawalHistory.withdrawalStatus")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((w, key) => (
                      <tr key={key}>
                        <td>{w.withdrawalReqDate}</td>
                        <td>
                          {w.withdrawalAmount} {w.withdrawalType}
                        </td>
                        <td>{w.withdrawalAddress}</td>
                        <td>
                          <button type="button" className="delete">
                            {t("tables.withdrawalHistory.completed")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="pagination-list">
                  <Pagination
                    postsPerPage={DataPerPage}
                    totalPosts={withdrawals.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Withdrawals;
