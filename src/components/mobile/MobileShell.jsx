// src/components/mobile/MobileShell.jsx
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Home from "./apps/Home";
import AppContainer from "./apps/AppContainer";
import Recents from "./apps/Recents";

export default function MobileShell() {
  const screen = useSelector((s) => s.mobile.screen);

  // altura real de tu barra inferior (NavBar)
  const NAVBAR_H = 72;

  const topOffset = "calc(env(safe-area-inset-top) + var(--ios-top-offset, 14px))";

  return (
    <div
      className="fixed inset-0 bg-[#0b0b0f] overflow-hidden"
      style={{ height: "100dvh", minHeight: "100dvh", "--navbar-h": `${NAVBAR_H}px` }}
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
  <img src="/wallpapers/bg-mobile.jpg" alt="Fondo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </div>

      {/* Contenido scrollable: dejamos hueco arriba y damos padding abajo seguro */}
      <div
        className="absolute inset-x-0 content-scroll pb-content-safe"
        style={{ top: topOffset, bottom: 0 }}
      >
        {screen === "home" && <Home />}
        {screen === "app" && <AppContainer />}
        {screen === "recents" && <Recents />}
      </div>

      {/* Barra inferior fija */}
      <div className="absolute inset-x-0" style={{ bottom: "env(safe-area-inset-bottom)" }}>
        <NavBar height={NAVBAR_H} />
      </div>
    </div>
  );
}
