import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { build, fake } from "@jackfranklin/test-data-bot";

import AuthProvider from "./AuthProvider";
import PostProvider from "./PostProvider";

import callApiMock, { TOKEN_NAME } from "./services/callApi";
jest.mock("./services/callApi");

export const userBuilder = build("User", {
  fields: {
    name: fake(f => f.name.firstName()),
    email: fake(f => f.internet.email()),
    _id: fake(f => f.random.uuid()),
  },
});

export const postBuilder = build("Post", {
  fields: {
    _id: fake(f => f.random.uuid()),
    title: fake(f => f.lorem.sentence()),
    content: fake(f => f.lorem.paragraphs()),
    image: fake(f => f.random.image()),
    date: fake(f => f.date.recent()),
    createdBy: userBuilder(),
  },
});

export function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    ...rest
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>, rest),
    history,
  };
}

const getProvidersImpl = ({ posts, user, endpoints }) => url => {
  const urlsToImpl = {
    "/post/all": Promise.resolve({
      data: {
        data: posts,
      },
    }),
    "/me": Promise.resolve({
      data: {
        user: user ? user : null,
      },
    }),
    ...endpoints,
  };

  if (urlsToImpl[url]) {
    return urlsToImpl[url];
  } else {
    throw new Error(`The endpoint passed haven't been mocked: ${url}`);
  }
};

export function renderWithRouterAndProviders(
  ui,
  { endpoints, posts, user, ...rest } = {}
) {
  user && window.localStorage.setItem(TOKEN_NAME, "my_token");
  const providersImpl = getProvidersImpl({ posts, user, endpoints });
  callApiMock.mockImplementation(providersImpl);

  const Providers = ({ children }) => (
    <AuthProvider>
      <PostProvider>{children}</PostProvider>
    </AuthProvider>
  );

  return {
    ...renderWithRouter(ui, { wrapper: Providers, ...rest }),
    callApiMock,
  };
}
