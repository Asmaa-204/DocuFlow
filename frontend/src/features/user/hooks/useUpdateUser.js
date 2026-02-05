import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateProfile as updateProfileApi } from "../services/userProfile";
import { translator as t } from "@data/translations/ar";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: (user) => {
            toast.success(t.messages.profileUpdated);
            queryClient.setQueryData(["user"], user);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}
