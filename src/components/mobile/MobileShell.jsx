import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Home from "./apps/Home";
import AppContainer from "./apps/AppContainer";
import Recents from "./apps/Recents";

export default function MobileShell() {
  const screen = useSelector((s) => s.mobile.screen);

  return (
    <div className="w-full h-full bg-[#0b0b0f] relative">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <video
          className="w-full h-full object-cover opacity-45"
          src="/images/background.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </div>

      {/* Contenido: deja sitio para la NavBar (h-navbar) */}
      <div className="absolute inset-x-0 top-0" style={{ bottom: "calc(64px + env(safe-area-inset-bottom))" }}>
        {screen === "home" && <Home />}
        {screen === "app" && <AppContainer />}
        {screen === "recents" && <Recents />}
      </div>

      {/* Barra inferior */}
      <div className="absolute inset-x-0 bottom-0">
        <NavBar />
      </div>
    </div>
  );
}
