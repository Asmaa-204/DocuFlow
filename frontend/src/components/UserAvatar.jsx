import styled from "styled-components";
import { useAuth } from "@context/AuthContext";

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
    ? `http://localhost:5000${user.profilePicture}`
    : "/default-user.jpg";

  return <Avatar src={src} alt={user?.firstName} />;
}

export default UserAvatar;
