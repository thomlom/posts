import { authBuilder } from "../support/builders";
import { TOKEN_NAME } from "../../src/services/callApi";

describe("Authentication", () => {
  it("signs up the user", () => {
    const user = authBuilder();
    cy.server()
      .route("/post/all", { data: [] })
      .route("POST", "/signup", { token: "my token" })
      .route("/me", { user });

    cy.visit("/")
      .findByText(/sign up/i)
      .click()
      .findByLabelText(/email/i)
      .type(user.email)
      .findByLabelText(/name/i)
      .type(user.name)
      .findByLabelText(/password/i)
      .type(user.password)
      .get("button[type='submit']")
      .click()
      .window()
      .its(`localStorage.${TOKEN_NAME}`)
      .should("eq", "my token")
      .findByText(/sign out/i);
  });

  it("signs in the user and signs out", () => {
    const user = authBuilder();
    cy.server()
      .route("/post/all", { data: [] })
      .route("POST", "/signin", { token: "my token" })
      .route("/me", { user });

    cy.visit("/")
      .findByText(/sign in/i)
      .click()
      .findByLabelText(/email/i)
      .type(user.email)
      .findByLabelText(/password/i)
      .type(user.password)
      .get("button[type='submit']")
      .click()
      .window()
      .its(`localStorage.${TOKEN_NAME}`)
      .should("eq", "my token")
      .findByText(/sign out/i)
      .click()
      .findByText(/sign in/i);
  });
});
