import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRequest } from "../services/patchRequest";
import { translator as t } from "@data/translations/ar";

function usePatchRequest(requestId) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: patchRequest,
    onSuccess: () => {
      toast.success(t.messages.requestSent);
      if (requestId) {
        queryClient.removeQueries({ queryKey: [`req-${requestId}`] });
      }
      queryClient.invalidateQueries({ queryKey: ["incoming-reqs"] });
      queryClient.invalidateQueries({ queryKey: ["draft-reqs"] });
      queryClient.invalidateQueries({ queryKey: ["submitted-reqs"] });
    },
    onError: (error) => {
      toast.error(`${t.messages.requestError}: ${error.message}`);
    },
  });

  return { patchRequest: mutate, isPending };
}

export { usePatchRequest };
