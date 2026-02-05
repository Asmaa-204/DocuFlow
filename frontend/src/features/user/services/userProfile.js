import { apiRequest } from "@utils/api";

export async function updateProfile(data) {
    const token = localStorage.getItem("token");
    const response = await apiRequest("/me/profile", {
        method: "PATCH",
        body: data,
        token,
    });
    return response.data.user;
}

export async function changePassword(data) {
    const token = localStorage.getItem("token");
    const response = await apiRequest("/me/password", {
        method: "PATCH",
        body: data,
        token,
    });
    return response;
}

export async function uploadAvatar(file) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await apiRequest("/me/avatar", {
        method: "POST",
        body: formData,
        token,
    });
    return response.data;
}

export async function getActivityHistory() {
    const token = localStorage.getItem("token");
    const response = await apiRequest("/me/activity", {
        method: "GET",
        token,
    });
    return response.data.activities;
}
