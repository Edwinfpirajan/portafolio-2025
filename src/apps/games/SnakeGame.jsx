import React, { useRef, useEffect, useState } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEED = 100; // ms

function getRandomFood(snake) {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y));
  return newFood;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const moveRef = useRef(direction);
  const running = useRef(true);

  useEffect(() => {
    moveRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!running.current) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (moveRef.current.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          if (moveRef.current.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          if (moveRef.current.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          if (moveRef.current.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: (prev[0].x + moveRef.current.x + BOARD_SIZE) % BOARD_SIZE,
          y: (prev[0].y + moveRef.current.y + BOARD_SIZE) % BOARD_SIZE,
        };
        // Check collision
        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          running.current = false;
          return prev;
        }
        let newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFood(newSnake));
          setScore((s) => s + 1);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(interval);
  }, [food, gameOver]);

  const handleRestart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    running.current = true;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 select-none">
      <h2 className="text-xl font-bold mb-2">Culebrita (Snake)</h2>
      <div
        className="grid bg-neutral-900 border-2 border-neutral-700"
        style={{
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          width: 400,
          height: 400,
          maxWidth: "90vw",
          maxHeight: "60vw",
        }}
      >
        {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`w-full h-full border border-neutral-800 flex items-center justify-center transition-all duration-75
                ${isHead ? "bg-green-400" : isSnake ? "bg-green-700" : isFood ? "bg-red-500" : "bg-neutral-950"}
              `}
              style={{ aspectRatio: 1 }}
            />
          );
        })}
      </div>
      <div className="mt-4 text-lg">Puntaje: <b>{score}</b></div>
      {gameOver && (
        <div className="mt-4 text-center">
          <div className="text-red-400 font-bold text-xl mb-2">¡Perdiste!</div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            onClick={handleRestart}
          >
            Reiniciar
          </button>
        </div>
      )}
      <div className="mt-4 text-xs text-neutral-400">Usa las flechas o WASD para mover la culebrita.</div>
    </div>
  );
}
