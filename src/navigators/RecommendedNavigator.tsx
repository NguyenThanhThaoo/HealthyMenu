import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HealthFormScreen from '../screens/recommended/HealthFormScreen';

type RootStackParamList = {
  HealthFormScreen: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RecommededNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HealthFormScreen" component={HealthFormScreen} />
    </Stack.Navigator>
  );
};

export default RecommededNavigator;
