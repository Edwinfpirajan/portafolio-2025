
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

  return (
    <div className="w-full h-full relative">
      {/* Fondo sólido que cubre todo el espacio */}
      <div
        className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}
        aria-hidden="true"
      />

      {/* Contenido con scroll */}
      <div className="absolute inset-0 overflow-auto">
        <Component />
      </div>
    </div>
  );
}
