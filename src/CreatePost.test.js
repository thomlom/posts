import React from "react";
import { wait } from "@testing-library/react";

import { render } from "./test-utils";
import CreateEvent from "./CreateEvent";

describe("CreateEvent", () => {
  test("creates an event", async () => {
    const { debug } = render(<CreateEvent />);
    await wait();
    debug();
  });
});
