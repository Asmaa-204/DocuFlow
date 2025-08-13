import { apiRequest } from "@utils/api";

async function getDocData({ docId }) {
  const token = localStorage.getItem("token");
  const data = await apiRequest(`/document/${docId}`, {
    method: "GET",
    token,
  });
  return data?.data;
}

export { getDocData };
