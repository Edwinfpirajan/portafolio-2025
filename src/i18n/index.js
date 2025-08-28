import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "./locales/es/common.json";
import en from "./locales/en/common.json";
import esTerminal from "./locales/es/terminal.json";
import enTerminal from "./locales/en/terminal.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        es: { common: es, terminal: esTerminal },
        en: { common: en, terminal: enTerminal },
      },
      ns: ["common", "terminal"],
      defaultNS: "common",
      supportedLngs: ["es", "en"],
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
