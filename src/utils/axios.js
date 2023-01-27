import axios from "axios";

export async function axiosPost(url, body, config = {}) {
  config.headers = { ...config.headers, ...authHeaders() };
  try {
    const response = await axios.post(url, body, config);
    return response.data;
  } catch (error) {
    console.log("Request Error\n", error, error?.response?.data);
  }
}

export async function axiosGet(url, config = {}) {
  config.headers = { ...config.headers, ...authHeaders() };
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log("Request Error\n", error, error?.response?.data);
  }
}

function authHeaders() {
  const token = localStorage?.getItem("token") ?? "";
  return { Authorization: "Bearer " + token };
}
