import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openApp } from "../../../store/mobileSlice";
import { windowsMeta } from "../../desktop/windowsMeta";
import { useTranslation } from "react-i18next";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const available = useSelector((s) => s.mobile.available);

  return (
    <div className="w-full h-full pb-safe pt-6 px-5 grid grid-cols-4 gap-5 sm:grid-cols-5 content-start">
      {available.map((key) => {
        const meta = windowsMeta[key];
        if (!meta) return null;
        const label = meta.titleKey ? t(meta.titleKey) : (meta.title || key);

        return (
          <button
            key={key}
            onClick={() => dispatch(openApp(key))}
            className="flex flex-col items-center justify-center active:scale-[0.98] transition"
          >
            {/* Tamaño del ícono: clamp(64px, 18vw, 96px) */}
            <img
              src={meta.icon}
              alt={label}
              className="rounded-xl shadow-lg"
              style={{ width: "clamp(64px, 18vw, 96px)", height: "clamp(64px, 18vw, 96px)" }}
            />
            <span className="mt-2 text-[13px] sm:text-sm text-white/95 text-center leading-tight max-w-[7.5rem]">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
