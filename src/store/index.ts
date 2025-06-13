import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notificaton';
import playerReducer from './player';

// This is how we combine reducer when we ahve ultiole reducers
const reducer = combineReducers({
  auth : authReducer,
  notification : notificationReducer,
  player : playerReducer
})

// Creating the main Redux store using Redux Toolkit
const store = configureStore({
  // Object that combines all slices (auth, user, etc.)
  // You will pass your created slices here to manage different parts of state
  reducer,
})

// RootState represents the entire Redux state shape using the return type of store.getState
export type RootState = ReturnType<typeof store.getState>


export default store
