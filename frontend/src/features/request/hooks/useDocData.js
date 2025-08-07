import { useQuery } from "@tanstack/react-query";
import { getDocData } from "../services/getDocData";

function useDocData({ docId }) {
  const { data, isPending } = useQuery({
    queryKey: [`doc-${docId}`],
    queryFn: () => getDocData({ docId }),
  });

  return { doc: data, isPending };
}

export default useDocData;
