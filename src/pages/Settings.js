import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultBaseFiat,
  selectBaseFiat,
  selectFiatRates,
  setBaseFiat,
} from "../store/currencySlice";
import { selectDarkTheme, setDarkTheme } from "../store/settingsSlice";

const fiats = ["USD", "RUB", "EUR", "TRY", "INR"];
const languages = [
  { label: "English", code: "en" },
  { label: "Türkçe", code: "tr" },
  { label: "عربى", code: "ar" },
];

function Settings() {
  const darkTheme = useSelector(selectDarkTheme);
  const fiatRates = useSelector(selectFiatRates);
  const baseFiat = useSelector(selectBaseFiat);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [fiatOptions, setFiatOptions] = useState([defaultBaseFiat]);

  useEffect(() => {
    const _opts = fiatRates?.filter((f) => fiats.includes(f.currency)) ?? [];
    setFiatOptions([defaultBaseFiat, ..._opts]);
  }, [fiatRates]);

  return (
    <div>
      <section className="setting">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="setting-title">
                <h3>{t("settings.title")}</h3>
              </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6 gtter ">
              <div className="setting-box">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label for="inputPhone" className="lbl">
                        {t("settings.numberFormat")}
                      </label>
                      <select name="" id="" className="form-control">
                        <option value="" selected="">
                          {t("settings.numberFormatOptions.df")}
                        </option>
                        <option value="PaD">
                          {t("settings.numberFormatOptions.comma")}
                        </option>
                        <option value="CaD">
                          {t("settings.numberFormatOptions.period")}
                        </option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6 gtter ">
              <div className="setting-box">
                <form>
                  <div className="form-row">
                    {/* <pre>
                      {JSON.stringify({ fiatOptions, baseFiat }, null, 2)}
                    </pre> */}
                    <div className="form-group col-md-12">
                      <label for="inputPhone" className="lbl">
                        {t("settings.fiat")}
                      </label>
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) => {
                          dispatch(setBaseFiat(fiatOptions[e.target.value]));
                        }}
                      >
                        {fiatOptions?.map((opt, key) => (
                          <option
                            value={key}
                            key={key}
                            selected={baseFiat?.currency === opt?.currency}
                          >
                            {opt?.currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6 gtter ">
              <div className="setting-box">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label for="inputPhone" className="lbl">
                        {t("settings.language")}
                      </label>
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) => {
                          i18n.changeLanguage(e.target.value);
                        }}
                      >
                        {languages.map((lng, key) => (
                          <option
                            key={key}
                            value={lng.code}
                            selected={lng.code === getSelectedLanguage()}
                          >
                            {lng.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6 gtter ">
              <div className="setting-box">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label for="inputPhone" className="lbl">
                        {t("settings.theme")}
                      </label>
                      <div>
                        <small className="small">
                          Themes are not available on Internet Explorer and some
                          versions of Edge.
                        </small>
                      </div>

                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="survey"
                          value={"light"}
                          defaultChecked={!parseInt(darkTheme)}
                          onChange={(e) => {
                            dispatch(setDarkTheme(0));
                          }}
                        />
                        Light
                      </label>

                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="survey"
                          value={"dark"}
                          defaultChecked={parseInt(darkTheme)}
                          onChange={(e) => {
                            dispatch(setDarkTheme(1));
                          }}
                        />
                        Dark
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 gtter ">
              <div className="setting-box">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label for="inputPhone" className="lbl">
                        Notifications
                      </label>
                      <p>
                        Once enabled, you will receive relevant notifications
                        within the app and website.
                      </p>
                      <div className="notification-sec">
                        <ul>
                          <li>
                            <div className="not-name">Activities</div>
                            <div className="sld">
                              <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="not-name">Trade Notification</div>
                            <div className="sld">
                              <label className="switch">
                                <input type="checkbox" checked />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="not-name">System Messages</div>
                            <div className="sld">
                              <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="not-name">Promotion</div>
                            <div className="sld">
                              <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="not-name">Email Notifications</div>
                            <div className="sld">
                              <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </section>
    </div>
  );
}

export function getSelectedLanguage() {
  const lsi18 = localStorage.getItem("i18nextLng");
  if (lsi18) return lsi18;

  return languages[0].code;
}

export default Settings;
