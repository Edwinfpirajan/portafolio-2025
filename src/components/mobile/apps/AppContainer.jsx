// src/components/mobile/apps/AppContainer.jsx
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

  return (
    <div className="w-full h-full relative">
      {/* mini header */}
      <div className="absolute top-0 inset-x-0 h-10 bg-black/40 backdrop-blur flex items-center px-3 z-10">
        <img src={meta.icon} alt={Title} className="w-5 h-5 mr-2" />
        <span className="text-sm text-white/90">{Title}</span>
      </div>
      <div className="pt-10 w-full h-full overflow-hidden">
        <Component />
      </div>
    </div>
  );
}
