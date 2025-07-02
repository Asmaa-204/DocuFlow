import { apiRequest } from "@utils/api";

async function signup(user) {
  const data = await apiRequest("/auth/signup", {
    method: "POST",
    body: user,
  });
  return data?.data;
}

export { signup };
