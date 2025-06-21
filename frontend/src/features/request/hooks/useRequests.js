import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/getRequests";

function useRequests({ filter }) {
  console.log(filter);
  const { data, isPending } = useQuery({
    queryKey: ["submitted-reqs"],
    queryFn: () => getRequests({ isDraft: filter === "drafts" }),
  });

  return { data, isPending };
}

export default useRequests;
