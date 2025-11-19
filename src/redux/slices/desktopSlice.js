import { createSlice } from "@reduxjs/toolkit";

const GRID_SIZE = 96; // Tamaño del bloque del grid (80px icon + 16px gap)

const initialState = {
  selectedIcon: null,
  iconPositions: {}, // { iconKey: { x: gridX, y: gridY } }
  draggingIcon: null, // iconKey of the icon being dragged
  dragOffset: { x: 0, y: 0 }, // Current drag offset
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    selectIcon(state, { payload }) {
      state.selectedIcon = payload || null;
    },
    clearSelection(state) {
      state.selectedIcon = null;
    },
    setIconPosition(state, { payload }) {
      const { key, x, y } = payload;
      state.iconPositions[key] = { x, y };
    },
    initializeIconPositions(state, { payload }) {
      // payload: array of icon keys
      if (!payload) return;
      let col = 0;
      let row = 0;
      payload.forEach((key) => {
        if (!state.iconPositions[key]) {
          state.iconPositions[key] = { x: col, y: row };
          row++;
          if (row >= 8) { // Max 8 rows per column
            row = 0;
            col++;
          }
        }
      });
    },
    resetIconPositions(state) {
      state.iconPositions = {};
    },
    setDraggingIcon(state, { payload }) {
      state.draggingIcon = payload; // iconKey or null
    },
    setDragOffset(state, { payload }) {
      state.dragOffset = payload; // { x, y }
    },
    clearDrag(state) {
      state.draggingIcon = null;
      state.dragOffset = { x: 0, y: 0 };
    }
  },
});

export const { 
  selectIcon, 
  clearSelection, 
  setIconPosition, 
  initializeIconPositions,
  resetIconPositions,
  setDraggingIcon,
  setDragOffset,
  clearDrag
} = desktopSlice.actions;

export default desktopSlice.reducer;
