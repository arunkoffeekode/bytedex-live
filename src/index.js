import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./redux/store";
// import WebSocketContextProvider from "./context/WebSocketContext";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <WebSocketContextProvider> */}
        <App />
        {/* </WebSocketContextProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
