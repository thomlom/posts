import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";

import { useAuth } from "./AuthProvider";

import CreateEvent from "./CreateEvent";
import DialogAuth from "./DialogAuth";
import EventDetail from "./EventDetail";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

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
