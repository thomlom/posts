import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import NotFound from "./NotFound";

test("stumble upon a not found page if the route is not found", () => {
  const historyMock = createMemoryHistory();
  render(
    <Router history={historyMock}>
      <NotFound />
    </Router>
  );

  screen.getByText(/oops/i);
  fireEvent.click(screen.getByText(/go back/i));
  expect(historyMock.entries[0].pathname).toBe("/");
});
