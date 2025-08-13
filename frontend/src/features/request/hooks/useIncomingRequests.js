import { useQuery } from "@tanstack/react-query";
import getIncomingRequests from "../services/getIncomingRequests";

function useIncomingRequests() {
  const { data, isPending } = useQuery({
    queryKey: [`incoming-reqs`],
    queryFn: () => getIncomingRequests(),
  });

  return { data, isPending };
}

export default useIncomingRequests;
