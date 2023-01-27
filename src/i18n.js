import i18n from "i18next";
import numbro from "numbro";
import _ from "lodash";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";
import moment from "moment";
import "moment/min/locales";
import { backendUrl } from "./setup";
import qs from "qs";

const forceServerTransationsInDev = true;

const additionalI18nOptions =
  process.env.NODE_ENV === "development" && !forceServerTransationsInDev
    ? {}
    : {
        backend: {
          loadPath: `${backendUrl}/api/language?code={{lng}}&namespace={{ns}}`,
          parse: (data, url) => {
            const parsedData = JSON.parse(data);

            if (parsedData.Data) {
              return Object.values(JSON.parse(parsedData.Data))[0];
            } else if (parsedData.data) {
              return Object.values(JSON.parse(parsedData.data))[0];
            }
            return parsedData;
          },
        },
      };

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ...additionalI18nOptions,
    debug: true,
    ns: ["translation"],
    defaultNS: "translation",
    fallbackLng: "en", // use en if detected lng is not available
    keySeparator: ".",
    load: "languageOnly",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: true,
    },
  });

window.i18n = i18n;

export { moment, numbro };

export default i18n;
