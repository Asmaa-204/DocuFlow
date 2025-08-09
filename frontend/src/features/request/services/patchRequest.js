import { apiRequest } from "@utils/api";

async function patchRequest({ request, id }) {
  console.log("Request to patch:", request, "with ID:", id);
  const token = localStorage.getItem("token");
  const data = await apiRequest(`/request/${id}`, {
    method: "PATCH",
    body: request,
    token,
  });
  return data.data;
}

export { patchRequest };
