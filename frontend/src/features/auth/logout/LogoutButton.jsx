import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import toast from "react-hot-toast";

import { translator as t } from "@data/translations/ar";

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
    toast.success(t.messages.loggedOut);
  }

  return <Button onClick={handleLogout}>{t.navigation.logout}</Button>;
}

export default LogoutButton;
