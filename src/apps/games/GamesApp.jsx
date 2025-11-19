import React, { useState } from "react";

import SnakeGame from "./SnakeGame.jsx";
import Solitaire from "./Solitaire.jsx";


const RPS_EMOJIS = {
  piedra: "✊",
  papel: "✋",
  tijeras: "✌️"
};

function RPSGame() {
  const [player, setPlayer] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const options = ["piedra", "papel", "tijeras"];

  const play = (choice) => {
    const cpuChoice = options[Math.floor(Math.random() * 3)];
    setPlayer(choice);
    setCpu(cpuChoice);
    setShow(false);
    setTimeout(() => setShow(true), 300);
    if (choice === cpuChoice) setResult("Empate");
    else if (
      (choice === "piedra" && cpuChoice === "tijeras") ||
      (choice === "papel" && cpuChoice === "piedra") ||
      (choice === "tijeras" && cpuChoice === "papel")
    ) setResult("¡Ganaste!");
    else setResult("Perdiste");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 select-none">
      <h2 className="text-xl font-bold mb-4">Piedra, Papel o Tijeras</h2>
      <div className="flex gap-4 mb-4">
        {options.map(opt => (
          <button
            key={opt}
            className="px-6 py-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-3xl transition-transform active:scale-90"
            onClick={() => play(opt)}
          >
            {RPS_EMOJIS[opt]}
          </button>
        ))}
      </div>
      {player && show && (
        <div className="flex items-center justify-center gap-8 mb-4 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-5xl animate-bounce">{RPS_EMOJIS[player]}</span>
            <span className="mt-1 text-base">Tú</span>
          </div>
          <span className="text-3xl">vs</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl animate-bounce delay-150">{RPS_EMOJIS[cpu]}</span>
            <span className="mt-1 text-base">CPU</span>
          </div>
        </div>
      )}
      {show && result && <div className="text-2xl font-bold mb-2 animate-fade-in">{result}</div>}
      <button
        className="mt-2 px-3 py-1 bg-neutral-700 text-white rounded hover:bg-neutral-800"
        onClick={() => { setPlayer(null); setCpu(null); setResult(""); setShow(false); }}
      >Jugar de nuevo</button>
    </div>
  );
}


// Solitario real importado

const GAMES = [
  {
    key: "snake",
    name: "Culebrita (Snake)",
    icon: "🐍",
    component: SnakeGame,
  },
  {
    key: "rps",
    name: "Piedra, Papel o Tijeras",
    icon: "✊✋✌️",
    component: RPSGame,
  },
  {
    key: "solitaire",
    name: "Solitario",
    icon: "🃏",
    component: Solitaire,
  },
];

export default function GamesApp() {
  const [selected, setSelected] = useState(null);
  const Game = selected ? GAMES.find(g => g.key === selected)?.component : null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 text-white">
      {!selected ? (
        <div className="w-full max-w-md mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Juegos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
