import React from "react";
import { render as originalRender, wait } from "@testing-library/react";

import AppProviders from "./AppProviders";
import App from "./App";

jest.mock("./services/callApi", () =>
  jest.fn(() => Promise.resolve({ data: { data: [] } }))
);

function render() {
  return originalRender(
    <AppProviders>
      <App />
    </AppProviders>
  );
}

describe("App", () => {
  it("renders without crashing", async () => {
    const utils = render(<App />);
    await wait();
    utils.debug();
  });
});
