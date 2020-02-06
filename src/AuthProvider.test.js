import React from "react";
import { screen, render } from "@testing-library/react";

import AuthProvider, { useAuth } from "./AuthProvider";
import { TOKEN_NAME } from "./services/callApi";

import callApiMock from "./services/callApi";
jest.mock("./services/callApi");

const Hello = () => {
  const { user } = useAuth();
  return <div>Hello {user.name}!</div>;
};

describe("AuthProvider", () => {
  test("is fetching user", async () => {
    window.localStorage.setItem(TOKEN_NAME, "my_token");

    callApiMock.mockImplementation(url => {
      if (url === "/me") {
        return Promise.resolve({ data: { user: { name: "Thomas" } } });
      }
    });

    render(
      <AuthProvider>
        <Hello />
      </AuthProvider>
    );

    screen.getByText(/loading/i);
    await screen.findByText(/hello thomas/i);
  });
});
