import { apiRequest } from "@utils/api";

async function getMyRequests({ isDraft }) {
  const token = localStorage.getItem("token");
  const data = await apiRequest(
    `/me/request?type=sent&status=${isDraft ? "draft" : "pending"}`,
    {
      method: "GET",
      token,
    }
  );
  return data.data?.requests;
}

export { getMyRequests };
