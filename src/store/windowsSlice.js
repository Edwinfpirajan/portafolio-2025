import { createSlice } from '@reduxjs/toolkit';

// Windows z-index must stay below the taskbar (z-50)
// Start around 20 so they stay above desktop icons (z-10) but below the taskbar
let zCounter = 20;

const initialState = {
  windows: {}
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    rebaseZ(state) {
      // Set zCounter to one above the max existing zIndex to preserve layering after rehydrate
      const maxZ = Object.values(state.windows || {}).reduce((m, w) => Math.max(m, w.zIndex || 0), 0);
      if (maxZ >= 20) {
        zCounter = maxZ + 1;
      }
    },
    openWindow(state, action) {
      const { name, title, icon, initial = {} } = action.payload;
      if (!state.windows[name]) {
        state.windows[name] = {
          open: true,
          minimized: false,
          maximized: initial.maximized !== undefined ? initial.maximized : true,
          x: initial.x !== undefined ? initial.x : 100,
          y: initial.y !== undefined ? initial.y : 100,
          width: initial.width !== undefined ? initial.width : 800,
          height: initial.height !== undefined ? initial.height : 600,
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
  rebaseZ,
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
