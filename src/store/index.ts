import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';

// Creating the main Redux store using Redux Toolkit
const store = configureStore({
  // Object that combines all slices (auth, user, etc.)
  // You will pass your created slices here to manage different parts of state
  reducer: authReducer,
});


export default store
