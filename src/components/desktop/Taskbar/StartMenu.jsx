import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openWindow } from "../../../store/windowsSlice";

export default function StartMenu() {
  const isOpen = useSelector((state) => state.startMenu.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-12 left-2 w-48 bg-white border border-black shadow-lg p-2 z-50 font-retro text-xs">
      <ul className="space-y-2">
        <li
          className="cursor-pointer hover:bg-gray-100 p-1"
          onClick={() => dispatch(openWindow("about"))}
        >
          🧑 Sobre mí
        </li>
        <li
          className="cursor-pointer hover:bg-gray-100 p-1"
          onClick={() => dispatch(openWindow("projects"))}
        >
          📁 Proyectos
        </li>
        <li
          className="cursor-pointer hover:bg-gray-100 p-1"
          onClick={() => dispatch(openWindow("contact"))}
        >
          📞 Contacto
        </li>
      </ul>
    </div>
  );
}
