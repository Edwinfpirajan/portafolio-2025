// src/components/desktop/Desktop.jsx
import React from "react";
import { useDispatch } from "react-redux";
import Icon from "../Icons/Icon";
import { openWindow } from "../../redux/slices/windowsSlice";
import { windowsMeta } from "./windowsMeta";
import { useTranslation } from "react-i18next";

export default function Desktop() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleIconClick = (appName) => {
    const meta = windowsMeta[appName];
    if (!meta) return;

    const label = meta.titleKey ? t(meta.titleKey) : (meta.title || appName);

    const initial = meta.initial || {};
    // If the window is non-maximized, compute a centered position
    let payloadInitial = { ...initial };
    if (initial.maximized === false) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const TASKBAR_H = 40;
      const w = initial.width ?? 900;
      const h = initial.height ?? 520;
      const x = Math.max(0, Math.round((vw - w) / 2));
      const y = Math.max(0, Math.round((vh - TASKBAR_H - h) / 2));
      payloadInitial = { ...payloadInitial, width: w, height: h, x, y };
    }

    dispatch(openWindow({ name: appName, title: label, icon: meta.icon, initial: payloadInitial }));
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/images/background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Íconos de escritorio */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-10 pointer-events-auto">
        {Object.entries(windowsMeta).map(([key, meta]) => {
          const label = meta.titleKey ? t(meta.titleKey) : (meta.title || key);
          return (
            <Icon
              key={key}
              label={label}
              iconPath={meta.icon}         
              onDoubleClick={() => handleIconClick(key)}
            />
          );
        })}
      </div>
    </div>
  );
}
