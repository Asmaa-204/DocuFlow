import { useQuery } from "@tanstack/react-query";
import { getMyRequests } from "../services/getMyRequests";

function useRequests({ filter }) {
  const { data, isPending } = useQuery({
    queryKey: [`${filter}-reqs`],
    queryFn: () => getMyRequests({ isDraft: filter === "draft" }),
  });

  return { data, isPending };
}

export default useRequests;
