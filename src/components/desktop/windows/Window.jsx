import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  moveWindow,
  resizeWindow,
  bringToFront,
} from "../../../store/windowsSlice";
import { Rnd } from "react-rnd";

/**
 * Props:
 * - title     : string
 * - name      : string (clave en windowsSlice)
 * - children  : ReactNode (contenido de la ventana)
 * - scrollMode: "auto" | "child"
 *    - "auto"  -> el contenedor de contenido hace scroll (útil para About, etc.)
 *    - "child" -> el hijo controla su propio scroll (útil para Terminal)
 */
export default function Window({ title, name, children, scrollMode = "auto" }) {
  const dispatch = useDispatch();
  const win = useSelector((state) => state.windows.windows[name]);

  const theme = useSelector((state) => state.ui.theme);
  const borderColor = useSelector(
    (state) => state.ui.colors.windowBorder || "#888"
  );
  const headerBg = useSelector(
    (state) => state.ui.colors.mainColor || "#00aaff"
  );
  const fontFamily = useSelector((state) => state.ui.fonts.windowContent);
  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const contentBg = theme === "dark" ? "#1f1f1f" : "#ffffff";

  if (!win || !win.open) return null;

  const handleFocus = () => dispatch(bringToFront(name));
  const handleClose = () => dispatch(closeWindow(name));
  const handleMinimize = () => dispatch(minimizeWindow(name));
  const handleMaximize = () => dispatch(maximizeWindow(name));

  const contentClass =
    scrollMode === "auto"
      ? "flex-1 min-h-0 overflow-auto"     // el contenedor scrollea
      : "flex-1 min-h-0 overflow-hidden";  // el hijo scrollea (Terminal)

  return (
    <Rnd
      size={
        win.maximized
          ? { width: "100vw", height: "100vh" }
          : { width: win.width, height: win.height }
      }
      position={win.maximized ? { x: 0, y: 0 } : { x: win.x, y: win.y }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      enableResizing={!win.maximized}
      disableDragging={win.maximized}
      style={{
        zIndex: win.zIndex,
        display: win.minimized ? "none" : "block",
      }}
      onDragStop={(e, d) => dispatch(moveWindow({ name, x: d.x, y: d.y }))}
      onResizeStop={(e, dir, ref, delta, pos) => {
        dispatch(
          resizeWindow({ name, width: ref.offsetWidth, height: ref.offsetHeight })
        );
        dispatch(moveWindow({ name, x: pos.x, y: pos.y }));
      }}
      onMouseDown={handleFocus}
      className="absolute"
      dragHandleClassName="window-titlebar" // arrastra solo desde el header
    >
      <div
        className="flex flex-col w-full h-full shadow-lg min-h-0"
        style={{
          border: `2px solid ${borderColor}`,
          fontFamily,
          backgroundColor: contentBg,
          color: textColor,
        }}
      >
        {/* Título / botones */}
        <div
          className="window-titlebar flex justify-between items-center px-2 py-1 cursor-move select-none"
          style={{ backgroundColor: headerBg, color: "#fff" }}
        >
          <span>{title}</span>
          <div className="space-x-1">
            <button
              onClick={handleMinimize}
              className="bg-yellow-400 text-black px-2 py-0.5 text-xs font-bold border border-white"
            >
              ▁
            </button>
            <button
              onClick={handleMaximize}
              className="bg-green-500 text-black px-2 py-0.5 text-xs font-bold border border-white"
            >
              ▢
            </button>
            <button
              onClick={handleClose}
              className="bg-red-600 text-white px-2 py-0.5 text-xs font-bold border border-white"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className={contentClass}>
          {children}
        </div>
      </div>
    </Rnd>
  );
}
