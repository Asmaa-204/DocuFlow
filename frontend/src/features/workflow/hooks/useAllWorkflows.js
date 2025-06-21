import { useQuery } from "@tanstack/react-query";
import { getAllWorkflows } from "../services/getAllWorkflows";

function useAllWorkflows() {
  const { data, isPending } = useQuery({
    queryKey: ["all-workflows"],
    queryFn: getAllWorkflows,
  });

  return { data, isPending };
}

export { useAllWorkflows };
