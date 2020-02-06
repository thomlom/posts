import React from "react";
import { screen, fireEvent, wait } from "@testing-library/react";
import { build, fake } from "@jackfranklin/test-data-bot";

import AuthProvider from "./AuthProvider";
import Signup from "./Signup";

import { renderWithRouter } from "./testUtils";
import callApiMock, { TOKEN_NAME } from "./services/callApi";

jest.mock("./services/callApi");

const userBuilder = build("User", {
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
    name: fake(f => f.name.firstName()),
  },
});

function render() {
  const { history } = renderWithRouter(
    <AuthProvider>
      <Signup />
    </AuthProvider>,
    { route: "/signup" }
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const nameInput = screen.getByLabelText(/name/i);
  const signUpButton = screen.getByText(/sign up/i);

  const fakeUser = userBuilder();

  function submitSignUpForm() {
    fireEvent.change(emailInput, {
      target: { value: fakeUser.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: fakeUser.password },
    });
    fireEvent.change(nameInput, {
      target: { value: fakeUser.name },
    });

    fireEvent.click(signUpButton);
  }

  return {
    emailInput,
    passwordInput,
    nameInput,
    signUpButton,
    fakeUser,
    submitSignUpForm,
    history,
  };
}

describe("Signup", () => {
  test("signs up the user", async () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, "setItem");
    callApiMock.mockResolvedValue({
      data: { token: "my token", user: {} },
    });
    const { submitSignUpForm, history } = render();
    submitSignUpForm();

    await wait(() =>
      expect(history.entries[history.length - 1].pathname).toBe("/")
    );
    expect(localStorageSpy).toHaveBeenCalledWith(TOKEN_NAME, "my token");
    window.localStorage.removeItem(TOKEN_NAME);
  });

  test("throws an error if user hasn't provided any email, password or name", () => {
    const { signUpButton, emailInput, passwordInput, fakeUser } = render();

    fireEvent.click(signUpButton);
    screen.getByText(/email .* required/i);

    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.click(signUpButton);
    screen.getByText(/email .* required/i);

    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.click(signUpButton);
    screen.getByText(/email .* required/i);
  });
});
