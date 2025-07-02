import { API_URL } from "@utils/consts";

async function apiRequest(
  endpoint,
  { method = "GET", body, token, ...customConfig } = {}
) {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method,
    headers,
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (data?.message) {
    throw new Error(data.message);
  }
  return data;
}

export { apiRequest };
