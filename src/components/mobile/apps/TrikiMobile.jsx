import React, { useState } from "react";

const EMPTY = Array(9).fill(null);
const SYMBOLS = { X: "❌", O: "⚪" };

function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "empate" : null;
}

export default function TrikiMobile() {
  const [board, setBoard] = useState(EMPTY);
  const [turn, setTurn] = useState("X");
  const winner = checkWinner(board);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(EMPTY);
    setTurn("X");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 select-none">
      <h2 className="text-lg font-bold mb-4">Triki (Tres en línea)</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, i) => (
          <button
            key={i}
            className="w-16 h-16 bg-neutral-800 rounded text-4xl flex items-center justify-center shadow border border-neutral-600"
            onClick={() => handleClick(i)}
            disabled={!!cell || !!winner}
          >
            {cell ? SYMBOLS[cell] : ""}
          </button>
        ))}
      </div>
      {winner && (
        <div className="mb-2 text-xl font-bold">
          {winner === "empate" ? "Empate" : `Ganó ${SYMBOLS[winner]}`}
        </div>
      )}
      <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded" onClick={reset}>Reiniciar</button>
    </div>
  );
}
