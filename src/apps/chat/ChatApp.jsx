import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// Model list (mantiene los existentes)
const MODELS = [
  { id: "gpt-4o-mini", label: "GPT-4o mini" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4.1-mini", label: "GPT-4.1 mini" },
  { id: "gpt-4.1", label: "GPT-4.1" },
  { id: "o3-mini", label: "o3-mini (reasoning)" },
  { id: "o1-mini", label: "o1-mini (reasoning)" }
];

// Util simple para ids
const makeId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function ChatApp() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.ui.theme);

  // Sessions estilo ChatGPT/Gemini (lista a la izquierda)
  const [sessions, setSessions] = useState([
    { id: makeId(), title: t('chat.session.initial', 'Nueva conversación'), model: MODELS[0].id, messages: [] }
  ]);
  const [activeId, setActiveId] = useState(sessions[0].id);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const listRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeId);
  const messages = activeSession?.messages ?? [];
  const model = activeSession?.model ?? MODELS[0].id;

  const updateSession = (id, patch) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
  };

  const createSession = () => {
    const newSession = { id: makeId(), title: t('chat.session.untitled', 'Conversación sin título'), model: MODELS[0].id, messages: [] };
    setSessions(prev => [newSession, ...prev]);
    setActiveId(newSession.id);
    setInput("");
  };

  const renameSession = (id, title) => updateSession(id, { title });

  const send = async () => {
    const text = input.trim();
    if (!text || loading || !activeSession) return;

    const userMessage = { role: 'user', content: text };
    updateSession(activeId, { messages: [...messages, userMessage] });
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage], model })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const reply = data.reply || "";
      updateSession(activeId, { messages: [...messages, userMessage, { role: 'assistant', content: reply }] });
    } catch (e) {
      updateSession(activeId, { messages: [...messages, userMessage, { role: 'assistant', content: t('chat.errors.generic', 'Error inesperado.') }] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const copyMessage = async (i) => {
    try {
      await navigator.clipboard.writeText(messages[i].content);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {}
  };

  const deleteSession = (id) => {
    if (sessions.length === 1) {
      // Reinicia
      updateSession(id, { messages: [] });
      return;
    }
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeId === id) setActiveId(sessions.filter(s => s.id !== id)[0]?.id || null);
  };

  const containerBg = theme === 'dark'
    ? 'bg-[#0B151E]'
    : 'bg-gradient-to-br from-[#f4f7fb] via-white to-[#eef3ff]';

  const bubbleUser = theme === 'dark'
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
    : 'bg-blue-600 text-white shadow-sm';
  const bubbleAssistant = theme === 'dark'
    ? 'bg-white/5 backdrop-blur border border-white/10 text-white'
    : 'bg-white border border-black/10 text-gray-800 shadow-sm';

  const sidebarBg = theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/70 border-black/10';
  const inputArea = theme === 'dark' ? 'bg-black/30 border-white/15 text-white' : 'bg-white border-black/20';

  return (
    <div className={`w-full h-full flex ${containerBg} font-sans`}>
      {/* Sidebar */}
      <div className={`hidden md:flex flex-col w-60 border-r ${sidebarBg} backdrop-blur-sm`}>
        <div className="p-3 flex gap-2">
          <button onClick={createSession} className={`flex-1 px-3 py-2 rounded text-xs font-medium transition ${theme==='dark' ? 'bg-teal-500/30 hover:bg-teal-500/50 text-teal-100' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>{t('chat.new','Nuevo chat')}</button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          {sessions.map(s => (
            <div key={s.id} className={`group relative rounded-md px-3 py-2 text-sm cursor-pointer flex items-center gap-2 ${s.id===activeId ? (theme==='dark' ? 'bg-white/10' : 'bg-blue-50') : ''}`} onClick={() => setActiveId(s.id)}>
              <input
                className={`flex-1 bg-transparent focus:outline-none text-xs ${theme==='dark' ? 'text-white' : 'text-gray-700'}`}
                value={s.title}
                onChange={(e) => renameSession(s.id, e.target.value)}
              />
              <button onClick={(e) => { e.stopPropagation(); deleteSession(s.id); }} className={`opacity-0 group-hover:opacity-100 transition text-[10px] px-2 py-1 rounded ${theme==='dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-700'}`}>×</button>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-white/10 flex flex-col gap-2 text-[11px] opacity-70">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">{t('chat.model','Modelo')}:</label>
            <select
              value={model}
              onChange={(e) => updateSession(activeId, { model: e.target.value })}
              className={`flex-1 px-2 py-1 rounded border text-xs ${theme==='dark' ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-black/20'}`}
            >
              {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header (mobile only) */}
        <div className={`md:hidden flex items-center justify-between px-3 py-2 text-xs ${theme==='dark' ? 'bg-black/30 border-b border-white/10' : 'bg-white/70 border-b border-black/10 backdrop-blur'} `}>
          <button onClick={createSession} className={`${theme==='dark' ? 'text-teal-300' : 'text-blue-600'} font-medium`}>{t('chat.new','Nuevo')}</button>
          <select
            value={model}
            onChange={(e) => updateSession(activeId, { model: e.target.value })}
            className={`px-2 py-1 rounded border ${theme==='dark' ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-black/20'}`}
          >
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </div>

        {/* Messages */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
          {messages.length === 0 && (
            <div className={`max-w-xl text-sm opacity-70 ${theme==='dark' ? 'text-teal-100' : 'text-gray-600'}`}>
              <h2 className="text-lg mb-2 font-semibold">{t('chat.welcome.title','Bienvenido')}</h2>
              <p className="mb-4">{t('chat.welcome.subtitle','Escribe tu primera pregunta o elige una sugerencia:')}</p>
              <div className="grid gap-2 md:grid-cols-2">
                {['Explica este código','Resume este texto','Genera ideas creativas','Ayuda con JavaScript'].map(x => (
                  <button key={x} onClick={() => setInput(x)} className={`text-left text-xs px-3 py-2 rounded border transition ${theme==='dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-black/10 hover:bg-black/5 text-gray-700'}`}>{x}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => {
            const isUser = m.role === 'user';
            return (
              <div key={i} className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-semibold select-none ${isUser ? (theme==='dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') : (theme==='dark' ? 'bg-teal-500/30 text-teal-200' : 'bg-teal-100 text-teal-700')}`}>{isUser ? 'Tú' : 'AI'}</div>
                <div className="group relative max-w-3xl w-fit">
                  <div className={`whitespace-pre-wrap text-sm leading-relaxed px-4 py-3 rounded-2xl ${isUser ? bubbleUser : bubbleAssistant}`}>{m.content}</div>
                  <div className={`absolute -top-2 ${isUser ? 'left-0' : 'right-0'} flex gap-2 opacity-0 group-hover:opacity-100 transition`}>                    
                    <button onClick={() => copyMessage(i)} className={`px-2 py-1 rounded text-[10px] ${theme==='dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-700'}`}>{copiedIndex === i ? t('chat.copied','Copiado!') : t('chat.copy','Copiar')}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-4 md:px-8 pb-5">
          <div className={`rounded-2xl border p-3 flex flex-col gap-3 shadow-sm ${inputArea}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('chat.placeholder','Escribe un mensaje...')}
              className={`w-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed ${theme==='dark' ? 'placeholder-white/40 text-white' : 'placeholder-gray-500 text-gray-800'}`}
              rows={1}
              onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="opacity-60">{t('chat.model','Modelo')}:</span>
                <select
                  value={model}
                  onChange={(e) => updateSession(activeId, { model: e.target.value })}
                  className={`px-2 py-1 rounded border text-xs ${theme==='dark' ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-black/20'}`}
                >
                  {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              <button
                disabled={loading || !input.trim()}
                onClick={send}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition ${loading || !input.trim() ? 'opacity-40 cursor-not-allowed' : ''} ${theme==='dark' ? 'bg-teal-500/60 hover:bg-teal-500/80 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {loading ? t('chat.sending','Enviando...') : t('chat.send','Enviar')}
              </button>
            </div>
          </div>
          <p className={`mt-2 text-[10px] opacity-50 ${theme==='dark' ? 'text-white' : 'text-gray-600'}`}>{t('chat.disclaimer','Puede cometer errores. No compartas información sensible.')}</p>
        </div>
      </div>
    </div>
  );
}
