import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { patchRequest } from "../services/patchRequest";

function usePatchRequest() {
  const { mutate, isPending } = useMutation({
    mutationFn: patchRequest,
    onSuccess: () => {
      toast.success("Request sent successfully!");
    },
    onError: (error) => {
      toast.error(`Error sending request: ${error.message}`);
    },
  });

  return { patchRequest: mutate, isPending };
}

export { usePatchRequest };
