import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api/branch";

const getAuthHeaders = () => ({
    headers: { x_authorization: Cookies.get("accessToken") },
});

const getAllBranches = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAll`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error;
    }
};

const getBranchById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching branch ${id}:`, error);
        throw error;
    }
};

const createBranch = async (branchData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, branchData, getAuthHeaders());
        return response;
    } catch (error) {
        console.error("Error creating branch:", error);
        throw error;
    }
};

const updateBranch = async (id, branchData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, branchData, getAuthHeaders());
        return response;
    } catch (error) {
        console.error(`Error updating branch ${id}:`, error);
        throw error;
    }
};

const deleteBranch = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders());
        return response;
    } catch (error) {
        console.error(`Error deleting branch ${id}:`, error);
        throw error;
    }
};

const deleteMultipleBranches = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/deleteMultiple`, { ids }, getAuthHeaders());
        return response;
    } catch (error) {
        console.error("Error deleting multiple branches:", error);
        throw error;
    }
};

export {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
    deleteMultipleBranches,
};
