import React, { useState } from "react";
import RPSGameMobile from "./RPSGameMobile.jsx";
import TrikiMobile from "./TrikiMobile.jsx";
import SolitaireMobile from "./SolitaireMobile.jsx";

const GAMES = [
  {
    key: "rps",
    name: "Piedra, Papel o Tijeras",
    icon: "✊✋✌️",
    component: RPSGameMobile,
  },
  {
    key: "triki",
    name: "Triki (Tres en línea)",
    icon: "❌⚪",
    component: TrikiMobile,
  },
  {
    key: "solitaire",
    name: "Solitario",
    icon: "🃏",
    component: SolitaireMobile,
  },
];

export default function GamesMobile() {
  const [selected, setSelected] = useState(null);
  const Game = selected ? GAMES.find(g => g.key === selected)?.component : null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 text-white">
      {!selected ? (
        <div className="w-full max-w-md mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Juegos</h2>
          <div className="grid grid-cols-1 gap-6">
            {GAMES.map(game => (
              <button
                key={game.key}
                className="flex flex-col items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-xl p-6 shadow transition"
                onClick={() => setSelected(game.key)}
              >
                <div className="text-4xl mb-2">{game.icon}</div>
                <div className="text-lg font-semibold text-center">{game.name}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button
            className="absolute top-4 left-4 px-3 py-1 bg-neutral-700 text-white rounded hover:bg-neutral-800 z-10"
            onClick={() => setSelected(null)}
          >← Volver</button>
          <div className="w-full h-full flex items-center justify-center">
            <Game />
          </div>
        </>
      )}
    </div>
  );
}
