import React, { useState } from "react";

function RPSGameMobile() {
  const [player, setPlayer] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const options = ["piedra", "papel", "tijeras"];
  const EMOJIS = { piedra: "✊", papel: "✋", tijeras: "✌️" };

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
      <h2 className="text-lg font-bold mb-4">Piedra, Papel o Tijeras</h2>
      <div className="flex gap-4 mb-4">
        {options.map(opt => (
          <button
            key={opt}
            className="px-4 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-3xl transition-transform active:scale-90"
            onClick={() => play(opt)}
          >
            {EMOJIS[opt]}
          </button>
        ))}
      </div>
      {player && show && (
        <div className="flex items-center justify-center gap-6 mb-4 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-bounce">{EMOJIS[player]}</span>
            <span className="mt-1 text-sm">Tú</span>
          </div>
          <span className="text-xl">vs</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-bounce delay-150">{EMOJIS[cpu]}</span>
            <span className="mt-1 text-sm">CPU</span>
          </div>
        </div>
      )}
      {show && result && <div className="text-xl font-bold mb-2 animate-fade-in">{result}</div>}
      <button
        className="mt-2 px-3 py-1 bg-neutral-700 text-white rounded hover:bg-neutral-800"
        onClick={() => { setPlayer(null); setCpu(null); setResult(""); setShow(false); }}
      >Jugar de nuevo</button>
    </div>
  );
}

export default RPSGameMobile;
