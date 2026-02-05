import { useQuery } from "@tanstack/react-query";
import { getMyRequests } from "../services/getMyRequests";

function useRequests({ filter, status, sortBy }) {
  const { data, isPending } = useQuery({
    queryKey: [`${filter}-reqs`, status, sortBy],
    queryFn: () =>
      getMyRequests({
        isDraft: filter === "draft",
        status,
        sortBy,
      }),
  });

  return { data, isPending };
}

export default useRequests;
