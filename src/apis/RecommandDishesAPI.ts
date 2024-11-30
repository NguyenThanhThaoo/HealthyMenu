import axios from "axios";
// import  REACT_APP_API_URL  from 'react-native-dotenv';
import { REACT_APP_API_URL } from "@env";
export const RecommandDishesAPI = {
    async submitFormInfo(payload: any,accessToken:any) {
        try {
            console.log(payload,accessToken)
           return await axios.put(`${REACT_APP_API_URL}/infor_user`,payload,{
            headers:{
                Authorization: `${accessToken}`
            }
           }); // Endpoint cho chi tiết món ăn
             // Trả về dữ liệu chi tiết món ăn
        } catch (error) {
            console.error("Message:", error);
            return null; // Trả về null khi xảy ra lỗi
        }
    },
    async RecommandDishes(accessToken:any) {
        try {
           return await axios.get(`${REACT_APP_API_URL}/recommand_dishes`,{
            headers:{
                Authorization: `${accessToken}`
            }
           }); // Endpoint cho chi tiết món ăn
             // Trả về dữ liệu chi tiết món ăn
        } catch (error) {
            console.error("Message register:", error);
            return null; // Trả về null khi xảy ra lỗi
        }
    },
}
// này đâu có phân trang hả hong á, là lướt xuống quài luôn hả, trả về bao nhiu món tầm 30
  