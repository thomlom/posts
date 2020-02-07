import { build, fake } from "@jackfranklin/test-data-bot";
import { TOKEN_NAME } from "../../src/services/callApi";

const userBuilder = build("User", {
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
    name: fake(f => f.name.firstName()),
  },
});

describe("Authentication", () => {
  it("signs up the user", () => {
    const user = userBuilder();
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
    const user = userBuilder();
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
