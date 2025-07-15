import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

export default function AnimatedBackground() {
  const backgroundRef = useRef(null);
  const vantaRef = useRef(null);
  const background = useSelector((state) => state.ui.background);

  useEffect(() => {
    if (!vantaRef.current) {
      vantaRef.current = WAVES({
        el: backgroundRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0055ff, // Azul como en tu imagen
        backgroundColor: "#000000",
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1.2,
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        opacity: background.opacity || 1,
        pointerEvents: "none", // evita que interfiera con clics
        overflow: "hidden",
      }}
    />
  );
  
}
