import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

test("renders full app without breaking", () => {
  render(<App />);
});
