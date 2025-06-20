import { API_URL } from "@consts";

async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }
  return data.data;
}

export { login };
