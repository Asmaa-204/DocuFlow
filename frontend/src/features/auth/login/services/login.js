import { apiRequest } from "@utils/api";

async function login({ email, password }) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  return data.data;
}

export { login };
