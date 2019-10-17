import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import faker from "faker";

import { AuthContext } from "./AuthProvider";
import Signin from "./Signin";

function renderSignin({ signin = jest.fn().mockResolvedValue() } = {}) {
  const historyMock = { push: jest.fn() };
  const utils = render(
    <AuthContext.Provider value={{ signin }}>
      <Signin history={historyMock} />
    </AuthContext.Provider>
  );

  const emailInput = utils.getByLabelText(/email/i);
  const passwordInput = utils.getByLabelText(/password/i);
  const signInButton = utils.getByText(/sign in/i);
  const fakeUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  function submitSignInForm() {
    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    fireEvent.click(signInButton);

    expect(signin).toHaveBeenCalledWith(fakeUser);
  }

  return {
    emailInput,
    passwordInput,
    signInButton,
    fakeUser,
    signin,
    push: historyMock.push,
    submitSignInForm,
    ...utils,
  };
}

describe("Signin", () => {
  test("signs in the user", async () => {
    const { submitSignInForm, push } = renderSignin();

    submitSignInForm();

    await wait(() => expect(push).toHaveBeenCalledWith("/"));
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

  test("throws an error if something unexpected occurs during signin", async () => {
    const errorMessage = "Oops. Something unexpected happened.";
    const { submitSignInForm, findByText, push } = renderSignin({
      signin: jest.fn().mockRejectedValue({ response: { data: errorMessage } }),
    });

    submitSignInForm();

    await findByText(errorMessage);
    expect(push).not.toHaveBeenCalled();
  });
});
