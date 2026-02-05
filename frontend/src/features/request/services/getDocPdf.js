import { API_URL } from "@utils/consts";

export async function getDocPdf({ docId }) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/document/${docId}/pdf`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch PDF");
    }

    return await res.blob();
}
