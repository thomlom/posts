import axiosMock from "axios";

import callApi, { TOKEN_NAME } from "./callApi";

jest.mock("axios");

const API_URL = "https://myapi.com";
const path = "/post";

describe("callApi", () => {
  beforeEach(() => {
    process.env.REACT_APP_API_URL = API_URL;
  });

  afterEach(() => axiosMock.mockClear());

  test("calls axios without token", () => {
    callApi(path);
    expect(axiosMock).toHaveBeenCalledWith({ url: API_URL + path });
  });

  test("all the parameters are passed", () => {
    const params = { method: "POST", foo: "bar" };
    callApi(path, params);
    expect(axiosMock).toHaveBeenCalledWith({ url: API_URL + path, ...params });
  });

  test("a token is passed in Authorization headers if in localStorage", () => {
    const token = "my token";
    window.localStorage.setItem(TOKEN_NAME, "my token");

    callApi(path);
    expect(axiosMock).toHaveBeenCalledWith({
      url: API_URL + path,
      headers: { Authorization: `Bearer ${token}` },
    });
  });
});
