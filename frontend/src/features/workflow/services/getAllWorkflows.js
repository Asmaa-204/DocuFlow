import { API_URL } from "@utils/consts";

async function getAllWorkflows() {
  const res = await fetch(`${API_URL}/workflow`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (data?.message) {
    throw new Error(data.message);
  }

  return data?.data?.workflows;
}

export { getAllWorkflows };
