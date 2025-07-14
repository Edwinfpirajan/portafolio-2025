import React from "react";
import { useDispatch } from "react-redux";
import Icon from "../Icons/Icon";
import { openWindow } from "../../store/windowsSlice";

export default function Desktop() {
  const dispatch = useDispatch();

  // Mapeo de aplicaciones con su título e ícono
  const appsMeta = {
    about: {
      title: "Sobre mí",
      icon: "/icons/start_btn.png"
    },
    personalization: {
      title: "Personalización",
      icon: "/icons/start_btn.png"
    },
    // contact: {
    //   title: "Contacto",
    //   icon: "/icons/contact.png"
    // },
    // projects: {
    //   title: "Proyectos",
    //   icon: "/icons/projects.png"
    // }
  };

  const handleIconClick = (appName) => {
    const meta = appsMeta[appName];
    if (meta) {
      dispatch(openWindow({ name: appName, ...meta }));
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-10 left-10 space-y-4">
        {Object.entries(appsMeta).map(([key, { title, icon }]) => (
          <Icon
            key={key}
            label={title}
            iconPath={icon}
            onClick={() => handleIconClick(key)}
          />
        ))}
      </div>
    </div>
  );
}
