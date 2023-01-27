import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SharedStrategies from "../component/SharedStrategies";
import MyStrategies from "../component/MyStrategies";
import SubscribedStrategie from "../component/SubscribedStrategie";

function ByteTraders() {
  // --------- Search-Bar-start
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
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

  return (
    <div>
      <section className="security">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>Byte Traders</h3>
              <div className="right-searchbar">
                <ReactSearchAutocomplete
                  items={items}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  placeholder="Search by Coin Name  "
                  autoFocus
                  formatResult={formatResult}
                />
              </div>
            </div>
            <div className="bytetraders">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="market-tab12">
                      <ul
                        id="myTab1"
                        role="tablist"
                        className="nav nav-tabs nav-pills "
                      >
                        <li className="nav-item">
                          <a
                            id="description-tab"
                            data-toggle="tab"
                            href="#description"
                            role="tab"
                            aria-controls="description"
                            aria-selected="false"
                            className="nav-link active show"
                          >
                            Shared Strategies
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            id="review-tab"
                            data-toggle="tab"
                            href="#review"
                            role="tab"
                            aria-controls="review"
                            aria-selected="true"
                            className="nav-link"
                          >
                            My Strategies
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            id="fiat-tab"
                            data-toggle="tab"
                            href="#fiat"
                            role="tab"
                            aria-controls="fiat"
                            aria-selected="false"
                            className="nav-link"
                          >
                            Subscribed Strategies
                          </a>
                        </li>
                      </ul>
                      <div className="right-btn">
                        <button type="button" className="strategy">
                          Create Strategy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div id="myTab1Content" className="tab-content">
                <div
                  id="description"
                  role="tabpanel"
                  aria-labelledby="description-tab"
                  className="tab-pane fade active show"
                >
                  <SharedStrategies></SharedStrategies>
                </div>
                <div
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                  className="tab-pane fade"
                >
                  <MyStrategies></MyStrategies>
                </div>
                <div
                  id="fiat"
                  role="tabpanel"
                  aria-labelledby="fiat-tab"
                  className="tab-pane fade"
                >
                  <SubscribedStrategie></SubscribedStrategie>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ByteTraders;
