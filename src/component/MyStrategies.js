import React from "react";

function MyStrategies() {
  return (
    <div>
      <div className="start-table mt-3">
        <table className="table">
          <thead>
            <tr style={{ borderRadius: "30px" }}>
              <th scope="col">Title </th>
              <th scope="col">Pair</th>
              <th scope="col">Description</th>
              <th scope="col">Profit</th>
              <th scope="col">Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <div className="no-record">
                  <img src="images/no-record.png"></img>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyStrategies;
