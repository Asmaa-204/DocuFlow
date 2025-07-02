import { apiRequest } from "@utils/api";

async function sendRequest(request) {
  const token = localStorage.getItem("token");
  const data = await apiRequest("/request", {
    method: "POST",
    body: request,
    token,
  });
  return data?.request;
}

export { sendRequest };
