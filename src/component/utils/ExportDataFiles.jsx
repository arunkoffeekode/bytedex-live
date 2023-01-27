import React from "react";
import { utils, writeFile } from "xlsx";
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default function ExportDataFiles({ data, fileName }) {
  function exportToPdf() {
    const _data = data;

    // remove Columns
    // _data.forEach((el) => {
    //   delete el.bankDetails;
    //   delete el.rejectReason;
    //   delete el.withdrawal_Fee;
    //   delete el.withdrawalConfirmDate;
    // });
    console.log(_data);

    try {
      const widths = Object.keys(_data[0]).map(() => "auto");

      const headerRow = Object.keys(_data[0]);
      const dataRows = _data.map((it) => {
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
        .download(`${fileName}.pdf`);
    } catch (error) {
      console.log(error);
    }
  }

  function exportToExcel(fileType) {
    const headerRow = Object.keys(data[0]);
    const dataRows = data?.map((it) => {
      return Object.values(it);
    });

    try {
      dataRows.shift(1);
      const data = [headerRow, ...dataRows];

      const wb = utils.book_new();
      const sheet = utils.aoa_to_sheet(data);
      utils.book_append_sheet(wb, sheet);

      writeFile(wb, `${fileName}.${fileType}`, {
        bookType: fileType,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <button onClick={() => exportToExcel("csv")} class="dropdown-item">
            <i class="fa fa-file-text-o" aria-hidden="true"></i> CSV
          </button>
        </li>
        <li>
          <button onClick={() => exportToPdf()} class="dropdown-item" href="#">
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF
          </button>
        </li>
        <li>
          <button
            onClick={() => exportToExcel("xlsx")}
            class="dropdown-item"
            href="#"
          >
            <i class="fa fa-file-excel-o" aria-hidden="true"></i> EXCEL
          </button>
        </li>
      </ul>
    </div>
  );
}
