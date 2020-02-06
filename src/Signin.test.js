import React from "react";
import { screen, fireEvent, wait } from "@testing-library/react";
import { build, fake } from "@jackfranklin/test-data-bot";

import AuthProvider from "./AuthProvider";
import Signin from "./Signin";

import { renderWithRouter } from "./testUtils";
import callApiMock, { TOKEN_NAME } from "./services/callApi";

jest.mock("./services/callApi");

const userBuilder = build("User", {
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
  },
});

function render() {
  const { history } = renderWithRouter(
    <AuthProvider>
      <Signin />
    </AuthProvider>,
    { route: "/signin" }
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByText(/sign in/i);

  const fakeUser = userBuilder();

  function submitSignInForm() {
    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.click(signInButton);
  }

  return {
    emailInput,
    passwordInput,
    signInButton,
    fakeUser,
    submitSignInForm,
    history,
  };
}

describe("Signin", () => {
  test("signs in the user", async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    callApiMock.mockResolvedValue({
      data: { token: "my token" },
    });
    const { submitSignInForm, history } = render();
    submitSignInForm();

    await wait(() =>
      expect(history.entries[history.length - 1].pathname).toBe("/")
    );

    // https://github.com/facebook/jest/issues/6798#issuecomment-412871616
    expect(setItemSpy).toHaveBeenCalledWith(TOKEN_NAME, "my token");
    // Clean the local storage
    window.localStorage.removeItem(TOKEN_NAME);
  });

  test("throws an error if user hasn't provided any email or password", () => {
    const { signInButton, emailInput, fakeUser } = render();

    fireEvent.click(signInButton);
    screen.getByText(/email .* required/i);

    fireEvent.change(emailInput, {
      target: {
        value: fakeUser.email,
      },
    });
    fireEvent.click(signInButton);
    screen.getByText(/email .* required/i);
  });

  test("throws an error if something unexpected occurs during signin", async () => {
    const errorMessage = "Oops. Something unexpected happened.";
    callApiMock.mockRejectedValue({ response: { data: errorMessage } });

    const { submitSignInForm } = render();
    submitSignInForm();

    await screen.findByText(errorMessage);
  });
});
