import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createInstance } from "../services/createInstance";

function useCreateInstance() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createInstance,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Instance created successfully!");
      navigate(`/workflows/${data.workflowId}/instances/${data.id}`);
    },
    onError: (error) => {
      toast.error(`Error creating instance: ${error.message}`);
    },
  });

  return { createInstance: mutate, isPending };
}

export { useCreateInstance };
