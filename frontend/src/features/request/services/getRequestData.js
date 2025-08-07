import { apiRequest } from "@utils/api";

async function getRequestData({ requestId }) {
  console.log(requestId);
  const token = localStorage.getItem("token");
  const data = await apiRequest(`/request/${requestId}`, {
    method: "GET",
    token,
  });
  return data.data?.request;
}

export { getRequestData };
