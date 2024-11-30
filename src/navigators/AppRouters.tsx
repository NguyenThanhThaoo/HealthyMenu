import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {SplashScreen} from '../screens';
import TabNavigator from './TabNavigator';

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(false);

  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.parse(res)));
  };

//   return (
//     <>
//       {isShowSplash ? (
//         <SplashScreen />
//       ) : auth.accesstoken ? (
//         <MainNavigator />
//       ) : (
//         <AuthNavigator />
//       )}
//     </>
//   );
// };

return (
  <>
  {/* <TabNavigator></TabNavigator> */}
    <MainNavigator ></MainNavigator>
  </>
);
};

export default AppRouters;

// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAuth, authSelector } from '../redux/reducers/authReducer';
// import AuthNavigator from './AuthNavigator';
// import MainNavigator from './MainNavigator';
// import { SplashScreen } from '../screens';

// const Stack = createNativeStackNavigator();

// const AppRouters = () => {
//   const [isShowSplash, setIsShowSplash] = useState(true); // Hiển thị SplashScreen ban đầu

//   const { getItem } = useAsyncStorage('auth');

//   const auth = useSelector(authSelector);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkLogin = async () => {
//       const res = await getItem();
//       if (res) {
//         dispatch(addAuth(JSON.parse(res)));
//       }
//       setIsShowSplash(false); // Ẩn SplashScreen sau khi kiểm tra đăng nhập
//     };

//     checkLogin();
//   }, []);

//   if (isShowSplash) {
//     return <SplashScreen />; // Hiển thị SplashScreen khi đang kiểm tra
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {auth.accesstoken ? (
//         <Stack.Screen name="Main" component={MainNavigator} />
//       ) : (
//         <Stack.Screen name="Auth" component={AuthNavigator} />
//       )}
//     </Stack.Navigator>
//   );
// };

// export default AppRouters;