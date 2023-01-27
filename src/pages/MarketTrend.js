import React from "react";
import BannerSlider from "../component/market/BannerSlider";
import CardCarousel from "../component/market/CardCarousel";
import MarketList from "../component/market/MarketList";

function MarketTrend() {
  // const navigate = useNavigate();
  // const market = useSelector(selectMarket);
  // const settings = useSelector(selectSettings);
  // const dispatch = useDispatch();

  // const [filter, setFilter] = useState("USDT");
  // const [filteredMarketData, setFilteredMarketData] = useState([]);
  // const [search, setSearch] = useState("");
  // const [sortKey, setSortKey] = useState("base_volume");

  // useEffect(() => {
  //   socket.subscribe("MK");
  // }, []);

  // useEffect(() => {
  //   let _f = [],
  //     _m = [];

  //   if (settings?.market_groups?.length) {
  //     _m = settings?.market_groups[0]?.markets ?? [];
  //   }

  //   switch (filter) {
  //     case "USDT":
  //       _f = market?.filter(
  //         (el) =>
  //           // el.base === filter || !_m.includes(el.quote)
  //           el.quote === filter
  //       );
  //       break;

  //     case "BTC":
  //       _f = market?.filter(
  //         (el) => el.quote === filter
  //         // el.quote === filter || el.base === filter || !_m.includes(el.quote)
  //       );
  //       break;

  //     case "FIAT":
  //       _f = market?.filter(
  //         (el) => _m.includes(el.quote) || _m.includes(el.base)
  //       );
  //       break;

  //     default:
  //       break;
  //   }

  //   if (search) {
  //     const searched = market.filter(
  //       (el) => el.quote === search || el.base === search
  //     );
  //     _f = sortArrayByKey(searched, sortKey, true);
  //   }

  //   _f = sortArrayByKey(_f, sortKey, true);
  //   setFilteredMarketData(_f);
  // }, [market, filter, search, sortKey, settings?.market_groups]);

  // const handleOnSearch = (string, results) => {
  //   string = string.toUpperCase();
  //   setSearch(string);
  //   const _f = market.filter((el) => el.quote === string || el.base === string);
  //   setFilteredMarketData(_f);
  // };

  // const handleOnHover = (result) => {
  //   console.log(result);
  // };

  // const handleOnSelect = (item) => {
  //   console.log(item);
  // };

  // const handleOnFocus = () => {
  //   console.log("Focused");
  // };

  // const formatResult = (item) => {
  //   console.log(item);

  //   return (
  //     <div>
  //       <span style={{ display: "block", textAlign: "left" }}>
  //         {item.base}/{item.quote}
  //       </span>
  //     </div>
  //   );
  // };

  return (
    <div>
      <BannerSlider />
      <div style={{ minHeight: "40px" }}>
        <CardCarousel />
      </div>
      <MarketList />
      {/* <section className="security pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <h3>Market Trend</h3>
              <div className="right-searchbar">
                <ReactSearchAutocomplete
                  items={market}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  placeholder="Search by Coin Name "
                  formatResult={formatResult}
                />
              </div>
            </div>
            <div className="market-trade">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="market-tab">
                      <ul
                        id="myTab1"
                        role="tablist"
                        className="nav nav-tabs nav-pills "
                      >
                        {["USDT", "BTC", "FIAT"].map((el, key) => (
                          <li className="nav-item" key={key}>
                            <a
                              id="description-tab"
                              data-toggle="tab"
                              href="#description"
                              role="tab"
                              aria-controls="description"
                              aria-selected="false"
                              className={
                                " nav-link border " +
                                (el === filter ? " active " : "")
                              }
                              onClick={() => {
                                setFilter(el);
                              }}
                            >
                              {el}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div id="myTab1Content" className="tab-content">
                <div
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                  className="tab-pane fade active show"
                >
                  <div
                    className="start-table"
                    style={{ boxShadow: "none", background: "transparent" }}
                  >
                 
                    <table className="table">
                      <thead>
                        <tr style={{ borderRadius: "30px" }}>
                          <th scope="col" onClick={() => setSortKey("base")}>
                            Pair{" "}
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("prev_price")}
                          >
                            Last Price
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("change_in_price")}
                          >
                            24h Change
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("high_24hr")}
                          >
                            24h High
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("low_24hr")}
                          >
                            24h Low
                          </th>
                          <th
                            scope="col"
                            onClick={() => setSortKey("base_volume")}
                          >
                            24h Volume
                          </th>
                          <th scope="col">Trade</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredMarketData &&
                          filteredMarketData?.map((el, key) => (
                            <tr key={key}>
                              <td>
                                <div className="img-text mr-3">
                                  <i className="fa fa-star"></i>
                                  <img
                                    src={`/images/cryptocurrency-icons/color/${el.base.toLowerCase()}.svg`}
                                    alt={el.base.toLowerCase()}
                                  />
                                  <span style={{ fontSize: "17px" }}>
                                    {el.base}/{el.quote}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="balance">
                                  <div className="balance-details">
                                    {el.prev_price}
                                   
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{
                                  color:
                                    el.change_in_price > 0
                                      ? "#06CD9D"
                                      : "#FF5364",
                                }}
                              >
                                {el.change_in_price > 0 && "+"}
                                {numeral(el.change_in_price).format("0.00")}%
                              </td>
                              <td>
                                {numeral(parseFloat(el.high_24hr)).format(
                                  "0.00"
                                )}
                              </td>
                              <td>
                                {numeral(parseFloat(el.low_24hr)).format(
                                  "0.00"
                                )}
                              </td>
                              <td>
                                {numeral(parseFloat(el.base_volume)).format(
                                  "0.00"
                                )}{" "}
                                {filter}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="delete"
                                  onClick={() => {
                                    dispatch(setExchangeTrading(el));

                                    const pair = `${el.base}-${el.quote}`;
                                    navigate(`/trade/${pair}`);
                                  }}
                                >
                                  Trade
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
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="load-more">
                <button type="button" className="load">
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default MarketTrend;
