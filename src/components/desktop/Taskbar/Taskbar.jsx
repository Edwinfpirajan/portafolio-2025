import React from "react";
import StartButton from "./StartButton";
import StartMenu from "../Taskbar/StartMenu";
import Clock from "../Clock";
import { useSelector, useDispatch } from "react-redux";
import { bringToFront } from "../../../store/windowsSlice";

export default function Taskbar() {
  const dispatch = useDispatch();
  const taskbarColor = useSelector((state) => state.ui.colors.taskbar);
  const windows = useSelector((state) => state.windows.windows);

  const openWindows = Object.entries(windows).filter(
    ([_, win]) => win.open && !win.minimized
  );

  // Detectar ventana activa
  const activeWindow = openWindows.reduce((acc, curr) =>
    curr[1].zIndex > (acc?.[1]?.zIndex ?? -1) ? curr : acc
  , null);

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-10 flex items-center justify-between px-4 z-50 border-t border-[#888]"
      style={{ backgroundColor: taskbarColor }}
    >
      <div className="flex items-center space-x-2">
        <StartButton />
        <StartMenu />

        {openWindows.map(([key, win]) => {
          const isActive = activeWindow?.[0] === key;
          return (
            <button
              key={key}
              onClick={() => dispatch(bringToFront(key))}
              className={`flex items-center space-x-1 px-2 py-1 text-sm border rounded 
                ${isActive ? 'bg-pink-500 text-white border-black' : 'bg-white hover:bg-gray-100'}`}
            >
              {win.icon && (
                <img
                  src={win.icon}
                  alt={`${key} icon`}
                  className="w-4 h-4 object-contain"
                />
              )}
              <span>{win.title || key}</span>
            </button>
          );
        })}
      </div>
      <Clock />
    </div>
  );
}
