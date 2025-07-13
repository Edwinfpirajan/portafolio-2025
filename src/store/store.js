// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import windowsReducer from './windowsSlice'; 
import startMenuReducer from './startMenuSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    windows: windowsReducer,
    startMenu: startMenuReducer,
  }
});
