import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTradingPair } from "../../../store/exchangeSlice";
import datafeed from "../TVChartContainer/datafeed";
import { selectDarkTheme } from "../../../store/settingsSlice";
// import TradingViewWidget from "react-tradingview-widget";
// import { TVChartContainer } from "../TVChartContainer";

export default function Chart() {
  // const navigate = useNavigate();
  const darkTheme = useSelector(selectDarkTheme);
  const tradingPair = useSelector(selectTradingPair);

  const [chartReady, setChartReady] = useState(false);

  function generateThemeColors() {
    const paneBg = darkTheme ? "#181A20" : "#FFFFFF";
    const paneGrid = darkTheme ? "#35383F" : "#DDDDDDD";

    return {
      "paneProperties.background": paneBg,
      "paneProperties.backgroundType": "solid",
      "paneProperties.horzGridProperties.color": paneGrid,
      "paneProperties.vertGridProperties.color": paneGrid,
    };
  }

  function initiateChart() {
    const widgetOptions = {
      symbol: `${tradingPair.baseCurrency}/${tradingPair.quoteCurrency}`,
      datafeed: datafeed,
      interval: "60",
      container_id: "tv_chart_container",
      library_path: "/charting_library/",
      autosize: true,
      theme: parseInt(darkTheme) ? "dark" : "light",
      overrides: {
        ...generateThemeColors(),
      },
    };

    const _tvWidget = new window.TradingView.widget(widgetOptions);
    window._tvWidget = _tvWidget;

    _tvWidget.onChartReady(() => {
      setChartReady(true);
    });
  }

  useEffect(() => {
    initiateChart();
  }, [tradingPair.baseCurrency, tradingPair.quoteCurrency]);

  return (
    <div className="chart-long">
      <div id="tv_chart_container"></div>
    </div>
  );
}
