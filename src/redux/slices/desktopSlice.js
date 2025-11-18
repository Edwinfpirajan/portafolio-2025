import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIcon: null,
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
  },
});

export const { selectIcon, clearSelection } = desktopSlice.actions;
export default desktopSlice.reducer;
