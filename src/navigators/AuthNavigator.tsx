import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { LoginScreen, SignUpScreen, ProfileScreen} from '../screens';
import ForgotPassword from '../screens/auth/ForgotPassword';
// import OnbroadingScreen from '../screens/auth/OnbroadingScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Verification from '../screens/auth/Verification';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const [isExistingUser, setIsExistingUser] = useState(false);

  // useEffect(() => {
  //   checkUserExisting();
  // }, []);

  // const checkUserExisting = async () => {
  //   const res = await AsyncStorage.getItem('auth');

  //   res && setIsExistingUser(true);
  // };

  // console.log(isExistingUser);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      {/* <Stack.Screen name="Verification" component={Verification} /> */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
