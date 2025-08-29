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
    <div
      className="w-full h-full content-scroll pb-content-safe"
      style={{
        // safe areas
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        // la pb real la aporta pb-content-safe (usa --navbar-h)
      }}
    >
      {/* grid visible desde arriba */}
      <div className="pt-6 px-5 grid grid-cols-3 [@media(min-width:380px)]:grid-cols-4 sm:grid-cols-5 gap-y-8 gap-x-6 content-start place-items-start">
        {available.map((key) => {
          const meta = windowsMeta[key];
          if (!meta) return null;
          const label = meta.titleKey ? t(meta.titleKey) : (meta.title || key);

          return (
            <button
              key={key}
              onClick={() => dispatch(openApp(key))}
              className="flex flex-col items-center justify-start active:scale-[0.98] transition min-w-0"
            >
              <img
                src={meta.icon}
                alt={label}
                className="rounded-xl shadow-lg select-none"
                draggable={false}
                style={{
                  width:  "clamp(72px, 22vw, 112px)",
                  height: "clamp(72px, 22vw, 112px)",
                }}
              />
              <span className="mt-2 text-[14px] sm:text-[15px] text-white/95 text-center leading-tight max-w-[8.5rem] truncate">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
