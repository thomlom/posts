import React from "react";
import { Router } from "@reach/router";

import Home from "./Home";
import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";

function AuthenticatedApp() {
  return (
    <Router>
      <Home path="/" />
      <CreateEvent path="/create" />
      <EventDetail path="/event/:eventId" />
    </Router>
  );
}

export default AuthenticatedApp;
