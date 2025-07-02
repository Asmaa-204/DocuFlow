import { apiRequest } from "@utils/api";

async function getAllWorkflows() {
  const token = localStorage.getItem("token");
  const data = await apiRequest("/workflow", {
    method: "GET",
    token,
  });
  return data?.data?.workflows;
}

export { getAllWorkflows };
