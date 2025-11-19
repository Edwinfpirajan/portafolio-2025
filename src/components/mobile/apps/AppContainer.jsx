
import React from "react";
import { useSelector } from "react-redux";
import { mobileMeta } from "../mobileMeta";
import { useTranslation } from "react-i18next";

export default function AppContainer() {
  const { t } = useTranslation();
  const stack = useSelector((s) => s.mobile.stack);
  const top = stack[stack.length - 1];
  if (!top) return null;

  const meta = mobileMeta[top.name];
  if (!meta) return null;

  const Title = meta.titleKey ? t(meta.titleKey) : (meta.title || top.name);
  const Component = meta.component;

  const theme = useSelector((s) => s.ui.theme);

  const HEADER_H = 40; // px

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Fondo sólido absoluto que cubre todo el espacio visible de la app, incluidas safe areas */}
      <div
        className={`fixed inset-0 z-0 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}
        style={{
          padding: 0,
        }}
        aria-hidden="true"
      />

      {/* Header oculto en mobile, solo se muestra el contenido de la app */}

      {/* contenido scrollable sobre el fondo */}
      <div
        className="flex-1 min-h-0 content-scroll pb-navbar-safe relative z-10"
        style={{
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
