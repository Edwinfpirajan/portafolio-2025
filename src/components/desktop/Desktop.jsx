import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../Icons/Icon";
import { openWindow, closeWindow } from "../../store/windowsSlice";

export default function Desktop() {
  const dispatch = useDispatch();
  const windows = useSelector((state) => state.windows.windows);

  const handleIconClick = (appName) => {
    dispatch(openWindow(appName));
  };

  return (
    <div className="w-full h-full relative">
      {/* Íconos */}
      <div className="absolute top-10 left-10 space-y-4">
        <Icon
          label="About"
          iconPath="/icons/start_btn.png"
          onClick={() => handleIconClick("about")}
        />
        <Icon
          label="Personalización"
          iconPath="/icons/start_btn.png"
          onClick={() => handleIconClick("personalization")}
        />
      </div>
    </div>
  );
}
