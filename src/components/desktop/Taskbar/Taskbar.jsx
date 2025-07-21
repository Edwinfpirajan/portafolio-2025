import React from "react";
import StartButton from "./StartButton";
import StartMenu from "../Taskbar/StartMenu";
import Clock from "../Clock";
import { useSelector, useDispatch } from "react-redux";
import { bringToFront, restoreWindow } from "../../../store/windowsSlice";

// Función para oscurecer un color HEX
function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export default function Taskbar() {
  const dispatch = useDispatch();
  const taskbarColor = useSelector((state) => state.ui.colors.mainColor);
  const windows = useSelector((state) => state.windows.windows);

  const openWindows = Object.entries(windows).filter(
    ([_, win]) => win.open
  );

  const activeWindow = openWindows
  .filter(([_, win]) => !win.minimized) // ❗ excluir minimizadas
  .reduce((acc, curr) =>
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
          const bg = isActive
            ? darkenColor(taskbarColor, 25)
            : darkenColor(taskbarColor, 10);

          return (
            <button
              key={key}
              onClick={() => {
                if (win.minimized) {
                  dispatch(restoreWindow(key));
                } else {
                  dispatch(bringToFront(key));
                }
              }}
              className="flex items-center space-x-1 px-2 py-1 text-sm border rounded transition duration-150"
              style={{
                backgroundColor: bg,
                color: "#fff",
                borderColor: isActive ? "#000000" : "#333333",
              }}
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
