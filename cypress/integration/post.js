import { build, fake } from "@jackfranklin/test-data-bot";
import { TOKEN_NAME } from "../../src/services/callApi";

const userBuilder = build("User", {
  fields: {
    name: fake(f => f.name.firstName()),
    email: fake(f => f.internet.email()),
    _id: fake(f => f.random.uuid()),
  },
});

const postBuilder = build("Post", {
  fields: {
    _id: fake(f => f.random.uuid()),
    title: fake(f => f.lorem.sentence()),
    content: fake(f => f.lorem.paragraphs()),
    image: fake(f => f.random.image()),
    date: fake(f => f.date.recent()),
    createdBy: userBuilder(),
  },
});

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
