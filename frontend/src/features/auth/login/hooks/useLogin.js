import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login } from "../services/login";
import { translator as t } from "@data/translations/ar";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
      toast.success(t.messages.loggedIn);
    },
  });

  return { login: mutate, isPending };
}

export { useLogin };
