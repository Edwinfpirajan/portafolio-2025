// src/components/desktop/Taskbar/StartMenu.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openWindow } from "../../../store/windowsSlice";
import { windowsMeta } from "../windowsMeta";
import { useTranslation } from "react-i18next";

export default function StartMenu() {
  const isOpen = useSelector((state) => state.startMenu.isOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleStartMenuClick = (appName) => {
    const meta = windowsMeta[appName];
    if (!meta) return;

    const translatedTitle = meta.titleKey
      ? t(meta.titleKey)
      : meta.title || appName;

    dispatch(openWindow({ name: appName, title: translatedTitle, icon: meta.icon }));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-12 left-2 w-48 bg-white border border-black shadow-lg p-2 z-50 font-retro text-xs">
      <ul className="space-y-2">
        {Object.entries(windowsMeta)
          .filter(([_, meta]) => meta.showInStartMenu)
          .map(([key, meta]) => {
            const label = meta.titleKey
              ? t(meta.titleKey)
              : meta.title || key;
            return (
              <li
                key={key}
                className="cursor-pointer hover:bg-gray-100 p-1 flex items-center gap-2"
                onClick={() => handleStartMenuClick(key)}
              >
                <img src={meta.icon} alt={label} className="w-4 h-4" />
                <span>{label}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
