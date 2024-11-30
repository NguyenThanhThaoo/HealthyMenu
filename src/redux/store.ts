// import {configureStore} from '@reduxjs/toolkit';
// import {authReducer} from './reducers/authReducer';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;