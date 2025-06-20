import { API_URL } from "@consts";

async function getUser() {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();

  return data;
}

export { getUser };
