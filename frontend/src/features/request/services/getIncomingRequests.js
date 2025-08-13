import { apiRequest } from "@utils/api";

async function getIncomingRequests() {

    const token = localStorage.getItem("token");
    const data = await apiRequest("/me/request?type=inbox",
        {
            method: "GET",
            token,
        }
    );

    return data.data?.requests;
}

export default getIncomingRequests;