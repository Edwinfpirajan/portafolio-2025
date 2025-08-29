// src/components/AppWrapper.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../store/store";
import DesktopContent from "./desktop/DesktopContent";
import MobileShell from "./mobile/MobileShell";

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

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  const forced = useMemo(() => {
    if (typeof window === "undefined") return null;
    const q = new URLSearchParams(window.location.search).get("mode");
    const ls = window.localStorage.getItem("forceMode");
    return (q || ls) ?? null; // "mobile" | "desktop" | null
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const uaMobile =
      /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

    const compute = () => {
      if (forced === "mobile") return setIsMobile(true);
      if (forced === "desktop") return setIsMobile(false);
      setIsMobile(mql.matches || uaMobile);
    };

    compute();
    const onChange = () => compute();
    mql.addEventListener?.("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mql.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [breakpoint, forced]);

  return isMobile;
}

function Root() {
  const isMobile = useIsMobile(768);
  return (
    <>
      <HtmlLangSync />
      {isMobile ? <MobileShell /> : <DesktopContent />}
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
