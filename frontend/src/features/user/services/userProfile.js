import { backend } from "@data/services/api";

export async function updateProfile(data) {
    const { data: response } = await backend.patch("/me/profile", data);
    return response.data;
}

export async function changePassword(data) {
    const { data: response } = await backend.patch("/me/password", data);
    return response;
}

export async function uploadAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    const { data: response } = await backend.post("/me/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function getActivityHistory() {
    const { data: response } = await backend.get("/me/activity");
    return response.data.activities;
}
