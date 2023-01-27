import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// import "../../assets/index.less";

export default function AmountProgress({ value, onChange }) {
  const marks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };

  return (
    <div>
      {/* <div className="map-box">
        <div class="container1">
          <div class="progress">
            <div class="percent"></div>
          </div>
          <div class="steps">
            <div class="step selected completed" id="0">
              <p style={{ marginTop: "-40px" }}>0%</p>
            </div>
            <div class="step" id="1">
              <p style={{ marginTop: "-40px" }}>25%</p>
            </div>
            <div class="step" id="2">
              <p style={{ marginTop: "-40px" }}>50%</p>
            </div>
            <div class="step" id="3">
              <p style={{ marginTop: "-40px" }}> 75%</p>
            </div>
            <div class="step" id="3">
              <p style={{ marginTop: "-40px" }}> 100%</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="mx-3">
        <Slider
          min={0}
          max={100}
          marks={marks}
          included={false}
          value={value}
          onChange={(val) => onChange(val)}
        />
      </div>
    </div>
  );
}
