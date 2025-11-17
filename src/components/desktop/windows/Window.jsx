import React, { useEffect, useRef, useState } from "react";
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
import { getTaskButtonRect } from "../../desktop/Taskbar/taskbarRegistry";
import { getPreview, setPreview, clearPreview } from "./previewRegistry";

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
  const [animState, setAnimState] = useState("idle"); // idle | minimizing | restoring
  const justRestoredRef = useRef(false);
  const rndRef = useRef(null);
  const winElRef = useRef(null);
  const [animateBounds, setAnimateBounds] = useState(false);
  const prevMaxRef = useRef(null);

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

  // When window is restored (minimized -> false), play restore animation from taskbar button
  useEffect(() => {
    if (!win) return;
    if (win.minimized === false) {
      const toEl = winElRef.current;
      if (!toEl) return;
      const toRect = toEl.getBoundingClientRect();
      const fromRect = getTaskButtonRect(name);

      if (fromRect) {
        const preview = getPreview(name);
        const ghost = document.createElement("div");
        Object.assign(ghost.style, {
          position: "fixed",
          left: `${fromRect.left}px`,
          top: `${fromRect.top}px`,
          width: `${fromRect.width}px`,
          height: `${fromRect.height}px`,
          background: preview ? `url('${preview}')` : "rgba(255,255,255,0.08)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          zIndex: 9999,
          transition: "all 240ms cubic-bezier(.2,.8,.2,1)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
        });
        document.body.appendChild(ghost);

        toEl.style.visibility = "hidden";
        requestAnimationFrame(() => {
          Object.assign(ghost.style, {
            left: `${toRect.left}px`,
            top: `${toRect.top}px`,
            width: `${toRect.width}px`,
            height: `${toRect.height}px`,
            borderRadius: "10px",
          });
        });

        setTimeout(() => {
          ghost.remove();
          toEl.style.visibility = "visible";
          clearPreview(name);
        }, 260);
      } else {
        // Fallback to simple fade-in if no taskbar rect
        justRestoredRef.current = true;
        setAnimState("restoring");
        const t = setTimeout(() => {
          setAnimState("idle");
          justRestoredRef.current = false;
        }, 240);
        return () => clearTimeout(t);
      }
    }
  }, [win?.minimized]);

  // Animate bounds when maximizing/restoring size
  useEffect(() => {
    if (prevMaxRef.current === null) {
      prevMaxRef.current = win?.maximized;
      return;
    }
    if (prevMaxRef.current !== win?.maximized) {
      setAnimateBounds(true);
      const t = setTimeout(() => setAnimateBounds(false), 250);
      prevMaxRef.current = win?.maximized;
      return () => clearTimeout(t);
    }
  }, [win?.maximized]);

  const handleFocus = () => dispatch(bringToFront(name));
  const handleClose = () => dispatch(closeWindow(name));
  const handleMinimize = () => {
    const el = winElRef.current;
    const toRect = getTaskButtonRect(name);
    const runFallback = () => {
      setAnimState("minimizing");
      setTimeout(() => {
        dispatch(minimizeWindow(name));
        setAnimState("idle");
      }, 210);
    };

    if (!el || !toRect) return runFallback();

    const fromRect = el.getBoundingClientRect();

    // Try to capture a thumbnail using html2canvas
    const captureAndAnimate = async () => {
      try {
        const { default: html2canvas } = await import("html2canvas");
        const canvas = await html2canvas(el, {
          backgroundColor: null,
          useCORS: true,
          scale: window.devicePixelRatio > 1 ? 1.5 : 1,
          logging: false,
          windowWidth: document.documentElement.clientWidth,
          windowHeight: document.documentElement.clientHeight,
        });
        const dataUrl = canvas.toDataURL("image/png");
        setPreview(name, dataUrl);

        const ghost = document.createElement("div");
        Object.assign(ghost.style, {
          position: "fixed",
          left: `${fromRect.left}px`,
          top: `${fromRect.top}px`,
          width: `${fromRect.width}px`,
          height: `${fromRect.height}px`,
          backgroundImage: `url('${dataUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          zIndex: 9999,
          transition: "all 200ms cubic-bezier(.2,.8,.2,1)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
          imageRendering: "-webkit-optimize-contrast",
        });
        document.body.appendChild(ghost);
        el.style.visibility = "hidden";
        requestAnimationFrame(() => {
          Object.assign(ghost.style, {
            left: `${toRect.left}px`,
            top: `${toRect.top}px`,
            width: `${toRect.width}px`,
            height: `${toRect.height}px`,
            borderRadius: "6px",
          });
        });
        setTimeout(() => {
          ghost.remove();
          dispatch(minimizeWindow(name));
          el.style.visibility = "hidden";
        }, 210);
      } catch (e) {
        runFallback();
      }
    };

    captureAndAnimate();
  };
  const handleMaximize = () => dispatch(maximizeWindow(name));

  const contentClass =
    scrollMode === "auto"
      ? "flex-1 min-h-0 overflow-auto"     // el contenedor scrollea
      : "flex-1 min-h-0 overflow-hidden";  // el hijo scrollea (Terminal)

  const shouldHide = win.minimized && animState !== "minimizing";

  return (
    <Rnd
      ref={rndRef}
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
        display: shouldHide ? "none" : "block",
      }}
      onDragStop={(e, d) => dispatch(moveWindow({ name, x: d.x, y: d.y }))}
      onResizeStop={(e, dir, ref, delta, pos) => {
        dispatch(
          resizeWindow({ name, width: ref.offsetWidth, height: ref.offsetHeight })
        );
        dispatch(moveWindow({ name, x: pos.x, y: pos.y }));
      }}
      onMouseDown={handleFocus}
      className={`${
        animState === "minimizing"
          ? "animate-win-out pointer-events-none"
          : animState === "restoring"
          ? "animate-win-in"
          : ""
      } absolute`}
      dragHandleClassName="window-titlebar"
    >
      <style>{
        animateBounds
          ? `[data-win="${name}"]{transition:left 240ms ease, top 240ms ease, width 240ms ease, height 240ms ease;}`
          : ``
      }</style>
      <div
        data-win={name}
        className="flex flex-col w-full h-full shadow-lg min-h-0"
        ref={winElRef}
        style={{
          border: `2px solid ${borderColor}`,
          fontFamily,
          backgroundColor: contentBg,
          color: textColor,
        }}
      >
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
        <div className={contentClass}>{children}</div>
      </div>
    </Rnd>
  );
}
