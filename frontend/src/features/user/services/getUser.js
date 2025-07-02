import { apiRequest } from "@utils/api";

async function getUser() {
  const token = localStorage.getItem("token");
  const data = await apiRequest("/me", {
    method: "GET",
    token,
  });
  return data.data.user;
}

export { getUser };
