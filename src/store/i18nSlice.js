import { createSlice } from "@reduxjs/toolkit";

// intenta recuperar del localStorage; si no, usa 'es'
const saved = (typeof window !== "undefined" && localStorage.getItem("i18nLng")) || "es";

const initialState = {
  lang: saved,        // 'es' | 'en'
  menuOpen: false,    // abre/cierra el menú del switcher
};

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;               // 'es' | 'en'
      if (typeof window !== "undefined") {
        localStorage.setItem("i18nLng", state.lang); // persistimos
      }
    },
    toggleLangMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    openLangMenu: (state) => {
      state.menuOpen = true;
    },
    closeLangMenu: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { setLanguage, toggleLangMenu, openLangMenu, closeLangMenu } = i18nSlice.actions;
export default i18nSlice.reducer;
