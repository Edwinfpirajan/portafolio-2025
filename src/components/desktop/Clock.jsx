// src/components/desktop/Clock.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../../redux/slices/systemSlice";

export default function Clock() {
  const dispatch = useDispatch();
  const time = useSelector((s) => s.system.time) || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="px-3 py-1 text-sm font-retro">
      {time}
    </div>
  );
}
