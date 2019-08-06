import React from "react";
import { Router } from "@reach/router";

import { useAuth } from "./AuthProvider";

import CreateEvent from "./CreateEvent";
import DialogAuth from "./DialogAuth";
import EventDetail from "./EventDetail";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";

import { Container } from "./App.styles";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <Container>
        <Router>
          <Home path="/" />
          {isAuthenticated && <CreateEvent path="/create" />}
          {isAuthenticated && <EventDetail path="/event/:eventId" />}
          <NotFound default />
        </Router>
      </Container>
      <DialogAuth />
    </>
  );
}

export default App;
