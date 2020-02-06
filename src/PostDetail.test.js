import React from "react";
import { screen, fireEvent, waitForElement } from "@testing-library/react";
import { Route } from "react-router-dom";

import {
  renderWithRouterAndProviders,
  postBuilder,
  userBuilder,
} from "./testUtils";

import PostDetail from "./PostDetail";

function render(ui, { route, post, user }) {
  const viewedPost = postBuilder({
    overrides: {
      ...post,
      createdBy: user,
    },
  });
  const posts = [postBuilder(), viewedPost, postBuilder()];

  return {
    ...renderWithRouterAndProviders(
      <>
        <Route path="/">
          <div>Hello</div>
        </Route>
        <Route path="/post/:postId">{ui}</Route>
      </>,
      {
        route,
        posts,
        user,
        endpoints: {
          // Delte viewed post
          [`/post/${viewedPost._id}`]: Promise.resolve({
            data: { data: viewedPost },
          }),
        },
      }
    ),
    viewedPost,
  };
}

describe("Signin", () => {
  test("displays no post if id is unknown", async () => {
    render(<PostDetail />, { route: "/post/unknown" });

    await screen.findByText(/no post for unknown/i);
  });

  test("can view a post", async () => {
    const postId = "1";
    const postDate = "2020-02-06T04:52:10.055Z";
    const postContent = "Hello, this is my _very_ first **post**.";

    const { viewedPost } = render(<PostDetail />, {
      route: `/post/${postId}`,
      post: {
        _id: postId,
        date: postDate,
        content: postContent,
      },
    });

    await screen.findByText(viewedPost.title);

    screen.getByText(`Written by ${viewedPost.createdBy.name}`);
    screen.getByText("February 06, 2020 | 05:52");
    expect(screen.getByTestId("markdown").innerHTML).toMatchInlineSnapshot(`
      "<p>Hello, this is my <em>very</em> first <strong>post</strong>.</p>
      "
    `);
    expect(screen.queryByTestId("delete")).not.toBeInTheDocument();
  });

  test("can delete a post if is logged in user the post creator", async () => {
    const postId = "1";
    const postDate = "2020-02-06T04:52:10.055Z";
    const postContent = "Hello, this is my _very_ first **post**.";
    const user = userBuilder();

    const { callApiMock } = render(<PostDetail />, {
      route: `/post/${postId}`,
      post: {
        _id: postId,
        date: postDate,
        content: postContent,
      },
      user,
    });

    window.confirm = jest.fn().mockReturnValue(true);

    const deleteIcon = await screen.findByTestId("delete");
    fireEvent.click(deleteIcon);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(callApiMock).toHaveBeenCalledWith(`/post/${postId}`, {
      method: "DELETE",
    });

    await waitForElement(() => screen.getByText("Hello"));
  });
});
