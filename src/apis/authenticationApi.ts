import axios from "axios";
// import  REACT_APP_API_URL  from 'react-native-dotenv';
import { REACT_APP_API_URL } from "@env";
export const authApi = {
    async login(payload: any) {
        try {
           return await axios.post(`${REACT_APP_API_URL}/login`,payload); // Endpoint cho chi tiết món ăn
             // Trả về dữ liệu chi tiết món ăn
        } catch (error) {
            console.error("Message Login:", error);
            return null; // Trả về null khi xảy ra lỗi
        }
    },
    async register(payload: any) {
        try {
           return await axios.post(`${REACT_APP_API_URL}/register`,payload); // Endpoint cho chi tiết món ăn
             // Trả về dữ liệu chi tiết món ăn
        } catch (error) {
            console.error("Message register:", error);
            return null; // Trả về null khi xảy ra lỗi
        }
    },
}
  
//     logout(token: string) {
//       return axiosClient.delete(`/logout/${token}`);
//     },
  
//     getProfile() {
//       return axiosClient.get("/profile");
//     },
//   };
  