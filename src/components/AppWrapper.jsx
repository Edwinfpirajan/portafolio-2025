// src/components/AppWrapper.jsx
import React, { useEffect, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import DesktopContent from "./desktop/DesktopContent";
import MobileShell from "./mobile/MobileShell";

import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { setIsMobile } from "../redux/slices/deviceSlice";

function HtmlLangSync() {
  const lang = useSelector((s) => s.i18n.lang);
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = ["ar", "he", "fa"].includes(lang) ? "rtl" : "ltr";
  }, [lang]);
  return null;
}

function MobileDetector({ breakpoint = 768 }) {
  const dispatch = useDispatch();

  const forced = useMemo(() => {
    if (typeof window === "undefined") return null;
    const q = new URLSearchParams(window.location.search).get("mode");
    const ls = window.localStorage.getItem("forceMode");
    return (q || ls) ?? null; // "mobile" | "desktop" | null
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const uaMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
    const compute = () => {
      if (forced === "mobile") return dispatch(setIsMobile(true));
      if (forced === "desktop") return dispatch(setIsMobile(false));
      dispatch(setIsMobile(mql.matches || uaMobile));
    };
    compute();
    const onChange = () => compute();
    mql.addEventListener?.("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mql.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [breakpoint, forced, dispatch]);
  return null;
}

function Root() {
  const isMobile = useSelector((s) => s.device.isMobile);
  return (
    <>
      <MobileDetector breakpoint={768} />
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
