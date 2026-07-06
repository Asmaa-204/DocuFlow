import { BASE_URL } from "@utils/consts";

export const getProfilePictureUrl = (filename) => {
  if (!filename) return "/default-user.jpg";
  return `${BASE_URL}/avatars/${filename}`;
};
