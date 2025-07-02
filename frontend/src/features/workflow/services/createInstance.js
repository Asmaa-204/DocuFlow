import { apiRequest } from "@utils/api";

async function createInstance(instance) {
  const token = localStorage.getItem("token");
  const data = await apiRequest("/instance", {
    method: "POST",
    body: instance,
    token,
  });
  return data?.data?.instance;
}

export { createInstance };
