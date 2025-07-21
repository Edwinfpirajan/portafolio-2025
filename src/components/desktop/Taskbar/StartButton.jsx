import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStartMenu } from "../../../store/startMenuSlice";

export default function StartButton() {
  const dispatch = useDispatch();

  const isActive = useSelector((state) => state.startMenu.isOpen);
  const theme = useSelector((state) => state.ui.theme);
  const taskbarColor = useSelector((state) => state.ui.colors.mainColor);
  const contrast = useSelector((state) => state.ui.contrast); // opcional

  const hoverShadow =
    theme === "dark"
      ? "hover:shadow-[0_0_5px_2px_rgba(255,255,255,0.2)]"
      : "hover:shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]";

  return (
    <button
      onClick={() => dispatch(toggleStartMenu())}
      aria-label="Abrir menú inicio"
      className={`w-10 h-10 flex items-center justify-center rounded-full border transition duration-150 ease-in-out
        ${isActive
          ? "shadow-inner translate-y-[1px] border-white"
          : `${hoverShadow} hover:brightness-110 border`}
        active:scale-95
      `}
      style={{
        backgroundColor: taskbarColor,
      }}
    >
      <img
        src="/icons/start_btn.png"
        alt="Start"
        className="w-8 h-8 object-contain"
      />
    </button>
  );
}
