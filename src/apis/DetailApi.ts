import axios from "axios";

const API_URL ='';
export const handleDetails = async (Ricipes_id) => {
    try {
        const response = await axios.get(`${API_URL}/recipes/${Ricipes_id}`); // Endpoint cho chi tiết món ăn
        return response.data; // Trả về dữ liệu chi tiết món ăn
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null; // Trả về null khi xảy ra lỗi
    }
};