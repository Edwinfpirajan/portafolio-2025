import React from "react";

export default function Icon({ label, iconPath, onClick }) {
  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer text-xs font-retro text-center text-black hover:opacity-80"
      onClick={onClick}
    >
      <img src={iconPath} alt={label} className="w-10 h-10 mb-1" />
      <span>{label}</span>
    </div>
  );
}
