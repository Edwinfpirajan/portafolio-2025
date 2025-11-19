
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openApp } from "../../../redux/slices/mobileSlice";
import { mobileMeta } from "../mobileMeta";
import { useTranslation } from "react-i18next";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const available = useSelector((s) => s.mobile.available);

  const theme = useSelector((s) => s.ui.theme);

  return (
    <div
      className="w-full h-full content-scroll pb-content-safe"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* grid visible desde arriba */}
      <div className="pt-6 px-6 grid grid-cols-4 gap-y-6 gap-x-4 content-start">
        {available.map((key) => {
          const meta = mobileMeta[key];
          if (!meta) return null;
          const label = meta.titleKey ? t(meta.titleKey) : (meta.title || key);

          return (
            <button
              key={key}
              onClick={() => dispatch(openApp(key))}
              className="flex flex-col items-center justify-start active:scale-95 transition-transform w-full"
            >
              <div className="w-full aspect-square mb-2 flex items-center justify-center">
                <img
                  src={meta.icon}
                  alt={label}
                  className="rounded-2xl shadow-lg select-none w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <span className="text-xs text-white text-center leading-tight w-full break-words line-clamp-2 px-1">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
