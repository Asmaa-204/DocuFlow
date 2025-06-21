import { useNavigate } from "react-router";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Button = styled.button`
  background: none;
  border: none;
`;

function LogoutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    queryClient.removeQueries();
    queryClient.invalidateQueries();

    localStorage.clear();
    navigate("/login", { replace: true, state: { from: "logout" } });
    toast.success("Logged out successfully");
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
