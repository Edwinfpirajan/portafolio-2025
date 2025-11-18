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
  const windowsColors = [
    "#FFB900", "#FF8C00", "#FF5722", "#E74856", "#EA005E", "#C30052",
    "#E3008C", "#BF0077", "#C239B3", "#9A0089", "#0078D7", "#0063B1",
    "#8E8CD8", "#6B69D6", "#8764B8", "#744DA9", "#B146C2", "#881798",
    "#0099BC", "#2D7D9A", "#00B7C3", "#038387", "#00B294", "#018574",
    "#00CC6A", "#10893E", "#7A7574", "#5D5A58", "#68768A", "#515C6B",
    "#567C73", "#486860", "#498205", "#107C10", "#767676", "#4C4A48",
    "#69797E", "#4A5459", "#647C64", "#525E54", "#847545", "#7E735F"
  ];

  const [showCustom, setShowCustom] = React.useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-3">
          Color principal (barra de tareas y ventanas)
        </label>
        
        {/* Current color display */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <div
            className="w-12 h-12 rounded border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: ui.colors.mainColor }}
          />
          <div>
            <div className="text-xs text-gray-500">Color actual</div>
            <span className="text-sm font-mono font-semibold">{ui.colors.mainColor}</span>
          </div>
        </div>

        {/* Windows colors palette */}
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-600 mb-2">Colores de Windows</div>
          <div className="grid grid-cols-9 gap-2 max-w-md">
            {windowsColors.map((color) => (
              <button
                key={color}
                onClick={() => dispatch(setColor({ element: "mainColor", value: color }))}
                className={`w-full aspect-square rounded-md border-2 transition-all hover:scale-110 ${
                  ui.colors.mainColor.toUpperCase() === color.toUpperCase()
                    ? "border-black ring-2 ring-offset-2 ring-black scale-105"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color, maxWidth: "40px", maxHeight: "40px" }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Custom color */}
        <div>
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-2"
          >
            {showCustom ? "Ocultar" : "Ver"} color personalizado
          </button>
          {showCustom && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
              <input
                type="color"
                value={ui.colors.mainColor}
                onChange={(e) =>
                  dispatch(setColor({ element: "mainColor", value: e.target.value }))
                }
                className="w-16 h-16 rounded border border-gray-300 cursor-pointer"
              />
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Código hexadecimal</label>
                <input
                  type="text"
                  value={ui.colors.mainColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                      dispatch(setColor({ element: "mainColor", value: val }))
                    }
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
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
