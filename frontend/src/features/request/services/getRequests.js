import { apiRequest } from "@utils/api";

async function getRequests({ isDraft }) {
  //TODO: add {"isDraft": isDraft} to the request body
  const token = localStorage.getItem("token");
  const data = await apiRequest("/request", {
    method: "GET",
    token,
  });
  return data.data?.requests;
}

export { getRequests };
