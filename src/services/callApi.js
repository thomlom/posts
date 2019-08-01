import axios from "axios";

export const TOKEN_NAME = "events_token";

export default function callApi(endpoint, { ...rest }) {
  const token = window.localStorage.getItem(TOKEN_NAME);

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    headers,
    ...rest,
  });
}
