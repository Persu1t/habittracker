import { configureStore } from '@reduxjs/toolkit';
// importing reducer from habitSlice file
import { habitReducer } from '../redux/habitSlice';

export const store = configureStore({
  reducer: {
    // providing the reducer to store
    habitReducer
  },
});
