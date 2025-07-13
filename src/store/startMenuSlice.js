// store/startMenuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  recentApps: [],  
  favorites: []    
};

const startMenuSlice = createSlice({
  name: 'startMenu',
  initialState,
  reducers: {
    toggleStartMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    openStartMenu: (state) => {
      state.isOpen = true;
    },
    closeStartMenu: (state) => {
      state.isOpen = false;
    },
    addRecentApp: (state, action) => {
      const app = action.payload;
      state.recentApps = [app, ...state.recentApps.filter(a => a !== app)].slice(0, 5);
    },
    addFavorite: (state, action) => {
      const app = action.payload;
      if (!state.favorites.includes(app)) state.favorites.push(app);
    },
    removeFavorite: (state, action) => {
      const app = action.payload;
      state.favorites = state.favorites.filter(a => a !== app);
    }
  }
});

export const {
  toggleStartMenu,
  openStartMenu,
  closeStartMenu,
  addRecentApp,
  addFavorite,
  removeFavorite
} = startMenuSlice.actions;

export default startMenuSlice.reducer;
