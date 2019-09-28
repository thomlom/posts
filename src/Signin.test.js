import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import faker from "faker";

import AuthProvider from "./AuthProvider";
import Signin from "./Signin";

function renderSignin() {
  const signin = jest.fn().mockResolvedValue();
  const historyMock = { push: jest.fn() };
  const utils = render(
    <AuthProvider value={{ signin }}>
      <Signin history={historyMock} />
    </AuthProvider>
  );

  const emailInput = utils.getByLabelText(/email/i);
  const passwordInput = utils.getByLabelText(/password/i);
  const signInButton = utils.getByText(/sign in/i);
  const fakeUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return {
    emailInput,
    passwordInput,
    signInButton,
    fakeUser,
    signin,
    push: historyMock.push,
    ...utils,
  };
}

describe("Signin", () => {
  test("signs in the user", async () => {
    const {
      emailInput,
      passwordInput,
      signInButton,
      fakeUser,
      signin,
      push,
    } = renderSignin();

    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.click(signInButton);

    await wait(() => {
      expect(signin).toHaveBeenCalledWith(fakeUser);
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  test("throws an error if user hasn't provided any email or password", () => {
    const {
      emailInput,
      signInButton,
      fakeUser,
      signin,
      getByText,
    } = renderSignin();

    fireEvent.click(signInButton);
    expect(getByText(/email .* required/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.click(signInButton);
    expect(getByText(/email .* required/i)).toBeInTheDocument();

    expect(signin).not.toHaveBeenCalled();
  });
});
