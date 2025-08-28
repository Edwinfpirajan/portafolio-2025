import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, toggleLangMenu, closeLangMenu } from "../../../store/i18nSlice";

// misma utilidad que en Taskbar
function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const lang = useSelector((s) => s.i18n.lang);
  const open = useSelector((s) => s.i18n.menuOpen);
  const taskbarColor = useSelector((s) => s.ui.colors.mainColor);
  const wrapperRef = useRef(null);

  const current = (lang || "es").slice(0, 2).toUpperCase();
  const btnBg = darkenColor(taskbarColor, 10);

  // Cierre por pérdida de foco (como menú contextual)
  const handleBlur = (e) => {
    // si el foco se va fuera del contenedor, cerramos
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      dispatch(closeLangMenu());
    }
  };

  const Item = ({ code, label }) => {
    const active = current === code.toUpperCase();
    return (
      <button
        role="menuitem"
        tabIndex={0}
        onClick={() => dispatch(setLanguage(code))}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-black/10 ${
          active ? "font-semibold" : ""
        }`}
        aria-current={active ? "true" : "false"}
      >
        <span>{label}</span>
        {active && <span className="text-xs">✓</span>}
      </button>
    );
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <button
        onClick={() => dispatch(toggleLangMenu())}
        className="flex items-center gap-2 px-3 py-1 text-sm border rounded select-none"
        style={{ backgroundColor: btnBg, color: "#fff", borderColor: "#333" }}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        title="Idioma / Language"
      >
        {current}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-11 right-0 w-44 rounded border bg-white/95 text-black shadow-lg backdrop-blur"
        >
          <Item code="es" label="Español (ES)" />
          <Item code="en" label="English (EN)" />
        </div>
      )}
    </div>
  );
}
