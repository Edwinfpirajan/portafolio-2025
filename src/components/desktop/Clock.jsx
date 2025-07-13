// src/components/desktop/Clock.jsx
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-3 py-1 text-sm font-retro">
      {time}
    </div>
  );
}
