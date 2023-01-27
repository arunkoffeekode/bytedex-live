import axios from "axios";
import qs from "qs";
import _ from "lodash";
import { loadProgressBar } from "axios-progress-bar";
import { url } from "../apis.constants";
import { ExchangeApi } from "./exchangeAPI";
import { routes } from "../routes.constants";
// import { store } from "../redux/store";
// import { logOut } from "../redux/actions/profile";
// import { triggerToast } from "../redux/actions/ui";
// import { setErrorStatus } from "../redux/actions/exchangeSettings";
import { store } from "../store";
import { authenticate } from "../store/authSlice";
import { errorToast, successToast } from "./v2/toasts";
import i18n from "../i18n";

const config = {
  baseURL: url,
};

const instance = axios.create(config);
const pollingInstance = axios.create(config);
const socialTradeInstance = axios.create({ baseURL: url });

export function setBearer(bearer) {
  instance.defaults.headers.common["Authorization"] = bearer?.startsWith(
    "Bearer"
  )
    ? bearer
    : `Bearer ${bearer}`;
  pollingInstance.defaults.headers.common["Authorization"] = bearer?.startsWith(
    "Bearer"
  )
    ? bearer
    : `Bearer ${bearer}`;
  socialTradeInstance.defaults.headers.common["Authorization"] =
    bearer?.startsWith("Bearer") ? bearer : `Bearer ${bearer}`;
}

export function setToken() {
  const token = localStorage.getItem("token");
  return "Bearer " + token;
}

export const apiInstance = async ({ url, method = "GET", data }) => {
  if (method === "POST") {
    return instance({
      url,
      method,
      data,
    });
  } else if (method === "GET") {
    return instance({
      url: `${url}?${qs.stringify(data)}`,
      method,
    });
  }
};

export const authenticatedInstance = async ({
  url,
  method,
  headers = {},
  data,
  polling = false,
}) => {
  const willUseInstance = !polling ? instance : pollingInstance;

  const updatedHeaders = {
    Authorization: setToken(),
    ...headers,
  };

  if (method === "POST") {
    return willUseInstance({
      url,
      method,
      headers: updatedHeaders,
      data,
    });
  } else if (method === "GET") {
    return willUseInstance({
      url: `${url}?${qs.stringify(data)}`,
      method,
      headers: updatedHeaders,
    });
  }
};

export const getSocialTradeInstance = () => {
  return socialTradeInstance;
};

const handleError = (error) => {
  const status = _.get(error, "response.status");

  if (status === 400) {
    return error.response;
  }

  if (status === 401) {
    // errorToast(i18n.t(`messages.error401`));

    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    store.dispatch(authenticate({ isAuthorized: false }));

    return error.response;

    // console.log(error);
    // const {
    //   auth: { isAuthenticated },
    // } = store.getState();
    // if (isAuthenticated) {
    //   store.dispatch(logOut());
    // } else {
    //   // const message = _.get(error, 'response.data.Message');
    //   // store.dispatch(triggerToast(message));
    //   store.dispatch(triggerToast("error401", "warn", 2500, "error401"));
    //   return error.response;
    // }
    // window.location.replace(routes.login);
    // throw error;
    // const stateobj = {check:"UnAuthorized"};
    // localStorage.removeItem("token");
    // window.history.replaceState(stateobj, "", "/");
  }
  if (status === 403) {
    // const message = _.get(error, 'response.data.Message');
    // store.dispatch(triggerToast(message));
    return error.response;
  }

  if (!status) {
    // store.dispatch(setErrorStatus());
  }
};

instance.interceptors.response.use(null, handleError);

pollingInstance.interceptors.response.use(null, (error) => {
  if (_.get(error, "response.status") === 401) {
    console.log(error);
    // const {
    //   auth: { isAuthenticated },
    // } = store.getState();

    // if (isAuthenticated) {
    //   store.dispatch(logOut());
    // }
  }
});

socialTradeInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || { data: {} }
    );
  }
);

export const exchangeApi = new ExchangeApi({ config, handleError });

loadProgressBar({ showSpinner: true }, instance);

window.exchangeApi = exchangeApi;
window.authenticatedInstance = authenticatedInstance;

export default instance;
