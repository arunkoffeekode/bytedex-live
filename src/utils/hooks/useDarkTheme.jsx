import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkTheme } from "../../store/settingsSlice";

export default function useDarkTheme() {
  const darkTheme = useSelector(selectDarkTheme);

  useEffect(() => {
    if (parseInt(darkTheme)) {
      document.documentElement.style.setProperty("--border", "#35383F");
      document.documentElement.style.setProperty("--bg1", "#ffffff");
      document.documentElement.style.setProperty("--bg12", "#29292C");
      document.documentElement.style.setProperty("--bg", "#35383F");
      document.documentElement.style.setProperty("--bg-shade", "#181a20");
      document.documentElement.style.setProperty("--text", "#ffffff");
      document.documentElement.style.setProperty(
        "--bg-image",
        `url(${CSS.escape("../images/black-bg.png")})`
      );

      document.documentElement.style.setProperty("--bg1", "#000");
      document.documentElement.style.setProperty("--bs-dark", "#f8f9fa");
    } else {
      document.documentElement.style.setProperty("--border", "#ececec");
      document.documentElement.style.setProperty("--bg12", "#ffffff");
      document.documentElement.style.setProperty("--bg12", "#ffffff");
      document.documentElement.style.setProperty("--bg", "#ffffff");
      document.documentElement.style.setProperty("--bg-shade", "#eeeeee");
      document.documentElement.style.setProperty("--text", "#000000");
      document.documentElement.style.setProperty(
        "--bg-image",
        // "url(../images/main-bg.png)"
        `url(${CSS.escape("../images/main-bg.png")})`
      );

      document.documentElement.style.setProperty("--bs-white", "#000000");
      document.documentElement.style.setProperty("--bs-light", "#212529");
    }
  }, [darkTheme]);

  return null;
}
