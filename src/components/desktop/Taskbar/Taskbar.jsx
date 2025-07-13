import React from "react";
import StartButton from "./StartButton";
import StartMenu from "../Taskbar/StartMenu";
import Clock from "../Clock"; // si tienes uno
import { useSelector } from "react-redux";

export default function Taskbar() {
  const taskbarColor = useSelector((state) => state.ui.colors.taskbar);

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 flex items-center justify-between px-4 z-50 bg-[#dcdcdc] border-t border-[#888]" style={{
      backgroundColor: taskbarColor
    }}>
      <div className="relative">
        <StartButton />
        <StartMenu />
      </div>
      <Clock />
    </div>
  );
}
