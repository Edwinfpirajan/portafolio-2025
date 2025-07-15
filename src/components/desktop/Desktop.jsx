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
      const { title, icon } = meta; // ✅ Solo extrae valores seguros
      dispatch(openWindow({ name: appName, title, icon }));
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-10 left-10 space-y-4">
        {Object.entries(windowsMeta).map(([key, { title, icon }]) => (
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
