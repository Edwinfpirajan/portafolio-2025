import React from "react";
import { useSelector } from "react-redux";
import Taskbar from "./Taskbar/Taskbar";
import Window from "./windows/Window";
import Desktop from "./Desktop";
import { windowsMeta } from "./windowsMeta"; // Ajusta la ruta si está en otro lado

export default function DesktopContent() {
  const windows = useSelector((state) => state.windows.windows);

  return (
    <>
      <Desktop />
      <Taskbar />
      {Object.entries(windows).map(([name, props]) =>
        props.open ? (
          <Window
            key={name}
            title={windowsMeta[name]?.title || name}
            name={name}
          >
            {windowsMeta[name]?.component ? (
              React.createElement(windowsMeta[name].component)
            ) : (
              <p>Contenido no disponible</p>
            )}
          </Window>
        ) : null
      )}
    </>
  );
}
