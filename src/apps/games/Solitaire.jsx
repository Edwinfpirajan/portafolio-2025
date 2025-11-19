import React, { useState } from "react";

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
  const deck = [];
  for (let s = 0; s < 4; s++) {
    for (let r = 0; r < 13; r++) {
      deck.push({
        suit: SUITS[s],
        rank: RANKS[r],
        color: SUITS[s] === "♥" || SUITS[s] === "♦" ? "red" : "black",
        id: `${SUITS[s]}${RANKS[r]}`
      });
    }
  }
  return deck;
}

function shuffle(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Card({ card, faceUp, onClick }) {
  return (
    <div
      className={`w-10 h-16 border rounded flex items-center justify-center text-lg font-bold select-none shadow-sm cursor-pointer ${faceUp ? (card.color === "red" ? "text-red-500 bg-white" : "text-black bg-white") : "bg-neutral-400 text-neutral-600"}`}
      style={{ marginTop: "-18px", zIndex: faceUp ? 1 : 0 }}
      onClick={onClick}
    >
      {faceUp ? `${card.rank}${card.suit}` : ""}
    </div>
  );
}

export default function Solitaire() {
  // Setup
  const [stock, setStock] = useState(() => shuffle(createDeck()));
  const [waste, setWaste] = useState([]);
  const [tableau, setTableau] = useState(() => {
    const deck = shuffle(createDeck());
    let idx = 0;
    return Array.from({ length: 7 }, (_, col) => {
      const pile = [];
      for (let row = 0; row <= col; row++) {
        pile.push({ ...deck[idx++], faceUp: row === col });
      }
      return pile;
    });
  });
  const [foundations, setFoundations] = useState([[], [], [], []]);

  // Draw from stock
  const draw = () => {
    if (stock.length === 0) {
      setStock(waste.reverse());
      setWaste([]);
      return;
    }
    setWaste([stock[0], ...waste]);
    setStock(stock.slice(1));
  };

  // Move waste to foundation or tableau
  const moveWaste = (to, colIdx) => {
    if (!waste.length) return;
    const card = waste[0];
    if (to === "foundation") {
      const idx = SUITS.indexOf(card.suit);
      const pile = foundations[idx];
      if (
        (pile.length === 0 && card.rank === "A") ||
        (pile.length > 0 &&
          RANKS.indexOf(card.rank) === RANKS.indexOf(pile[pile.length - 1].rank) + 1)
      ) {
        setFoundations(f => {
          const copy = f.map(arr => [...arr]);
          copy[idx].push(card);
          return copy;
        });
        setWaste(waste.slice(1));
      }
    } else if (to === "tableau") {
      const pile = tableau[colIdx];
      if (
        (pile.length === 0 && card.rank === "K") ||
        (pile.length > 0 &&
          card.color !== pile[pile.length - 1].color &&
          RANKS.indexOf(card.rank) === RANKS.indexOf(pile[pile.length - 1].rank) - 1)
      ) {
        setTableau(t => {
          const copy = t.map(arr => [...arr]);
          copy[colIdx].push({ ...card, faceUp: true });
          return copy;
        });
        setWaste(waste.slice(1));
      }
    }
  };

  // Move tableau card to foundation
  const moveTableauToFoundation = (colIdx) => {
    const pile = tableau[colIdx];
    if (!pile.length) return;
    const card = pile[pile.length - 1];
    const idx = SUITS.indexOf(card.suit);
    const found = foundations[idx];
    if (
      (found.length === 0 && card.rank === "A") ||
      (found.length > 0 &&
        RANKS.indexOf(card.rank) === RANKS.indexOf(found[found.length - 1].rank) + 1)
    ) {
      setFoundations(f => {
        const copy = f.map(arr => [...arr]);
        copy[idx].push(card);
        return copy;
      });
      setTableau(t => {
        const copy = t.map(arr => [...arr]);
        copy[colIdx].pop();
        if (copy[colIdx].length && !copy[colIdx][copy[colIdx].length - 1].faceUp) {
          copy[colIdx][copy[colIdx].length - 1].faceUp = true;
        }
        return copy;
      });
    }
  };

  // Move tableau card to another tableau
  const moveTableauToTableau = (fromIdx, toIdx) => {
    const fromPile = tableau[fromIdx];
    if (!fromPile.length) return;
    const card = fromPile[fromPile.length - 1];
    const toPile = tableau[toIdx];
    if (
      (toPile.length === 0 && card.rank === "K") ||
      (toPile.length > 0 &&
        card.color !== toPile[toPile.length - 1].color &&
        RANKS.indexOf(card.rank) === RANKS.indexOf(toPile[toPile.length - 1].rank) - 1)
    ) {
      setTableau(t => {
        const copy = t.map(arr => [...arr]);
        copy[toIdx].push({ ...card, faceUp: true });
        copy[fromIdx].pop();
        if (copy[fromIdx].length && !copy[fromIdx][copy[fromIdx].length - 1].faceUp) {
          copy[fromIdx][copy[fromIdx].length - 1].faceUp = true;
        }
        return copy;
      });
    }
  };

  // Restart
  const restart = () => {
    setStock(shuffle(createDeck()));
    setWaste([]);
    setTableau(() => {
      const deck = shuffle(createDeck());
      let idx = 0;
      return Array.from({ length: 7 }, (_, col) => {
        const pile = [];
        for (let row = 0; row <= col; row++) {
          pile.push({ ...deck[idx++], faceUp: row === col });
        }
        return pile;
      });
    });
    setFoundations([[], [], [], []]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 select-none">
      <h2 className="text-xl font-bold mb-2">Solitario (básico)</h2>
      <div className="flex gap-4 mb-2">
        <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={draw}>Robar carta</button>
        <button className="px-2 py-1 bg-neutral-700 text-white rounded" onClick={restart}>Reiniciar</button>
      </div>
      <div className="flex gap-4 mb-4">
        {/* Stock y Waste */}
        <div className="flex flex-col items-center">
          <div className="mb-1">Stock</div>
          <Card card={{}} faceUp={!!stock.length} onClick={draw} />
          <div className="mt-1 text-xs text-neutral-400">{stock.length} cartas</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-1">Waste</div>
          {waste.length ? (
            <Card card={waste[0]} faceUp={true} onClick={() => moveWaste("foundation")} />
          ) : (
            <div className="w-10 h-16 bg-neutral-300 rounded border" />
          )}
        </div>
        {/* Foundations */}
        {foundations.map((pile, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="mb-1">{SUITS[i]}</div>
            {pile.length ? (
              <Card card={pile[pile.length - 1]} faceUp={true} />
            ) : (
              <div className="w-10 h-16 bg-neutral-300 rounded border" />
            )}
          </div>
        ))}
      </div>
      {/* Tableau */}
      <div className="flex gap-2">
        {tableau.map((pile, colIdx) => (
          <div key={colIdx} className="flex flex-col items-end">
            {pile.map((card, i) => (
              <Card
                key={card.id + i}
                card={card}
                faceUp={card.faceUp}
                onClick={() => {
                  if (card.faceUp && i === pile.length - 1) {
                    moveTableauToFoundation(colIdx);
                  }
                }}
              />
            ))}
            {/* Move waste to tableau */}
            <button
              className="mt-1 px-1 py-0.5 text-xs bg-green-600 text-white rounded"
              onClick={() => moveWaste("tableau", colIdx)}
              disabled={!waste.length}
            >
              ⬇️ Waste
            </button>
            {/* Move tableau to tableau */}
            <div className="flex flex-col gap-1 mt-1">
              {tableau.map((_, toIdx) =>
                toIdx !== colIdx ? (
                  <button
                    key={toIdx}
                    className="px-1 py-0.5 text-xs bg-yellow-600 text-white rounded"
                    onClick={() => moveTableauToTableau(colIdx, toIdx)}
                  >
                    → {toIdx + 1}
                  </button>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
