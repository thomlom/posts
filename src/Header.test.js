import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import AuthProvider from "./AuthProvider";
import Header from "./Header";

import { renderWithRouter, userBuilder } from "./testUtils";
import callApiMock, { TOKEN_NAME } from "./services/callApi";

jest.mock("./services/callApi");

function render() {
  renderWithRouter(
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
}

describe("Header", () => {
  test("renders initial menu", () => {
    render();

    screen.getByText(/all posts/i);
    screen.getByText(/sign in/i);
    screen.getByText(/sign up/i);
  });

  test("toggles the menu", () => {
    render();

    const menu = screen.getByTestId("menu");
    fireEvent.click(menu);
    expect(screen.queryByTestId("menu")).not.toBeInTheDocument();

    const close = screen.getByTestId("close");
    fireEvent.click(close);
    expect(screen.queryByTestId("close")).not.toBeInTheDocument();
  });

  test("allows to navigate to create post if authenticated", async () => {
    window.localStorage.setItem(TOKEN_NAME, "hello");
    callApiMock.mockResolvedValue({ data: { user: userBuilder() } });

    render();

    await screen.findByText(/new post/i);
  });

  test("signs out", async () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");
    window.localStorage.setItem(TOKEN_NAME, "hello");
    callApiMock.mockResolvedValue({ data: { user: userBuilder() } });

    render();

    const signout = await screen.findByText(/sign out/i);
    fireEvent.click(signout);
    expect(removeItemSpy).toHaveBeenCalledWith(TOKEN_NAME);
  });
});
