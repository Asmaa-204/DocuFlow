import styled from "styled-components";
import { useAuth } from "@context/AuthContext";
import { BASE_URL } from "@utils/consts";

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useAuth();

  const src = user?.profilePicture
    ? `${BASE_URL}${user.profilePicture}`
    : "/default-user.jpg";

  return <Avatar src={src} alt={user?.firstName} />;
}

export default UserAvatar;
