import { apiRequest } from "@utils/api";

async function getMyInstances() {
  const token = localStorage.getItem("token");

  //! TODO: return the url to /me/instance after UI development
  const data = await apiRequest("/instance", {
    method: "GET",
    token,
  });
  return data?.data?.instances;
}

export { getMyInstances };
