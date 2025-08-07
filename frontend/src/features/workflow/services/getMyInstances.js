import { apiRequest } from "@utils/api";

async function getMyInstances() {
  const token = localStorage.getItem("token");

  const data = await apiRequest("/me/instance", {
    method: "GET",
    token,
  });
  return data?.data?.instances;
}

export { getMyInstances };
