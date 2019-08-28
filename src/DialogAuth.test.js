import React from "react";
import { render as rtlRender, fireEvent, wait } from "@testing-library/react";
import faker from "faker";

import DialogProvider from "./DialogProvider";
import AuthProvider from "./AuthProvider";

import DialogAuth from "./DialogAuth";

function render(
  ui,
  { signin, signup, closeDialog, ...options } = {
    signin: jest.fn(),
    signup: jest.fn(),
    closeDialog: jest.fn(),
  }
) {
  return {
    ...rtlRender(
      <AuthProvider value={{ signup, signin }}>
        <DialogProvider value={{ isOpen: true, closeDialog }}>
          {ui}
        </DialogProvider>
      </AuthProvider>,
      options
    ),
    signin,
    signup,
    closeDialog,
  };
}

jest.mock("@reach/dialog", () => ({
  Dialog: ({ children, isOpen }) =>
    isOpen ? <div data-testid="dialog">{children}</div> : null,
}));

describe("DialogAuth", () => {
  it("closes the dialog", () => {
    const { getByTestId, closeDialog } = render(<DialogAuth />);

    const closeIcon = getByTestId("close");
    fireEvent.click(closeIcon);

    expect(closeDialog).toHaveBeenCalled();
  });

  it("signs in", async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { getByLabelText, getByText, signin, closeDialog } = render(
      <DialogAuth />
    );

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: fakeUser.email } });
    fireEvent.change(passwordInput, { target: { value: fakeUser.password } });
    const signInButton = getByText(/sign in/i);
    fireEvent.click(signInButton);

    await wait(() => {
      expect(signin).toHaveBeenCalledWith(fakeUser);
      expect(closeDialog).toHaveBeenCalledTimes(1);
    });
  });
});
