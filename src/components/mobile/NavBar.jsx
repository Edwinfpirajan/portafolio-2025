import React from "react";
import { useDispatch } from "react-redux";
import { goBack, goHome, showRecents } from "../../store/mobileSlice";

export default function NavBar() {
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-black/50 backdrop-blur border-t border-white/10 flex items-center justify-around h-navbar">
      {/* Botones: mínimo 44x44 y tipografía más grande */}
      <button
        aria-label="Atrás"
        onClick={() => dispatch(goBack())}
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full active:scale-95 transition text-white"
      >
        {/* Puedes cambiar por SVGs luego */}
        <span className="text-2xl sm:text-3xl">⟵</span>
      </button>

      <button
        aria-label="Inicio"
        onClick={() => dispatch(goHome())}
        className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full active:scale-95 transition text-white bg-white/10"
      >
        <span className="text-2xl sm:text-3xl">●</span>
      </button>

      <button
        aria-label="Recientes"
        onClick={() => dispatch(showRecents())}
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full active:scale-95 transition text-white"
      >
        <span className="text-2xl sm:text-3xl">≡</span>
      </button>
    </div>
  );
}
