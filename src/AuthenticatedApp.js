import React from "react";
import { Router } from "@reach/router";

import Home from "./Home";
import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import EventProvider from "./EventProvider";

function AuthenticatedApp() {
  return (
    <EventProvider>
      <Router>
        <Home path="/" />
        <CreateEvent path="/create" />
        <EventDetail path="/event/:eventId" />
      </Router>
    </EventProvider>
  );
}

export default AuthenticatedApp;
