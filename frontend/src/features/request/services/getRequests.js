import { API_URL } from "@utils/consts";

async function getRequests({ isDraft }) {
  //TODO: add {"isDraft": isDraft} to the request body
  const res = await fetch(`${API_URL}/request`, {
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

  return data.data?.requests;
}

export { getRequests };
