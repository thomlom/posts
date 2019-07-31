import axios from "axios";

export const TOKEN_NAME = "events_token";

export default function callApi(endpoint, { ...rest }) {
  const token = window.localStorage.getItem(TOKEN_NAME);

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({ url: endpoint, headers, ...rest });
}
