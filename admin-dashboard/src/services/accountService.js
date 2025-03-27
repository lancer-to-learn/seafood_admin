import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api/account";

const getAuthHeaders = () => ({
    headers: { x_authorization: Cookies.get("accessToken") },
});

const getAdminAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAdmins`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error;
    }
};

export {
    getAdminAccounts
};
