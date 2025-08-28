// src/components/desktop/Desktop.jsx
import React from "react";
import { useDispatch } from "react-redux";
import Icon from "../Icons/Icon";
import { openWindow } from "../../store/windowsSlice";
import { windowsMeta } from "./windowsMeta";
import { useTranslation } from "react-i18next";

export default function Desktop() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleIconClick = (appName) => {
    const meta = windowsMeta[appName];
    if (!meta) return;

    const label = meta.titleKey ? t(meta.titleKey) : (meta.title || appName);

    dispatch(openWindow({ name: appName, title: label, icon: meta.icon }));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/images/background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Íconos de escritorio */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-0 pointer-events-auto">
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
