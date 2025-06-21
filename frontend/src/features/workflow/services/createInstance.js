import { API_URL } from "@consts";

async function createInstance(instance) {
  const res = await fetch(`${API_URL}/instance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(instance),
  });
  const data = await res.json();
  if (data?.message) {
    throw new Error(data.message);
  }
  return data?.data?.instance;
}

export { createInstance };
