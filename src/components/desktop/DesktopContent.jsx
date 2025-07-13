import React from "react";
import { useSelector } from "react-redux";
import Taskbar from "./Taskbar/Taskbar";
import Window from "./windows/Window";
import Desktop from "./Desktop";
import Personalization from "./Personalization/Personalization";

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
            title={
              name === "about"
                ? "Sobre mí"
                : name === "contact"
                ? "Contacto"
                : name === "projects"
                ? "Proyectos"
                : name === "personalization"
                ? "Personalización"
                : name
            }
            name={name}
          >
            {name === "about" && (
              <p>Hola, soy Edwin, desarrollador fullstack apasionado por lo retro.</p>
            )}
            {name === "contact" && <p>Email: edwin@example.com</p>}
            {name === "projects" && <p>Estos son algunos de mis proyectos destacados.</p>}
            {name === "personalization" && <Personalization />}
          </Window>
        ) : null
      )}
    </>
  );
}
