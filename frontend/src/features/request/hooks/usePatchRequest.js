import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { patchRequest } from "../services/patchRequest";
import { translator as t } from "@data/translations/ar";

function usePatchRequest() {
  const { mutate, isPending } = useMutation({
    mutationFn: patchRequest,
    onSuccess: () => {
      toast.success(t.messages.requestSent);
    },
    onError: (error) => {
      toast.error(`${t.messages.requestError}: ${error.message}`);
    },
  });

  return { patchRequest: mutate, isPending };
}

export { usePatchRequest };
