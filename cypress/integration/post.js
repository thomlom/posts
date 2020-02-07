import { postBuilder, userBuilder } from "../support/builders";
import { TOKEN_NAME } from "../../src/services/callApi";

describe("Post", () => {
  it("views all post, go on a specific post and deletes it", () => {
    const user = userBuilder();

    const withImage = { image: "https://picsum.photos/800/600" };
    const posts = [
      postBuilder({ overrides: { createdBy: user, ...withImage } }),
      postBuilder({ overrides: withImage }),
      postBuilder({ overrides: withImage }),
    ];

    cy.then(() => window.localStorage.setItem(TOKEN_NAME, "my token"))
      .server()
      .route("/me", { user })
      .route("/post/all", { data: posts })
      .route("DELETE", `/post/${posts[0]._id}`, { data: posts[0] });

    cy.visit("/")
      .findByText(posts[1].title)
      .findByText(posts[0].title)
      .click()
      .url()
      .should("eq", `${Cypress.config().baseUrl}/post/${posts[0]._id}`)
      .findByTestId("delete")
      .click()
      .findByText(posts[0].title)
      .should("not.exist");
  });
});
