import { useQuery } from "@tanstack/react-query";
import { getRequestData } from "../services/getRequestData";
import { useParams } from "react-router-dom";

function useRequestData() {
  const { requestId } = useParams();
  console.log(requestId);

  const { data, isPending } = useQuery({
    queryKey: [`req-${requestId}`],
    queryFn: () => getRequestData({ requestId }),
  });

  return { request: data, isPending };
}

export default useRequestData;
