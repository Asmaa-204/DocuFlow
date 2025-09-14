import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { patchDocument } from "../services/patchDocument";
import { translator as t } from "@data/translations/ar";

function usePatchDoc() {
  const { mutate, isPending } = useMutation({
    mutationFn: patchDocument,
    onSuccess: () => {
      toast.success(t.messages.documentSaved);
    },
    onError: (error) => {
      toast.error(`${t.messages.errorSaving}: ${error.message}`);
    },
  });

  return { patchDocument: mutate, isPending };
}

export { usePatchDoc };
