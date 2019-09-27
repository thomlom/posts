import React from "react";
import ReactDOM from "react-dom";

import AppProviders from "./AppProviders";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "normalize.css";
import "./styles/index.css";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);

serviceWorker.unregister();
