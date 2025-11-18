import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MODELS = [
  { id: "gpt-4o-mini", label: "GPT-4o mini" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4.1-mini", label: "GPT-4.1 mini" },
  { id: "gpt-4.1", label: "GPT-4.1" },
  { id: "o3-mini", label: "o3-mini (reasoning)" },
  { id: "o1-mini", label: "o1-mini (reasoning)" },
];

export default function ChatApp() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.ui.theme);
  const [model, setModel] = useState(MODELS[0].id);
  const [messages, setMessages] = useState([]); // {role, content}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const listRef = useRef(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, model }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.errors.generic", "Oops! Something went wrong.") }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        listRef.current?.scrollTo?.({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 0);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCopiedId(null);
  };

  const copyMessage = async (index) => {
    try {
      await navigator.clipboard.writeText(messages[index].content);
      setCopiedId(index);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  };

  const containerBg = theme === 'dark'
    ? 'bg-gradient-to-br from-[#031B30] via-[#0D1F2E] to-[#141E30]'
    : 'bg-gradient-to-br from-[#f5f8ff] via-white to-[#eef3ff]';

  const assistantCard = theme === 'dark'
    ? 'bg-white/5 border border-white/10 backdrop-blur-sm'
    : 'bg-white border border-black/10 shadow-sm';
  const userCard = theme === 'dark'
    ? 'bg-blue-600 text-white'
    : 'bg-blue-600 text-white';

  const headerStyles = theme === 'dark'
    ? 'border-white/10'
    : 'border-black/10';
  const footerStyles = headerStyles;

  return (
    <div className={`w-full h-full flex flex-col ${containerBg} relative`} style={{ fontFamily: 'inherit' }}>
      <div className={`flex items-center gap-3 px-4 py-3 border-b ${headerStyles} backdrop-blur-sm bg-black/20 text-sm`}>        
        <div className="flex items-center gap-2 flex-1">
          <label className="opacity-80">{t('chat.model', 'Model')}:</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`px-2 py-1 rounded border text-sm ${theme==='dark' ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-black/20'}`}
          >
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className={`px-3 py-1.5 rounded text-xs font-medium transition ${theme==='dark' ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
          >
            {t('chat.clear','Clear')}
          </button>
        )}
      </div>

      <div ref={listRef} className="flex-1 overflow-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className={`max-w-xl text-sm leading-relaxed opacity-70 ${theme==='dark' ? 'text-white' : 'text-gray-600'}`}>            
            {t('chat.empty','Start the conversation by typing below...')}
          </div>
        ) : (
          messages.map((m,i) => {
            const isUser = m.role === 'user';
            return (
              <div key={i} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${theme==='dark' ? 'bg-teal-400/20 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>AI</div>
                )}
                <div className={`group relative max-w-3xl ${isUser ? 'ml-auto' : ''}`}>
                  <div className={`whitespace-pre-wrap rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${isUser ? userCard : assistantCard}`}>{m.content}</div>
                  <div className={`absolute -top-2 ${isUser ? 'right-0' : 'left-0'} flex gap-2 opacity-0 group-hover:opacity-100 transition`}>                    
                    <button
                      onClick={() => copyMessage(i)}
                      className={`px-2 py-1 rounded text-[10px] ${theme==='dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-gray-700 hover:bg-black/10'}`}
                    >
                      {copiedId === i ? t('chat.copied','Copied!') : t('chat.copy','Copy')}
                    </button>
                  </div>
                </div>
                {isUser && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${theme==='dark' ? 'bg-blue-500/30 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>You</div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className={`px-4 py-4 border-t ${footerStyles} backdrop-blur-sm bg-black/20 flex items-end gap-3`}>
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('chat.placeholder','Write a message...')}
            className={`w-full rounded-xl border px-4 py-3 text-sm min-h-[56px] max-h-52 resize-y focus:outline-none focus:ring-2 ${theme==='dark' ? 'bg-black/30 border-white/20 text-white focus:ring-teal-400/40' : 'bg-white border-black/20 focus:ring-blue-400/40'}`}
          />
        </div>
        <button
          onClick={send}
          disabled={loading}
          className={`h-[56px] px-6 rounded-xl text-sm font-medium shadow transition ${loading ? 'opacity-60' : ''} ${theme==='dark' ? 'bg-teal-500/60 hover:bg-teal-500/80 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? t('chat.sending','Sending...') : t('chat.send','Send')}
        </button>
      </div>
    </div>
  );
}
