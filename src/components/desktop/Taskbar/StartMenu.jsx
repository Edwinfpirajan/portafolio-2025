// src/components/desktop/Taskbar/StartMenu.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openWindow } from "../../../redux/slices/windowsSlice";
import { closeStartMenu } from "../../../redux/slices/startMenuSlice";
import { windowsMeta } from "../windowsMeta";
import { useTranslation } from "react-i18next";

export default function StartMenu() {
  const isOpen = useSelector((state) => state.startMenu.isOpen);
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleStartMenuClick = (appName) => {
    const meta = windowsMeta[appName];
    if (!meta) return;

    const translatedTitle = meta.titleKey
      ? t(meta.titleKey)
      : meta.title || appName;

    dispatch(openWindow({ name: appName, title: translatedTitle, icon: meta.icon }));
    // Close start menu after launching an app
    dispatch(closeStartMenu());
  };

  // Close start menu on any click in the page
  useEffect(() => {
    if (!isOpen) return;
    const onAnyClick = () => dispatch(closeStartMenu());
    document.addEventListener("click", onAnyClick);
    return () => document.removeEventListener("click", onAnyClick);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute bottom-12 left-2 w-48 border shadow-lg p-2 font-retro text-xs ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-600 text-white' 
          : 'bg-white border-black text-black'
      }`} 
      style={{ zIndex: 10000 }}
    >
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
                className={`cursor-pointer p-1 flex items-center gap-2 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
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
