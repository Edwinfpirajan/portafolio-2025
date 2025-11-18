// src/components/desktop/Desktop.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../Icons/Icon";
import { openWindow } from "../../redux/slices/windowsSlice";
import { initializeIconPositions, clearSelection } from "../../redux/slices/desktopSlice";
import { windowsMeta } from "./windowsMeta";
import { useTranslation } from "react-i18next";

export default function Desktop() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const iconPositions = useSelector((state) => state.desktop.iconPositions);

  // Initialize icon positions on mount
  useEffect(() => {
    const iconKeys = Object.keys(windowsMeta);
    dispatch(initializeIconPositions(iconKeys));
  }, [dispatch]);

  // Persist positions to localStorage
  useEffect(() => {
    if (Object.keys(iconPositions).length > 0) {
      localStorage.setItem('desktop_icon_positions', JSON.stringify(iconPositions));
    }
  }, [iconPositions]);

  // Load positions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('desktop_icon_positions');
      if (saved) {
        const positions = JSON.parse(saved);
        // Apply saved positions (simple approach - could enhance with a dedicated action)
        Object.entries(positions).forEach(([key, pos]) => {
          // Position already in state via initializeIconPositions, just ensuring consistency
        });
      }
    } catch {}
  }, []);

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

  const handleDesktopClick = () => {
    dispatch(clearSelection());
  };

  const theme = useSelector((s) => s.ui.theme);
  const systemFont = useSelector((s) => s.ui.fonts.system);

  return (
    <div 
      className="fixed inset-0 overflow-hidden" 
      style={{ fontFamily: systemFont }}
      onClick={handleDesktopClick}
    >
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/images/background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {theme === "dark" && (
        <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />
      )}

      {/* Íconos de escritorio con posiciones absolutas en grid */}
      <div className="absolute top-4 left-4 z-10 pointer-events-auto" style={{ position: 'relative', width: '100%', height: 'calc(100% - 80px)' }}>
        {Object.entries(windowsMeta).map(([key, meta]) => {
          const label = meta.titleKey ? t(meta.titleKey) : (meta.title || key);
          const pos = iconPositions[key] || { x: 0, y: 0 };
          return (
            <Icon
              key={key}
              iconKey={key}
              label={label}
              iconPath={meta.icon}
              gridX={pos.x}
              gridY={pos.y}
              onDoubleClick={() => handleIconClick(key)}
            />
          );
        })}
      </div>
    </div>
  );
}
