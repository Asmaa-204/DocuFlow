import { useQuery } from "@tanstack/react-query";
import { getActivityHistory } from "../services/userProfile";

export function useActivityHistory() {
    const {
        isLoading,
        data: activities,
        error,
    } = useQuery({
        queryKey: ["activities"],
        queryFn: getActivityHistory,
    });

    return { isLoading, error, activities };
}
