import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import faker from "faker";

import AuthProvider from "./AuthProvider";
import Signup from "./Signup";

function renderSignup() {
  const signup = jest.fn().mockResolvedValue();
  const historyMock = { push: jest.fn() };
  const utils = render(
    <AuthProvider value={{ signup }}>
      <Signup history={historyMock} />
    </AuthProvider>
  );

  const emailInput = utils.getByLabelText(/email/i);
  const passwordInput = utils.getByLabelText(/password/i);
  const nameInput = utils.getByLabelText(/name/i);
  const signUpButton = utils.getByText(/sign up/i);
  const fakeUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName(),
  };

  return {
    emailInput,
    passwordInput,
    nameInput,
    signUpButton,
    fakeUser,
    signup,
    push: historyMock.push,
    ...utils,
  };
}

describe("Signup", () => {
  test("signs up the user", async () => {
    const {
      emailInput,
      passwordInput,
      nameInput,
      signUpButton,
      fakeUser,
      signup,
      push,
    } = renderSignup();

    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.change(nameInput, { target: { value: fakeUser.name } });

    fireEvent.click(signUpButton);

    await wait(() => {
      expect(signup).toHaveBeenCalledWith(fakeUser);
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  test("throws an error if user hasn't provided any email, password or name", () => {
    const {
      emailInput,
      passwordInput,
      signUpButton,
      fakeUser,
      signup,
      getByText,
    } = renderSignup();

    fireEvent.click(signUpButton);
    expect(getByText(/email .* required/i));

    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.click(signUpButton);
    expect(getByText(/email .* required/i));

    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.click(signUpButton);
    expect(getByText(/email .* required/i));

    expect(signup).not.toHaveBeenCalled();
  });
});
