// src/components/AppWrapper.jsx
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../store/store";
import DesktopContent from "./desktop/DesktopContent";
// import AnimatedBackground from "./desktop/Personalization/AnimateBackground";

import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

function HtmlLangSync() {
  const lang = useSelector((s) => s.i18n.lang);
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = ["ar", "he", "fa"].includes(lang) ? "rtl" : "ltr";
  }, [lang]);
  return null;
}

function Root() {
  return (
    <>
      <HtmlLangSync />
      <DesktopContent />
    </>
  );
}

export default function AppWrapper() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Root />
      </Provider>
    </I18nextProvider>
  );
}
