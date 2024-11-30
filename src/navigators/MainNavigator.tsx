// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import React from 'react';
// import TabNavigator from './TabNavigator';
// import { HomeScreen, LoginScreen, SignUpScreen } from '../screens';
// import RecipesDetail from '../screens/recipes/RecipesDetailsScreen';
// import HealthFormScreen from '../screens/recommended/HealthFormScreen';


// const MainNavigator = () => {
//   const Stack = createNativeStackNavigator();

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//         <Stack.Screen name="HealthForm" component={HealthFormScreen} />
//       {/* <Stack.Screen name="Main" component={TabNavigator} /> */}
//       {/* <Stack.Screen name="Detail" component={RecipesDetail} /> */}
//       {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
//       {/* <Stack.Screen name="Signup" component={SignUpScreen} /> */}
//     </Stack.Navigator>
//   );
// };

// export default MainNavigator;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import { HomeScreen, LoginScreen, SignUpScreen } from '../screens';
import RecipesDetail from '../screens/recipes/RecipesDetailsScreen';
import HealthFormScreen from '../screens/recommended/HealthFormScreen';
import EditProfileScreen from '../screens/profiles/EditProfileScreen'
// type RootStackParamList = {
//   HealthForm: undefined;
//   Main: undefined; // Màn hình chính, nếu có
//   Login: undefined;
//   Detail: undefined;
//   Signup: undefined;
// };
export type RootStackParamList = {
  HealthFormScreen: undefined;
  Main: undefined;
  Login: undefined;
  Detail: { recipeId: string }; // Bổ sung tham số điều hướng nếu cần
  Signup: undefined;
  Favorites: undefined;
  Home: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} /> */}
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="HealthFormScreen" component={HealthFormScreen} />
      <Stack.Screen name="Detail" component={RecipesDetail} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />

    </Stack.Navigator>
  );
};

export default MainNavigator;

