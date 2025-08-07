import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { createInstance } from "../services/createInstance";
import { useSendRequest } from "@features/request/hooks/useSendRequest";

function useCreateInstance() {
  const navigate = useNavigate();
  const { sendRequest } = useSendRequest();

  const { mutate, isPending } = useMutation({
    mutationFn: createInstance,
    onSuccess: (instance) => {
      toast.success("Instance created successfully!");
      sendRequest(
        { instanceId: instance.id, note: "" },
        {
          onSuccess: (request) => {
            navigate(
              `/workflows/${instance.workflowId}/instances/${instance.id}/request/${request.id}`
            );
          },
        }
      );
    },
    onError: (error) => {
      toast.error(`Error creating instance: ${error.message}`);
    },
  });

  return { createInstance: mutate, isPending };
}

export { useCreateInstance };
