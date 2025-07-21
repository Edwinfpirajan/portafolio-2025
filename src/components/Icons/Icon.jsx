import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Icon({ label, iconPath, onDoubleClick }) {
  const themeColor = useSelector((state) => state.ui.colors.mainColor);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <div
      className="flex flex-col items-center w-[80px] cursor-pointer select-none outline-none"
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <img src={iconPath} alt={label} className="w-12 h-12 mb-1" />
      <span
        className={`text-center text-[13px] font-normal leading-tight break-words px-1 rounded-sm`}
        style={{
          color: "white",
          textShadow: "1px 1px 2px black",
          backgroundColor: selected ? themeColor : "transparent",
          maxWidth: "80px",
          wordWrap: "break-word",
        }}
      >
        {label}
      </span>
    </div>
  );
}
