import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { uploadAvatar as uploadAvatarApi } from "../services/userProfile";
import { translator as t } from "@data/translations/ar";

export function useUploadAvatar() {
    const queryClient = useQueryClient();

    const { mutate: uploadAvatar, isLoading: isUploading } = useMutation({
        mutationFn: uploadAvatarApi,
        onSuccess: (data) => {
            toast.success(t.messages.avatarUploaded);
            queryClient.setQueryData(["user"], data.user);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { uploadAvatar, isUploading };
}
