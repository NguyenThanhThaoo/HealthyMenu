import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FavoritesScreen from '../screens/recipes/ListScreen';

const ListNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      {/* <Stack.Screen name="SearchEvents" component={SearchEvents} /> */}
    </Stack.Navigator>
  );
};

export default ListNavigator;
