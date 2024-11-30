import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen, ProfileScreen} from '../screens';
import DrinksRecipes from '../screens/recipes/DrinksRecipes';

const DrinksNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DrinksScreen" component={DrinksRecipes} />
    </Stack.Navigator>
  );
};

export default DrinksNavigator;
