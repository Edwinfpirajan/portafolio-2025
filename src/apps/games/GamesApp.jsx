import React from "react";
import SnakeGame from "./SnakeGame.jsx";

export default function GamesApp() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 text-white">
      <SnakeGame />
    </div>
  );
}
