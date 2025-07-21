import { createSlice } from '@reduxjs/toolkit';

let zCounter = 1;

const initialState = {
  windows: {}
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    openWindow(state, action) {
      const { name, title, icon } = action.payload;
      if (!state.windows[name]) {
        state.windows[name] = {
          open: true,
          minimized: false,
          maximized: true,
          x: 100,
          y: 100,
          width: 800,
          height: 600,
          zIndex: zCounter++,
          title,
          icon
        };
      } else {
        state.windows[name].open = true;
        state.windows[name].minimized = false; // ✅ Restaurar si ya existe
        state.windows[name].zIndex = zCounter++;
      }
    },
    closeWindow(state, action) {
      const name = action.payload;
      if (state.windows[name]) state.windows[name].open = false;
    },
    minimizeWindow(state, action) {
      const name = action.payload;
      if (state.windows[name]) state.windows[name].minimized = true;
    },
    maximizeWindow(state, action) {
      const name = action.payload;
      if (state.windows[name]) {
        state.windows[name].maximized = !state.windows[name].maximized;
      }
    },
    bringToFront(state, action) {
      const name = action.payload;
      if (state.windows[name]) {
        state.windows[name].zIndex = zCounter++;
      }
    },
    moveWindow(state, action) {
      const { name, x, y } = action.payload;
      if (state.windows[name]) {
        state.windows[name].x = x;
        state.windows[name].y = y;
      }
    },
    resizeWindow(state, action) {
      const { name, width, height } = action.payload;
      if (state.windows[name]) {
        state.windows[name].width = width;
        state.windows[name].height = height;
      }
    },
    restoreWindow(state, action) {
      const name = action.payload;
      if (state.windows[name]) {
        state.windows[name].minimized = false;
        state.windows[name].zIndex = zCounter++;
      }
    }
  }
});

export const {
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  bringToFront,
  moveWindow,
  resizeWindow,
  restoreWindow
} = windowsSlice.actions;

export default windowsSlice.reducer;
