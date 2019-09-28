import React from "react";
import {
  render as rtlRender,
  wait,
  within,
  fireEvent,
} from "@testing-library/react";
import { formatDistanceToNow } from "date-fns";
import faker from "faker";

import callApiMock from "./services/callApi";
import AuthProvider from "./AuthProvider";
import PostProvider from "./PostProvider";
import Home from "./Home";

jest.mock("./services/callApi");

async function render(ui, { posts, userId } = { posts: [], userId: 1 }) {
  callApiMock.mockResolvedValue({ data: { data: posts } });

  const removeMock = jest.fn().mockResolvedValue();
  const utils = rtlRender(
    <AuthProvider value={{ user: { _id: userId } }}>
      <PostProvider value={{ posts, remove: removeMock }}>{ui}</PostProvider>
    </AuthProvider>
  );
  await wait();

  return { ...utils, userId, removeMock };
}

function generatePost(overrides) {
  return {
    _id: faker.random.uuid(),
    image: faker.random.image(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    createdBy: { _id: faker.random.uuid(), name: faker.name.firstName() },
    date: faker.date.recent(),
    ...overrides,
  };
}

describe("Home", () => {
  test("displays no posts if there are no posts", async () => {
    const { getByText, getByAltText } = await render(<Home />);
    expect(getByAltText(/carrying an empty box/i)).toBeInTheDocument();
    expect(getByText(/no posts/i)).toBeInTheDocument();
  });

  test("displays the posts", async () => {
    const posts = [generatePost(), generatePost(), generatePost()];
    const { getByTestId } = await render(<Home />, { posts });

    posts.forEach(post => {
      const { getByText, getByAltText } = within(
        getByTestId(`post-${post._id}`)
      );
      expect(getByAltText(post.title)).toBeInTheDocument();
      expect(getByText(post.title)).toBeInTheDocument();
      expect(
        getByText(`Written by ${post.createdBy.name}`)
      ).toBeInTheDocument();
      expect(getByText(formatDistanceToNow(post.date))).toBeInTheDocument();
    });
  });

  test("creator can delete a post", async () => {
    const userId = 1;
    const posts = [
      generatePost(),
      generatePost({
        createdBy: { _id: userId, name: faker.name.firstName() },
      }),
      generatePost(),
    ];
    const confirmMock = jest.fn().mockReturnValue(true);
    window.confirm = confirmMock;
    const { getByTestId, removeMock } = await render(<Home />, {
      posts,
      userId,
    });
    const postOfCreatorUtils = within(getByTestId(`post-${posts[1]._id}`));
    const deleteIcon = postOfCreatorUtils.getByTestId("delete");

    fireEvent.click(deleteIcon);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(removeMock).toHaveBeenCalledWith(posts[1]._id);
  });
});
