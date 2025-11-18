import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setGlobalTheme,
  setColor,
  setFontFamily,
  setBackgroundImage,
  setContrast,
  setPersonalizationTab,
} from "../../../redux/slices/uiSlice";

function ThemeSection({ ui, dispatch }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Tema global</label>
        <select
          value={ui.theme}
          onChange={(e) => dispatch(setGlobalTheme(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>
    </div>
  );
}

function ColorsSection({ ui, dispatch }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Color principal (barra de tareas y ventanas)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={ui.colors.mainColor}
            onChange={(e) =>
              dispatch(setColor({ element: "mainColor", value: e.target.value }))
            }
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-sm text-gray-600 font-mono">{ui.colors.mainColor}</span>
        </div>
      </div>
    </div>
  );
}

function FontsSection({ ui, dispatch }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Fuente del sistema</label>
        <input
          type="text"
          value={ui.fonts.system}
          onChange={(e) =>
            dispatch(setFontFamily({ type: "system", value: e.target.value }))
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="sans-serif"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Fuente del contenido</label>
        <input
          type="text"
          value={ui.fonts.windowContent}
          onChange={(e) =>
            dispatch(setFontFamily({ type: "windowContent", value: e.target.value }))
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="sans-serif"
        />
      </div>
    </div>
  );
}

function BackgroundSection({ ui, dispatch }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">URL de fondo</label>
        <input
          type="text"
          value={ui.background.image}
          onChange={(e) =>
            dispatch(
              setBackgroundImage({
                image: e.target.value,
                opacity: ui.background.opacity,
              })
            )
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Opacidad: {ui.background.opacity.toFixed(2)}
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={ui.background.opacity}
          onChange={(e) =>
            dispatch(
              setBackgroundImage({
                image: ui.background.image,
                opacity: parseFloat(e.target.value),
              })
            )
          }
          className="w-full"
        />
      </div>
    </div>
  );
}

function AccessibilitySection({ ui, dispatch }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Contraste</label>
        <select
          value={ui.contrast}
          onChange={(e) => dispatch(setContrast(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="normal">Normal</option>
          <option value="high">Alto</option>
        </select>
      </div>
    </div>
  );
}

export default function Personalization() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ui = useSelector((state) => state.ui);
  const tab = useSelector((state) => state.ui.personalizationTab || "theme");

  const sections = useMemo(
    () => [
      { key: "theme", label: "Tema", component: <ThemeSection ui={ui} dispatch={dispatch} /> },
      { key: "colors", label: "Colores", component: <ColorsSection ui={ui} dispatch={dispatch} /> },
      { key: "fonts", label: "Fuentes", component: <FontsSection ui={ui} dispatch={dispatch} /> },
      { key: "background", label: "Fondo", component: <BackgroundSection ui={ui} dispatch={dispatch} /> },
      { key: "accessibility", label: "Accesibilidad", component: <AccessibilitySection ui={ui} dispatch={dispatch} /> },
    ],
    [ui, dispatch]
  );

  const activeSection = sections.find((s) => s.key === tab) || sections[0];

  return (
    <div className="w-full h-full bg-white text-black">
      {/* Desktop: left menu + content */}
      <div className="hidden md:grid grid-cols-[200px_minmax(0,1fr)] h-full">
        <aside className="border-r border-gray-200 bg-gray-50 p-3 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 mb-2">Personalización</div>
          <nav className="flex flex-col gap-1">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => dispatch(setPersonalizationTab(s.key))}
                className={`text-left px-3 py-2 rounded text-sm hover:bg-gray-200 transition ${
                  tab === s.key ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="overflow-auto h-full p-4">
          {activeSection.component}
        </main>
      </div>

      {/* Mobile: chips selector + content */}
      <div className="md:hidden h-full flex flex-col">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => dispatch(setPersonalizationTab(s.key))}
                className={`px-3 py-1.5 rounded-full border text-sm whitespace-nowrap ${
                  tab === s.key
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {activeSection.component}
        </div>
      </div>
    </div>
  );
}
