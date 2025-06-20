import { API_URL } from "@consts";

async function signup(user) {
  console.log("inside signup");
  console.log(user);
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();

  if (data.status !== "success") {
    console.error(data);
    throw new Error(data.message);
  }
  return data.data;
}

export { signup };
