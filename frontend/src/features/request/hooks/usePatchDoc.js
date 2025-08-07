import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { patchDocument } from "../services/patchDocument";

function usePatchDoc() {
  const { mutate, isPending } = useMutation({
    mutationFn: patchDocument,
    onSuccess: () => {
      toast.success("Document saved successfully!");
    },
    onError: (error) => {
      toast.error(`Error saving document: ${error.message}`);
    },
  });

  return { patchDocument: mutate, isPending };
}

export { usePatchDoc };
