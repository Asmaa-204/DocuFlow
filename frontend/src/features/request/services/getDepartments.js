import { apiRequest } from "@utils/api";

async function getDepartments() {
  const token = localStorage.getItem("token");
  const data = await apiRequest(`/department`, {
    method: "GET",
    token,
  });

  return data?.data?.departments;
}

export { getDepartments };
