import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changePassword as changePasswordApi } from "../services/userProfile";
import { translator as t } from "@data/translations/ar";

export function useUpdatePassword() {
    const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: () => {
            toast.success(t.messages.passwordChanged);
        },
        onError: (err) => toast.error(err.message),
    });

    return { updatePassword, isUpdating };
}
