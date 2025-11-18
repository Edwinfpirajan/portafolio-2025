// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import windowsReducer from './slices/windowsSlice';
import startMenuReducer from './slices/startMenuSlice';
import i18nReducer from './slices/i18nSlice';
import mobileReducer from './slices/mobileSlice';
import deviceReducer from './slices/deviceSlice';
import desktopReducer from './slices/desktopSlice';
import projectsReducer from './slices/projectsSlice';
import cmdReducer from './slices/cmdSlice';
import systemReducer from './slices/systemSlice';
import windowUiReducer from './slices/windowUiSlice';
import chatReducer from './slices/chatSlice';
import { rebaseZ } from './slices/windowsSlice';

const PERSIST_KEY = 'portfolio_state_v1';

function loadState() {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    const preloaded = {};
    if (parsed.ui) preloaded.ui = parsed.ui;
    if (parsed.windows) preloaded.windows = parsed.windows;
    if (parsed.i18n) preloaded.i18n = parsed.i18n;
    if (parsed.projectsState) preloaded.projectsState = parsed.projectsState;
    if (parsed.device) preloaded.device = parsed.device;
      if (parsed.chat) preloaded.chat = parsed.chat;
    return preloaded;
  } catch {}
  return undefined;
}

function saveState(state) {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      ui: state.ui,
      windows: state.windows,
      i18n: state.i18n,
      projectsState: state.projectsState,
      device: state.device,
      chat: state.chat,
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(toSave));
  } catch {}
}

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    windows: windowsReducer,
    startMenu: startMenuReducer,
    i18n: i18nReducer,
    mobile: mobileReducer,
    device: deviceReducer,
    desktop: desktopReducer,
    projectsState: projectsReducer,
    cmd: cmdReducer,
    system: systemReducer,
    windowUi: windowUiReducer,
    chat: chatReducer,
  },
  preloadedState,
});

try { store.dispatch(rebaseZ()); } catch {}

let writing = false;
store.subscribe(() => {
  if (writing) return;
  writing = true;
  Promise.resolve().then(() => {
    saveState(store.getState());
    writing = false;
  });
});
