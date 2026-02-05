import { useQuery } from "@tanstack/react-query";
import { getRequestData } from "../services/getRequestData";

function useRequestData({ requestId }) {
  const { data, isPending } = useQuery({
    queryKey: [`req-${requestId}`],
    queryFn: () => getRequestData({ requestId }),
    enabled: Boolean(requestId),
    refetchOnMount: 'always',
  });

  return { request: data, isPending };
}

export default useRequestData;
