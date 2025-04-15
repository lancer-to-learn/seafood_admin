import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api/product";

const getAuthHeaders = () => ({
    headers: { x_authorization: Cookies.get("accessToken") },
});

const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAll`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, productData, getAuthHeaders());
        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, productData, getAuthHeaders());
        return response;
    } catch (error) {
        console.error(`Error updating product ${id}:`, error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders());
        return response;
    } catch (error) {
        console.error(`Error deleting product ${id}:`, error);
        throw error;
    }
};

const deleteMultipleProducts = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/deleteMultiple`, { ids }, getAuthHeaders());
        return response;
    } catch (error) {
        console.error("Error deleting multiple products:", error);
        throw error;
    }
};

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
};
