// src/components/mobile/MobileShell.jsx
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Home from "./apps/Home";
import AppContainer from "./apps/AppContainer";
import Recents from "./apps/Recents";

export default function MobileShell() {
  const screen = useSelector((s) => s.mobile.screen);
  const theme = useSelector((s) => s.ui.theme);

  // altura real de tu barra inferior (NavBar)
  const NAVBAR_H = 44;

  const bgGradient = theme === "dark" 
    ? "from-black/40 to-black/70" 
    : "from-white/20 to-white/40";

  return (
    <div
      className="fixed inset-0 bg-[#0b0b0f] overflow-hidden"
      style={{ height: "100dvh", minHeight: "100dvh", '--navbar-h': `${NAVBAR_H}px` }}
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img src="/wallpapers/bg-mobile.jpg" alt="Fondo" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient}`} />
      </div>

      {/* Contenido: wrapper con altura exacta */}
      <div
        className="relative w-full"
        style={{
          height: `calc(100dvh - ${NAVBAR_H}px)`,
          minHeight: 0,
        }}
      >
        {screen === "home" && <Home />}
        {screen === "app" && <AppContainer />}
        {screen === "recents" && <Recents />}
      </div>

      {/* Barra inferior fija */}
      <div
        className="absolute inset-x-0"
        style={{ bottom: 0, height: `${NAVBAR_H}px` }}
      >
        <NavBar height={NAVBAR_H} />
      </div>
    </div>
  );
}
