// src/components/mobile/apps/Recents.jsx

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, switchTo } from "../../../redux/slices/mobileSlice";
import { mobileMeta } from "../mobileMeta";
import { useTranslation } from "react-i18next";

function AppCard({ name, theme }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const meta = mobileMeta[name];
  const label = meta
    ? (meta.titleKey ? t(meta.titleKey) : (meta.title || name))
    : name;
  const icon = meta?.icon || "/icons/app.png";
  const Component = meta?.component;
  
  // Swipe up to close logic
  const startY = useRef(null);
  const deltaY = useRef(0);
  const cardRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      startY.current = e.touches[0].clientY;
      deltaY.current = 0;
    }
  };
  
  const handleTouchMove = (e) => {
    if (startY.current !== null) {
      deltaY.current = e.touches[0].clientY - startY.current;
      if (cardRef.current) {
        cardRef.current.style.transform = `translateY(${Math.max(0, deltaY.current)}px)`;
        cardRef.current.style.transition = 'none';
      }
    }
  };
  
  const handleTouchEnd = () => {
    // Swipe up (hacia arriba) para cerrar
    if (deltaY.current < -60) {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.3s, opacity 0.3s';
        cardRef.current.style.transform = 'translateY(-120%)';
        cardRef.current.style.opacity = '0';
      }
      setTimeout(() => {
        dispatch(closeApp(name));
        if (cardRef.current) {
          cardRef.current.style.transition = '';
          cardRef.current.style.transform = '';
          cardRef.current.style.opacity = '';
        }
      }, 280);
    } else {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.2s';
        cardRef.current.style.transform = 'translateY(0)';
      }
    }
    startY.current = null;
    deltaY.current = 0;
  };

  return (
    <div className="relative flex-shrink-0 w-[85vw] max-w-[380px] mx-4 snap-center flex flex-col items-center justify-center h-full" style={{ minWidth: '300px' }}>
      {/* Título con icono encima de la tarjeta estilo iPhone */}
      <div className="flex items-center gap-2 mb-4 px-4 relative z-10" style={{minHeight: '32px'}}>
        <img src={icon} alt={label} className="w-6 h-6 rounded-lg shadow-md" />
        <span className="text-white text-sm font-semibold drop-shadow-lg bg-black/50 px-2 py-0.5 rounded-md max-w-[220px] overflow-ellipsis whitespace-nowrap overflow-hidden block">
          {label || '—'}
        </span>
      </div>
      
      {/* Tarjeta de la app */}
      <div
        ref={cardRef}
        className="relative w-full shadow-2xl"
        style={{ 
          height: 'min(calc(100vh - 200px), 75vh)',
          maxHeight: 'calc(100vh - 200px)', 
          touchAction: 'pan-x',
          borderRadius: '28px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Preview de la app escalada y no interactiva */}
        <div
          onClick={() => dispatch(switchTo(name))}
          className={`w-full h-full cursor-pointer ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}
          style={{
            pointerEvents: 'auto',
            transform: 'scale(0.92)',
            transformOrigin: 'center center',
          }}
        >
          {Component && (
            <div className="w-full h-full pointer-events-none" style={{ overflow: 'hidden' }}>
              <Component />
            </div>
          )}
        </div>
        
        {/* Overlay semitransparente para indicar que es preview */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.08) 100%)'
          }}
        />
      </div>
    </div>
  );
}

export default function Recents() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const stack = useSelector((s) => s.mobile.stack);

  const theme = useSelector((s) => s.ui.theme);

  // Log temporal para depuración
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('STACK (Recents):', JSON.stringify(stack));
  }

  if (!stack.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/70">
        {t('mobile.noAppsRecent')}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full overflow-x-auto overflow-y-hidden flex flex-row snap-x snap-mandatory items-center scrollbar-hide"
      style={{ 
        WebkitOverflowScrolling: 'touch', 
        height: '100%', 
        maxHeight: '100%',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {stack.slice().reverse().map(({ name }, idx) => (
        <AppCard key={name + '-' + idx} name={name} theme={theme} />
      ))}
    </div>
  );
}
