import React, { memo, useEffect, useMemo } from "react";
import numeral from "numeral";
import OwlCarousel from "react-owl-carousel";
import { useSelector } from "react-redux";
import { selectMarketTop } from "../../store/dataStoreSlice";
import { useState } from "react";
import { sortArrayByKey } from "../../utils/v2/sort";

export default function CardCarousel() {
  const [load, setLoad] = useState(false);
  const marketTop = useSelector(selectMarketTop);

  useEffect(() => {
    if (!load && marketTop?.length) {
      setLoad(true);
    }
  }, [marketTop, load]);

  return (
    <div>
      <section className="market-box">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <OwlCarousel
                className="owl-carousel owl-theme"
                margin={10}
                items={4}
                autoplay={true}
                {...options}
              >
                {marketTop &&
                  marketTop?.map((el, key) => (
                    <div className="item" key={key}>
                      <div className="mark">
                        <div className="d-flex">
                          <div className="mark-left">
                            <p className="mark-name">
                              {el?.base}/{el?.quote}
                            </p>
                            <p
                              style={{
                                color:
                                  el?.change_in_price >= 0
                                    ? "#06CD9D"
                                    : "#FF5364",
                              }}
                            >
                              <div>
                                {numeral(el?.prev_price).format("0.00")}{" "}
                              </div>
                              <span>
                                {el?.change_in_price >= 0 && " +"}
                                {numeral(el?.change_in_price).format("0.00")}%
                              </span>
                            </p>
                          </div>
                          <div className="mark-right">
                            {el?.change_in_price >= 0 ? (
                              <img src="images/map.png" />
                            ) : (
                              <img src="images/map1.png" />
                            )}
                          </div>
                        </div>
                        <div className="value text-nowrap">
                          {numeral(parseFloat(el?.base_volume)).format(
                            "00,00,000.00"
                          )}{" "}
                          {el?.quote}
                        </div>
                      </div>
                    </div>
                  ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const options = {
  loop: true,
  dots: false,
  margin: 10,
  autoplay: true,
  smartSpeed: 1000,
  autoplayTimeout: 2000,
  responsiveClass: true,
  autoplayHoverPause: true,
  navigation: true,
  responsive: {
    0: {
      nav: true,
      items: 1,
    },
    768: {
      nav: true,
      items: 2,
    },
    1024: {
      nav: true,
      items: 4,
    },
    1440: {
      nav: true,
      items: 4,
    },
  },
};
