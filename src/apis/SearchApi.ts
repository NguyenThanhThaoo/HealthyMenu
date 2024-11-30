import axios from 'axios';

const API_URL = 'http://<your-api-url>';

export const handleSearch = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { q: query },
        });
        return response.data; // Trả về dữ liệu từ API (kết quả tìm kiếm)
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};
