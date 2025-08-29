import React from "react";
import { useSelector } from "react-redux";
import { windowsMeta } from "../../desktop/windowsMeta";
import { useTranslation } from "react-i18next";

export default function AppContainer() {
  const { t } = useTranslation();
  const stack = useSelector((s) => s.mobile.stack);
  const top = stack[stack.length - 1];
  if (!top) return null;

  const meta = windowsMeta[top.name];
  if (!meta) return null;

  const Title = meta.titleKey ? t(meta.titleKey) : (meta.title || top.name);
  const Component = meta.component;

  const HEADER_H = 40; // px

  return (
    <div className="w-full h-full relative">
      {/* mini header fijo */}
      <div
        className="absolute top-0 inset-x-0 bg-black/40 backdrop-blur flex items-center px-3 z-10"
        style={{ height: `${HEADER_H}px`, paddingTop: "env(safe-area-inset-top)" }}
      >
        <img src={meta.icon} alt={Title} className="w-5 h-5 mr-2" />
        <span className="text-sm text-white/90">{Title}</span>
      </div>

      {/* contenido scrollable con safe areas y espacio para NavBar */}
      <div
  className="content-scroll pb-navbar-safe"
  style={{
    height: "100%",
    paddingTop: `calc(env(safe-area-inset-top) + ${HEADER_H}px)`,
    paddingLeft: "env(safe-area-inset-left)",
    paddingRight: "env(safe-area-inset-right)",
  }}
>
  <Component />
</div>

    </div>
  );
}
