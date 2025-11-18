import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  moveWindow,
  resizeWindow,
  bringToFront,
} from "../../../redux/slices/windowsSlice";
import { initRuntime, setAnimState, setAnimateBounds, setIsOpening, setViewport } from "../../../redux/slices/windowUiSlice";
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
  const animState = useSelector((s) => s.windowUi.runtime[name]?.animState || "idle");
  const justRestoredRef = useRef(false);
  const rndRef = useRef(null);
  const winElRef = useRef(null);
  const animateBounds = useSelector((s) => s.windowUi.runtime[name]?.animateBounds || false);
  const prevMaxRef = useRef(null);
  const isOpening = useSelector((s) => s.windowUi.runtime[name]?.isOpening || false);
  const viewport = useSelector((s) => s.windowUi.viewport);
  useEffect(() => {
    dispatch(initRuntime(name));
    const t = setTimeout(() => dispatch(setIsOpening({ name, value: false })), 160);
    return () => clearTimeout(t);
  }, [dispatch, name]);
  useEffect(() => {
    const onResize = () => dispatch(setViewport({ w: window.innerWidth, h: window.innerHeight }));
    dispatch(setViewport({ w: window.innerWidth, h: window.innerHeight }));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [dispatch]);

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
          transition: "all 180ms cubic-bezier(.2,.8,.2,1)",
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
        }, 190);
      } else {
        // Fallback to simple fade-in if no taskbar rect
        justRestoredRef.current = true;
        dispatch(setAnimState({ name, value: "restoring" }));
        const t = setTimeout(() => {
          dispatch(setAnimState({ name, value: "idle" }));
          justRestoredRef.current = false;
        }, 180);
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
      dispatch(setAnimateBounds({ name, value: true }));
      const t = setTimeout(() => dispatch(setAnimateBounds({ name, value: false })), 250);
      prevMaxRef.current = win?.maximized;
      return () => clearTimeout(t);
    }
  }, [win?.maximized]);

  const handleFocus = () => dispatch(bringToFront(name));
  const handleClose = () => dispatch(closeWindow(name));
  const handleMinimize = () => {
    const el = winElRef.current;
    const toRect = getTaskButtonRect(name);
    const DURATION = 180;
    const EASE = "cubic-bezier(.2,.8,.2,1)";
    const runFallback = () => {
      dispatch(setAnimState({ name, value: "minimizing" }));
      setTimeout(() => {
        dispatch(minimizeWindow(name));
        dispatch(setAnimState({ name, value: "idle" }));
      }, DURATION);
    };

    if (!el || !toRect) return runFallback();

    const fromRect = el.getBoundingClientRect();

    // Create ghost immediately for instant feedback
    const ghost = document.createElement("div");
    Object.assign(ghost.style, {
      position: "fixed",
      left: `${fromRect.left}px`,
      top: `${fromRect.top}px`,
      width: `${fromRect.width}px`,
      height: `${fromRect.height}px`,
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(2px)",
      borderRadius: "10px",
      zIndex: 9999,
      transition: `all ${DURATION}ms ${EASE}`,
      boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
    });
    document.body.appendChild(ghost);

    // Hide real window now
    el.style.visibility = "hidden";

    // Animate to taskbar button in next frame
    requestAnimationFrame(() => {
      Object.assign(ghost.style, {
        left: `${toRect.left}px`,
        top: `${toRect.top}px`,
        width: `${toRect.width}px`,
        height: `${toRect.height}px`,
        borderRadius: "6px",
      });
    });

    // Fire non-blocking capture in background to use on restore
    import("html2canvas")
      .then(({ default: html2canvas }) =>
        html2canvas(el, {
          backgroundColor: null,
          useCORS: true,
          scale: window.devicePixelRatio > 1 ? 1.25 : 1,
          logging: false,
          windowWidth: document.documentElement.clientWidth,
          windowHeight: document.documentElement.clientHeight,
        })
      )
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        setPreview(name, dataUrl);
        // If ghost still exists, upgrade background mid-flight
        if (document.body.contains(ghost)) {
          ghost.style.backgroundImage = `url('${dataUrl}')`;
          ghost.style.backgroundSize = "cover";
          ghost.style.backgroundPosition = "center";
          ghost.style.backgroundColor = "transparent";
        }
      })
      .catch(() => {});

    setTimeout(() => {
      ghost.remove();
      dispatch(minimizeWindow(name));
    }, DURATION + 10);
  };
  const handleMaximize = () => dispatch(maximizeWindow(name));

  const contentClass =
    scrollMode === "auto"
      ? "flex-1 min-h-0 overflow-auto"     // el contenedor scrollea
      : "flex-1 min-h-0 overflow-hidden";  // el hijo scrollea (Terminal)

  const shouldHide = win.minimized && animState !== "minimizing";
  const TASKBAR_H = 40; // h-10

  return (
    <Rnd
      ref={rndRef}
      size={
        win.maximized
          ? { width: viewport.w, height: Math.max(0, viewport.h - TASKBAR_H) }
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
      onDragStop={(e, d) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const curW = win.maximized ? vw : win.width;
        const curH = win.maximized ? (vh - TASKBAR_H) : win.height;
        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
        const maxX = Math.max(0, vw - curW);
        const maxY = Math.max(0, vh - TASKBAR_H - curH);
        const x = clamp(d.x, 0, maxX);
        const y = clamp(d.y, 0, maxY);
        dispatch(moveWindow({ name, x, y }));
      }}
      onResizeStop={(e, dir, ref, delta, pos) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const newW = ref.offsetWidth;
        const newH = ref.offsetHeight;
        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
        const maxX = Math.max(0, vw - newW);
        const maxY = Math.max(0, vh - TASKBAR_H - newH);
        const x = clamp(pos.x, 0, maxX);
        const y = clamp(pos.y, 0, maxY);
        dispatch(resizeWindow({ name, width: newW, height: newH }));
        dispatch(moveWindow({ name, x, y }));
      }}
      onMouseDown={handleFocus}
      className={`${
        animState === "minimizing"
          ? "animate-win-out pointer-events-none"
          : animState === "restoring"
          ? "animate-win-in"
          : isOpening ? "animate-win-open" : ""
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
        className={`flex flex-col w-full h-full shadow-lg min-h-0 ${win.maximized ? '' : 'rounded-lg'} overflow-hidden`}
        ref={winElRef}
        style={{
          border: `2px solid ${borderColor}`,
          fontFamily,
          backgroundColor: contentBg,
          color: textColor,
        }}
      >
        <div
          className={`window-titlebar flex justify-between items-center px-2 py-1 cursor-move select-none ${win.maximized ? '' : 'rounded-t-md'}`}
          style={{ backgroundColor: headerBg, color: "#fff" }}
        >
          <span>{title}</span>
          <div className="space-x-1">
            <button
              onClick={handleMinimize}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-2 py-0.5 text-xs font-bold border border-white rounded cursor-default transition-colors duration-150 active:translate-y-[1px]"
            >
              ▁
            </button>
            <button
              onClick={handleMaximize}
              className="bg-green-500 hover:bg-green-400 text-black px-2 py-0.5 text-xs font-bold border border-white rounded cursor-default transition-colors duration-150 active:translate-y-[1px]"
            >
              ▢
            </button>
            <button
              onClick={handleClose}
              className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 text-xs font-bold border border-white rounded cursor-default transition-colors duration-150 active:translate-y-[1px]"
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
