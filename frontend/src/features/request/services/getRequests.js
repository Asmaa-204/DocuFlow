import { apiRequest } from "@utils/api";

async function getRequests({ isDraft }) {
  console.log(isDraft);
  const token = localStorage.getItem("token");
  const data = await apiRequest(
    `/me/request?status=${isDraft ? "draft" : "pending"}`,
    {
      method: "GET",
      token,
    }
  );
  return data.data?.requests;
}

export { getRequests };
