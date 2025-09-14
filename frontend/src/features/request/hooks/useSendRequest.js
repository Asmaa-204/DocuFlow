import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "../services/sendRequest";
import { translator as t } from "@data/translations/ar";

function useSendRequest() {
  const { mutate, isPending } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      toast.success(t.messages.requestSent);
    },
    onError: (error) => {
      toast.error(`${t.messages.requestError}: ${error.message}`);
    },
  });

  return { sendRequest: mutate, isPending };
}

export { useSendRequest };
