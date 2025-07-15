import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/getRequests";

function useRequests({ filter }) {
  const { data, isPending } = useQuery({
    queryKey: [`${filter}-reqs`],
    queryFn: () => getRequests({ isDraft: filter === "draft" }),
  });

  return { data, isPending };
}

export default useRequests;
