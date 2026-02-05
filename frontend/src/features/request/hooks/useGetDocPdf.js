import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getDocPdf } from "../services/getDocPdf";

export function useGetDocPdf({ docId, enabled = true }) {
    const { data: blob, isPending, error, refetch } = useQuery({
        queryKey: ["doc-pdf", docId],
        queryFn: () => getDocPdf({ docId }),
        enabled: !!docId && enabled,
        staleTime: 0,
    });

    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            setUrl(blobUrl);
            return () => URL.revokeObjectURL(blobUrl);
        }
    }, [blob]);

    return { url, isPending, error, refetch };
}
