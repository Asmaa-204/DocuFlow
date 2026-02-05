import { API_URL } from "@utils/consts";
import { translator as t } from "@data/translations/ar";

async function apiRequest(
  endpoint,
  { method = "GET", body, token, ...customConfig } = {}
) {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    method,
    headers,
    ...customConfig,
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || t.general.error);
  }

  return data;
}

export { apiRequest };
