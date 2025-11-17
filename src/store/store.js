// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import windowsReducer from './windowsSlice'; 
import startMenuReducer from './startMenuSlice';
import i18nReducer from './i18nSlice';
import mobileReducer from './mobileSlice'; 
import { rebaseZ } from './windowsSlice';

const PERSIST_KEY = 'portfolio_state_v1';

function loadState() {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    // Only allow the slices we care about
    const preloaded = {};
    if (parsed.ui) preloaded.ui = parsed.ui;
    if (parsed.windows) preloaded.windows = parsed.windows;
    if (parsed.i18n) preloaded.i18n = parsed.i18n; // lang already persisted, but keep
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
  },
  preloadedState
});

// After store is ready, rebase zCounter so bringToFront keeps working after rehydrate
try { store.dispatch(rebaseZ()); } catch {}

// Persist on changes (simple subscribe; could be debounced if needed)
let writing = false;
store.subscribe(() => {
  if (writing) return;
  writing = true;
  // microtask debounce
  Promise.resolve().then(() => {
    saveState(store.getState());
    writing = false;
  });
});
