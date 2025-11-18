import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, toggleLangMenu, closeLangMenu } from "../../../redux/slices/i18nSlice";

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
  const theme = useSelector((s) => s.ui.theme);
  const wrapperRef = useRef(null);

  const current = (lang || "es").slice(0, 2).toUpperCase();
  const btnBg = darkenColor(taskbarColor, 10);

  // Cierre por pérdida de foco (como menú contextual)
  const handleBlur = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      dispatch(closeLangMenu());
    }
  };

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const onDocClick = (ev) => {
      if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) {
        dispatch(closeLangMenu());
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
    };
  }, [open, dispatch]);

  const Item = ({ code, label }) => {
    const active = current === code.toUpperCase();
    const baseItem = theme === 'dark'
      ? 'hover:bg-white/10 text-white'
      : 'hover:bg-black/5 text-gray-800';
    return (
      <button
        role="menuitem"
        tabIndex={0}
        onClick={() => { dispatch(setLanguage(code)); dispatch(closeLangMenu()); }}
        className={`flex w-full items-center justify-between px-3 py-2 text-sm transition ${baseItem} ${active ? 'font-semibold' : ''}`}
        aria-current={active ? 'true' : 'false'}
      >
        <span>{label}</span>
        {active && <span className="text-xs opacity-70">✓</span>}
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
        className="flex items-center gap-2 px-3 py-1 text-sm rounded select-none border shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-black/20"
        style={{
          backgroundColor: btnBg,
          color: '#fff',
          borderColor: darkenColor(taskbarColor, 25),
          boxShadow: theme==='dark' ? 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.6)' : 'inset 0 0 0 1px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)'
        }}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
        title="Idioma / Language"
      >
        {current}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute bottom-11 right-0 w-48 rounded-md border shadow-lg backdrop-blur-sm overflow-hidden animate-fade-in ${theme==='dark' ? 'bg-[#0f1821]/95 border-white/15 text-white' : 'bg-white border-black/15 text-gray-800'}`}
        >
          <div className={`px-3 py-2 text-xs uppercase tracking-wide font-semibold opacity-60 ${theme==='dark' ? 'text-teal-200' : 'text-gray-500'}`}>Idioma</div>
          <Item code="es" label="Español (ES)" />
          <Item code="en" label="English (EN)" />
        </div>
      )}
    </div>
  );
}
