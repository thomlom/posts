import React from "react";
import { wait } from "@testing-library/react";

import { render } from "./test-utils";
import CreatePost from "./CreatePost";

describe("CreatePost", () => {
  test("creates a post", async () => {
    const { debug } = render(<CreatePost />);
    await wait();
  });
});
