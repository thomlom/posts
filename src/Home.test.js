import React from "react";
import { screen, within, fireEvent, wait } from "@testing-library/react";
import { formatDistanceToNow } from "date-fns";

import {
  renderWithRouterAndProviders,
  postBuilder,
  userBuilder,
} from "./testUtils";
import Home from "./Home";

describe("Home", () => {
  test("displays no posts if there are no posts", async () => {
    renderWithRouterAndProviders(<Home />, { posts: [] });
    screen.findByAltText(/carrying an empty box/i);
    screen.findByText(/no posts/i);
  });

  test("displays the posts", async () => {
    const posts = [postBuilder(), postBuilder(), postBuilder()];
    renderWithRouterAndProviders(<Home />, { posts });

    await wait();

    posts.forEach(post => {
      const postElement = screen.getByTestId(`post-${post._id}`);
      const { getByText, getByAltText } = within(postElement);
      getByAltText(post.title);
      getByText(post.title);
      getByText(`Written by ${post.createdBy.name}`);
      getByText(formatDistanceToNow(post.date));
    });
  });

  test("creator can delete a post", async () => {
    const user = userBuilder();

    const posts = [
      postBuilder(),
      postBuilder({
        overrides: {
          createdBy: user,
        },
      }),
    ];

    const postToDelete = posts[1];
    const confirmMock = jest.fn().mockReturnValue(true);
    window.confirm = confirmMock;

    const { callApiMock } = renderWithRouterAndProviders(<Home />, {
      posts,
      user,
      endpoints: {
        [`/post/${postToDelete._id}`]: Promise.resolve({
          data: { data: postToDelete },
        }),
      },
    });

    const postToDeleteElement = await screen.findByTestId(
      `post-${postToDelete._id}`
    );
    const deleteIcon = within(postToDeleteElement).getByTestId("delete");

    expect(screen.queryByText(`${postToDelete.title}`)).toBeInTheDocument();

    fireEvent.click(deleteIcon);
    await wait();

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(callApiMock).toHaveBeenCalledWith(`/post/${posts[1]._id}`, {
      method: "DELETE",
    });
    expect(screen.queryByText(`${postToDelete.title}`)).not.toBeInTheDocument();
  });
});
