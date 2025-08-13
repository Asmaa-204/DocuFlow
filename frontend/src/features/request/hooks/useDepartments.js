import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../services/getDepartments";

function useDepartments() {
  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  return { departments: data, isPending };
}

export default useDepartments;
