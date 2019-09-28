import React from "react";
import { render as rtlRender } from "@testing-library/react";
import callApiMock from "./services/callApi";

import AppProviders from "./AppProviders";

jest.mock("./services/callApi");

export function render(ui) {
  callApiMock.mockImplementation(url => {
    if (url === "/post/all") {
      return Promise.resolve({ data: {} });
    }
  });

  return rtlRender(<AppProviders>{ui}</AppProviders>);
}
