/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import React from 'react';
// import {Provider} from 'react-redux';
// import store from './src/redux/store'; // Đường dẫn đến store
// import App from './src/screens/home/HomeScreen'; // Hoặc dùng HomeScreen nếu cần
// import {name as appName} from './app.json';
// import HomeScreen from './src/screens/home/HomeScreen';
// import AppRouters from './src/navigators/AppRouters';

// const Root = () => (
//   <Provider store={store}>
//     <AppRouters /> {/* Đây có thể là HomeScreen hoặc AppRouters */}
//   </Provider>
// );

// AppRegistry.registerComponent(appName, () => Root);
