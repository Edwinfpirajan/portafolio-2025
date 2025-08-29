// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import windowsReducer from './windowsSlice'; 
import startMenuReducer from './startMenuSlice';
import i18nReducer from './i18nSlice';
import mobileReducer from './mobileSlice'; 

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    windows: windowsReducer,
    startMenu: startMenuReducer,
    i18n: i18nReducer,
    mobile: mobileReducer, 
  }
});
