import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "../services/sendRequest";

function useSendRequest() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      toast.success("Request sent successfully!");
      navigate("/requests/submitted");
    },
    onError: (error) => {
      toast.error(`Error sending request: ${error.message}`);
    },
  });

  return { mutate, isPending };
}

export { useSendRequest };
