import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendRequest } from "../services/sendRequest";

function useSendRequest() {
  const { mutate, isPending } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      toast.success("Request sent successfully!");
    },
    onError: (error) => {
      toast.error(`Error sending request: ${error.message}`);
    },
  });

  return { mutate, isPending };
}

export { useSendRequest };
