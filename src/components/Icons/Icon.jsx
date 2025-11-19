import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIcon, clearSelection, setIconPosition, setDraggingIcon, setDragOffset, clearDrag } from "../../redux/slices/desktopSlice";

const GRID_SIZE = 96; // Must match desktopSlice

export default function Icon({ iconKey, label, iconPath, onDoubleClick, gridX, gridY }) {
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.ui.colors.mainColor);
  const selected = useSelector((state) => state.desktop.selectedIcon === iconKey);
  const allPositions = useSelector((state) => state.desktop.iconPositions);
  const draggingIcon = useSelector((state) => state.desktop.draggingIcon);
  const dragOffset = useSelector((state) => state.desktop.dragOffset);
  
  const dragging = draggingIcon === iconKey;
  const dragRef = useRef({ startX: 0, startY: 0 });

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(selectIcon(iconKey));
  };

  const handleBlur = () => {
    if (!dragging) {
      dispatch(clearSelection());
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Solo botón izquierdo
    e.preventDefault();
    dispatch(setDraggingIcon(iconKey));
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialGridX: gridX,
      initialGridY: gridY
    };
    dispatch(setDragOffset({ x: 0, y: 0 }));
    dispatch(selectIcon(iconKey));
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    dispatch(setDragOffset({ x: dx, y: dy }));
  };

  const handleMouseUp = (e) => {
    if (!dragging) return;
    dispatch(clearDrag());

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    // Calcular nueva posición en el grid
    const deltaGridX = Math.round(dx / GRID_SIZE);
    const deltaGridY = Math.round(dy / GRID_SIZE);

    let newGridX = Math.max(0, dragRef.current.initialGridX + deltaGridX);
    let newGridY = Math.max(0, dragRef.current.initialGridY + deltaGridY);

    // Verificar colisión con otros íconos
    const occupied = Object.entries(allPositions).find(
      ([key, pos]) => key !== iconKey && pos.x === newGridX && pos.y === newGridY
    );

    if (occupied) {
      // Revertir a posición original si hay colisión
      newGridX = dragRef.current.initialGridX;
      newGridY = dragRef.current.initialGridY;
    }

    dispatch(setIconPosition({ key: iconKey, x: newGridX, y: newGridY }));
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging]);

  const style = {
    position: 'absolute',
    left: `${gridX * GRID_SIZE}px`,
    top: `${gridY * GRID_SIZE}px`,
    transform: dragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : 'none',
    cursor: dragging ? 'grabbing' : 'grab',
    zIndex: dragging ? 1000 : selected ? 10 : 1,
    transition: dragging ? 'none' : 'transform 0.1s ease-out',
  };

  return (
    <div
      style={style}
      className="flex flex-col items-center w-[80px] select-none outline-none"
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onMouseDown={handleMouseDown}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <img 
        src={iconPath} 
        alt={label} 
        className="w-12 h-12 mb-1 pointer-events-none" 
        draggable={false}
      />
      <span
        className="text-center text-[13px] font-normal leading-tight break-words px-1 rounded-sm pointer-events-none"
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
