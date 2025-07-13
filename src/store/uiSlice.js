import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    colors: {
      taskbar: "#FF00D4",
      windowTitleBar: "#FF00D4",
      buttonBackground: "#ffffff",
    },
    fonts: {
      system: "sans-serif",
      windowContent: "sans-serif",
    },
    background: {
      image: "",
      opacity: 1,
    },
    contrast: "normal",
    syncTaskbarAndTitlebarColors: false, 
  };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGlobalTheme(state, action) {
      state.theme = action.payload;
    },
    setColor(state, action) {
      const { element, value } = action.payload;
      state.colors[element] = value;
    },
    setFontFamily(state, action) {
      const { type, value } = action.payload;
      state.fonts[type] = value;
    },
    setBackgroundImage(state, action) {
      const { image, opacity } = action.payload;
      state.background.image = image;
      if (opacity !== undefined) {
        state.background.opacity = opacity;
      }
    },
    setContrast(state, action) {
      state.contrast = action.payload;
    },
    setSyncColors(state, action) {
        state.syncTaskbarAndTitlebarColors = action.payload;
      }
  },
});

export const {
  setGlobalTheme,
  setColor,
  setFontFamily,
  setBackgroundImage,
  setContrast,
  setSyncColors
} = uiSlice.actions;
export default uiSlice.reducer;
