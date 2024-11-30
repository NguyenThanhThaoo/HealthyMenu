import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('auth');
    if (userData !== null) {
        // console.log("okokok",JSON.parse(userData))
      return JSON.parse(userData);  // Chuyển đổi lại dữ liệu từ chuỗi JSON thành đối tượng
    }
    return null;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    return null;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error('Lỗi khi lấy access token:', error);
    return null;
  }
};
