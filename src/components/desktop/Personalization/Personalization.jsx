import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGlobalTheme,
  setColor,
  setFontFamily,
  setBackgroundImage,
  setContrast,
  setSyncColors, // ✅ nuevo
} from "../../../store/uiSlice";

export default function Personalization() {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const [tab, setTab] = useState("theme");

  const handleColorChange = (key, value) => {
    dispatch(setColor({ element: key, value }));

    // Si está activada la sincronización, se actualiza también el otro color
    if (ui.syncTaskbarAndTitlebarColors) {
      if (key === "taskbar") {
        dispatch(setColor({ element: "windowTitleBar", value }));
      } else if (key === "windowTitleBar") {
        dispatch(setColor({ element: "taskbar", value }));
      }
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "theme":
        return (
          <div className="space-y-2">
            <label className="block">Tema global:</label>
            <select
              value={ui.theme}
              onChange={(e) => dispatch(setGlobalTheme(e.target.value))}
              className="border px-2 py-1"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>
        );

      case "colors":
        return (
          <div className="space-y-2">
            <label className="block font-semibold mb-2">Colores:</label>
            {Object.entries(ui.colors).map(([key, value]) => (
              <div key={key}>
                <label className="block capitalize">{key}</label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                />
              </div>
            ))}

            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={ui.syncTaskbarAndTitlebarColors}
                  onChange={(e) =>
                    dispatch(setSyncColors(e.target.checked))
                  }
                />
                Compartir color entre barra de tareas y barra de título
              </label>
            </div>
          </div>
        );

      case "fonts":
        return (
          <div className="space-y-2">
            <label className="block">Fuente del sistema:</label>
            <input
              type="text"
              value={ui.fonts.system}
              onChange={(e) =>
                dispatch(
                  setFontFamily({ type: "system", value: e.target.value })
                )
              }
              className="border px-2 py-1"
            />
            <label className="block">Fuente del contenido:</label>
            <input
              type="text"
              value={ui.fonts.windowContent}
              onChange={(e) =>
                dispatch(
                  setFontFamily({
                    type: "windowContent",
                    value: e.target.value,
                  })
                )
              }
              className="border px-2 py-1"
            />
          </div>
        );

      case "background":
        return (
          <div className="space-y-2">
            <label className="block">URL de fondo:</label>
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
              className="border px-2 py-1 w-full"
            />
            <label className="block">Opacidad:</label>
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
        );

      case "accessibility":
        return (
          <div className="space-y-2">
            <label className="block">Contraste:</label>
            <select
              value={ui.contrast}
              onChange={(e) => dispatch(setContrast(e.target.value))}
              className="border px-2 py-1"
            >
              <option value="normal">Normal</option>
              <option value="high">Alto</option>
            </select>
          </div>
        );

      default:
        return <div>Seleccione una opción</div>;
    }
  };

  return (
    <div className="p-4 bg-white text-black w-96 h-[400px] overflow-auto">
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setTab("theme")} className="px-3 py-1 border">
          Tema
        </button>
        <button onClick={() => setTab("colors")} className="px-3 py-1 border">
          Colores
        </button>
        <button onClick={() => setTab("fonts")} className="px-3 py-1 border">
          Fuentes
        </button>
        <button onClick={() => setTab("background")} className="px-3 py-1 border">
          Fondo
        </button>
        <button onClick={() => setTab("accessibility")} className="px-3 py-1 border">
          Accesibilidad
        </button>
      </div>
      {renderTab()}
    </div>
  );
}
