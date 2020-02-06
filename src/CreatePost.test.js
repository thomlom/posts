import React from "react";
import { render as rtlRender, fireEvent, wait } from "@testing-library/react";
import axiosMock from "axios";
import { build, fake } from "@jackfranklin/test-data-bot";

import callApiMock from "./services/callApi";
import CreatePost from "./CreatePost";
import PostProvider from "./PostProvider";

jest.mock("axios");
jest.mock("./services/callApi");

const postBuilder = build("Post", {
  fields: {
    title: fake(f => f.lorem.words()),
    content: fake(f => f.lorem.sentences()),
    fileName: fake(f => f.system.commonFileName()),
  },
});

async function render(ui) {
  callApiMock.mockImplementation(url => {
    if (url === "/post/all") {
      return Promise.resolve({ data: {} });
    }

    throw new Error(`The endpoint passed haven't been mocked: ${url}`);
  });

  const dispatch = jest.fn();
  const utils = rtlRender(
    <PostProvider value={{ dispatch }}>{ui}</PostProvider>
  );
  expect(utils.getByText(/loading/i)).toBeInTheDocument();
  await wait();

  callApiMock.mockReset();

  return {
    ...utils,
    dispatch,
  };
}

describe("CreatePost", () => {
  let uploadedFileUrl = "https://dog.com/dog.jpg";
  beforeEach(() => {
    axiosMock.post.mockResolvedValue({
      data: {
        secure_url: uploadedFileUrl,
      },
    });
  });

  afterEach(() => {
    axiosMock.post.mockRestore();
  });

  test("uploads an image", async () => {
    const { getByText, getByLabelText, findByAltText } = await render(
      <CreatePost />
    );
    const image = getByLabelText(/image/i);
    const fileName = fake(f => f.system.commonFileName());

    fireEvent.change(image, { target: { files: [fileName] } });

    expect(getByText(/uploading/i)).toBeInTheDocument();
    const img = await findByAltText(/Upload /);
    expect(img.src).toBe(uploadedFileUrl);
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
  });

  test("creates a new post", async () => {
    const historyMock = { push: jest.fn() };
    const { getByText, getByLabelText, dispatch } = await render(
      <CreatePost history={historyMock} />
    );
    const returnValue = { _id: 1 };
    callApiMock.mockResolvedValue({
      data: { data: returnValue },
    });

    const post = postBuilder();

    const image = getByLabelText(/image/i);
    const title = getByLabelText(/title/i);
    const content = getByLabelText(/content/i);
    const button = getByText(/create/i);

    fireEvent.change(image, { target: { files: [post.fileName] } });
    await wait();
    fireEvent.change(title, { target: { value: post.title } });
    fireEvent.change(content, { target: { value: post.content } });
    fireEvent.click(button);
    await wait();

    expect(callApiMock).toHaveBeenCalledWith("/post", {
      method: "POST",
      data: {
        title: post.title,
        content: post.content,
        image: uploadedFileUrl,
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ADD",
      payload: returnValue,
    });
    expect(historyMock.push).toHaveBeenCalledWith(`/post/${returnValue._id}`);
  });
});
