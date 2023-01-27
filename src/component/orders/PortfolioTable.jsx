import React from "react";

export default function PortfolioTable() {
  return (
    <div className="start-table mb-2">
      <table className="table">
        <thead>
          <tr style={{ borderRadius: "30px" }}></tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={9}>
              <div className="no-record">
                <img src="/images/no-record.png" alt="No Records Found"></img>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
