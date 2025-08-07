import { apiRequest } from "@utils/api";

async function patchDocument({ docData, id }) {
  const token = localStorage.getItem("token");
  const data = await apiRequest(`/document/${id}`, {
    method: "PATCH",
    body: { data: docData },
    token,
  });
  return data.data;
}

export { patchDocument };
