import React from "react";
import { useDispatch } from "react-redux";
import Icon from "../Icons/Icon";
import { openWindow } from "../../store/windowsSlice";
import { windowsMeta } from "./windowsMeta";

export default function Desktop() {
  const dispatch = useDispatch();

  const handleIconClick = (appName) => {
    const meta = windowsMeta[appName];
    if (meta) {
      const { title, icon } = meta;
      dispatch(openWindow({ name: appName, title, icon }));
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Video de fondo */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/images/background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Íconos de escritorio */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-0 pointer-events-auto">
        {Object.entries(windowsMeta).map(([key, { title, icon }]) => (
          <Icon
            key={key}
            label={title}
            iconPath={icon}
            onDoubleClick={() => handleIconClick(key)}
          />
        ))}
      </div>
    </div>
  );
}
