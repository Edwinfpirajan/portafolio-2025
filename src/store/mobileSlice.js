// src/store/mobileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: "home",         // 'home' | 'app' | 'recents'
  stack: [],              // [{ name, title, icon }]
  // si quieres controlar qué apps aparecen en la Home:
  available: ["about", "cmd", "personalization"],
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    openApp: (state, { payload: name }) => {
      // si ya está en top, sólo muestra
      if (!state.stack.length || state.stack[state.stack.length - 1].name !== name) {
        state.stack.push({ name });
      }
      state.screen = "app";
    },
    goBack: (state) => {
      if (state.screen === "recents") {
        state.screen = "home";
        return;
      }
      if (state.stack.length > 1) {
        state.stack.pop();
        state.screen = "app";
      } else {
        state.stack = [];
        state.screen = "home";
      }
    },
    goHome: (state) => {
      state.screen = "home";
    },
    showRecents: (state) => {
      state.screen = "recents";
    },
    switchTo: (state, { payload: name }) => {
      const idx = state.stack.findIndex((a) => a.name === name);
      if (idx !== -1) {
        const [item] = state.stack.splice(idx, 1);
        state.stack.push(item);
        state.screen = "app";
      }
    },
    closeApp: (state, { payload: name }) => {
      const wasTop = state.stack.length && state.stack[state.stack.length - 1].name === name;
      state.stack = state.stack.filter((a) => a.name !== name);
      if (!state.stack.length) state.screen = "home";
      else if (wasTop) state.screen = "app";
    },
  },
});

export const { openApp, goBack, goHome, showRecents, switchTo, closeApp } = mobileSlice.actions;
export default mobileSlice.reducer;
