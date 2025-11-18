import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setHistory, appendHistory, setInput, clearInput } from "../../../store/cmdSlice";

export default function TerminalWindow() {
  const { t, i18n } = useTranslation("terminal"); 
  const terminalRef = useRef(null);
  const dispatch = useDispatch();

  const PROMPT_PATH = "C:\\User\\Dev";         
  const VERSION = "10.0.19045.4046";           

  // Banner traducido
  const makeBanner = () => ([
    t("banner.line1", { version: VERSION }),
    t("banner.line2"),
    ""
  ]);

  const history = useSelector((s) => s.cmd.history);
  const input = useSelector((s) => s.cmd.input);

  useEffect(() => {
    dispatch(setHistory(makeBanner()));
  }, [i18n.language, dispatch]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      dispatch(appendHistory([`${PROMPT_PATH}> ${input}`, t("unknownCommand")]));
      dispatch(clearInput());
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
          onChange={(e) => dispatch(setInput(e.target.value))}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-green-500 outline-none flex-grow font-mono"
          autoFocus
        />
      </div>
    </div>
  );
}
