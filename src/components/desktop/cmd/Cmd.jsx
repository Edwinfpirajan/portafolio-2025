import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function TerminalWindow() {
  const { t, i18n } = useTranslation("terminal"); 
  const terminalRef = useRef(null);

  const PROMPT_PATH = "C:\\User\\Dev";         
  const VERSION = "10.0.19045.4046";           

  // Banner traducido
  const makeBanner = () => ([
    t("banner.line1", { version: VERSION }),
    t("banner.line2"),
    ""
  ]);

  const [history, setHistory] = useState(makeBanner());
  const [input, setInput] = useState("");

  useEffect(() => {
    setHistory(prev => {
      return makeBanner();
    });
  }, [i18n.language]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setHistory(prev => ([
        ...prev,
        `${PROMPT_PATH}> ${input}`,
        t("unknownCommand"),
      ]));
      setInput("");
    }      

  };

  return (
    <div
      ref={terminalRef}
      className="w-full h-full bg-black text-green-500 font-mono text-sm p-2 overflow-auto"
      onClick={() => document.getElementById("terminalInput")?.focus()}
      style={{ whiteSpace: "pre-wrap", lineHeight: "1.2rem" }}
    >
      {/* Historial */}
      {history.map((line, index) => (
        <div key={index}>{line}</div>
      ))}

      {/* Línea de comandos */}
      <div className="flex">
        <span>{t("prompt", { path: PROMPT_PATH })}</span>
        <input
          id="terminalInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-green-500 outline-none flex-grow font-mono"
          autoFocus
        />
      </div>
    </div>
  );
}
