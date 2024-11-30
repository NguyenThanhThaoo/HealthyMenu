import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import ListNavigator from './ListNavigator';
import DrinksNavigator from './DrinksNavigator';
// import { AddNewScreen } from '../screens';
import ProfileNavigator from './ProfileNavigator';
import { appColors } from '../constants/appColors';
import {
  Coffee,
  HeartCircle,
  ProfileCircle,
  Like
} from 'iconsax-react-native';
import { CircleComponent, TextComponent, TagBarComponent } from '../components';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyles';
import { HomeScreen } from '../screens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray5;
          size = 24;
          switch (route.name) {
            case 'Đồ uống':
              icon = <Coffee size={size} color={color} />;
              break;
            case 'Món ăn':
              icon = <MaterialIcons name="ramen-dining" size={size} color={color} />;
              break;
            case 'Yêu thích':
              icon = <Like size={size} variant="Bold" color={color} />;
              break;
            case 'Hồ sơ':
              icon = <ProfileCircle size={size} variant="Bold" color={color} />;
              break;
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel: ({ focused }) => {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray5}
              styles={{
                marginBottom: Platform.OS === 'android' ? 12 : 0,
              }}
            />
          );
        },
        tabBarVisible: true,
      })}
    >
      <Tab.Screen name="Món ăn" component={HomeScreen} />
      <Tab.Screen name="Đồ uống" component={DrinksNavigator} />
      <Tab.Screen name="Yêu thích" component={ListNavigator} />
      <Tab.Screen name="Hồ sơ" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;