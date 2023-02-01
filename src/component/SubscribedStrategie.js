import React from "react";

function SubscribedStrategie() {
  return (
    <div>
      <div className="start-table mt-3">
        <table className="table">
          <thead>
            <tr style={{ borderRadius: "30px" }}>
              <th scope="col">Author </th>
              <th scope="col">Title</th>
              <th scope="col">Pair</th>
              <th scope="col">Description</th>
              <th scope="col">Profit</th>
              <th scope="col">Loss</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9}>
                <div className="no-record">
                  <img src="images/no-record.png"></img>
                  <p>No records found</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscribedStrategie;
