import styled from "styled-components";
import { useAuth } from "@context/AuthContext";
import { BASE_URL } from "@utils/consts";
import { getProfilePictureUrl } from "@features/user/utils";

export const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useAuth();

  const src = getProfilePictureUrl(user?.profilePicture);

  return <Avatar src={src} alt={user?.firstName} />;
}

export default UserAvatar;
