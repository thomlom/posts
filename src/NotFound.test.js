import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import { renderWithRouter } from "./testUtils";

import NotFound from "./NotFound";

test("stumble upon a not found page if the route is not found", () => {
  const { history } = renderWithRouter(<NotFound />);

  screen.getByText(/oops/i);
  fireEvent.click(screen.getByText(/go back/i));
  expect(history.entries[0].pathname).toBe("/");
});
