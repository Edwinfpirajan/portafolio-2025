// src/components/mobile/apps/Recents.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, switchTo } from "../../../store/mobileSlice";
import { windowsMeta } from "../../desktop/windowsMeta";
import { useTranslation } from "react-i18next";

export default function Recents() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const stack = useSelector((s) => s.mobile.stack);

  if (!stack.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/70">
        No hay apps recientes
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 grid grid-cols-2 gap-4">
      {stack
        .slice()
        .reverse()
        .map(({ name }) => {
          const meta = windowsMeta[name];
          const label = meta?.titleKey ? t(meta.titleKey) : (meta?.title || name);
          return (
            <div key={name} className="relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <button
                onClick={() => dispatch(switchTo(name))}
                className="w-full h-28 flex items-center justify-center"
              >
                <img src={meta?.icon} alt={label} className="w-10 h-10 opacity-90" />
              </button>
              <div className="px-3 pb-3 flex items-center justify-between">
                <span className="text-xs text-white/80 truncate">{label}</span>
                <button
                  onClick={() => dispatch(closeApp(name))}
                  className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
