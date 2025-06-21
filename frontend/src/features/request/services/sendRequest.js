import { API_URL } from "@utils/consts";

async function sendRequest(request) {
  const res = await fetch(`${API_URL}/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  console.log(data);

  if (data?.message) {
    throw new Error(data.message);
  }
  return data?.request;
}

export { sendRequest };
