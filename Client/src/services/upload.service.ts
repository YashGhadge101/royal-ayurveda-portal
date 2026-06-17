import axios from "axios";

const API_URL = "http://localhost:5000";

// Handles the FormData containing the image file
export const uploadImage = async (formData: FormData) => {
    try {
        const res = await axios.post(`${API_URL}/api/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        // Returns the object containing the filename (e.g., { imageUrl: "12345-image.png" })
        return res.data;
    } catch (error) {
        console.error("Upload service error:", error);
        throw error;
    }
};

// Handles the JSON product data
export const addProduct = async (productData: {
    name: string;
    category: string;
    description: string;
    image: string
}) => {
    try {
        const res = await axios.post(`${API_URL}/products`, productData);
        return res.data;
    } catch (error) {
        console.error("Add product service error:", error);
        throw error;
    }
};