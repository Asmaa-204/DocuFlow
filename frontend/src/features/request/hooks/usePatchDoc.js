import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchDocument } from "../services/patchDocument";
import { translator as t } from "@data/translations/ar";

function usePatchDoc(docId) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: patchDocument,
    onSuccess: () => {
      toast.success(t.messages.documentSaved);
      queryClient.removeQueries({ queryKey: [`doc-${docId}`] });
    },
    onError: (error) => {
      toast.error(`${t.messages.errorSaving}: ${error.message}`);
    },
  });

  return { patchDocument: mutate, isPending };
}

export { usePatchDoc };