import React from "react";
import ReactDOM from "react-dom";

import AuthProvider from "./AuthProvider";
import DialogProvider from "./DialogProvider";
import EventProvider from "./EventProvider";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "normalize.css";

ReactDOM.render(
  <AuthProvider>
    <DialogProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </DialogProvider>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
