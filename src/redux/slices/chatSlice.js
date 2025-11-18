import { createSlice } from '@reduxjs/toolkit';

const makeId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const MODELS = [
  { id: "gpt-4o-mini", label: "GPT-4o mini" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4.1-mini", label: "GPT-4.1 mini" },
  { id: "gpt-4.1", label: "GPT-4.1" },
  { id: "o3-mini", label: "o3-mini (reasoning)" },
  { id: "o1-mini", label: "o1-mini (reasoning)" }
];

const initialState = {
  sessions: [
    { 
      id: makeId(), 
      title: '', 
      model: MODELS[0].id, 
      messages: [] 
    }
  ],
  activeId: null,
  input: '',
  loading: false,
  copiedIndex: null,
  pendingDeleteId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initializeSessions: (state, action) => {
      if (action.payload && Array.isArray(action.payload) && action.payload.length > 0) {
        state.sessions = action.payload;
        state.activeId = action.payload[0].id;
      } else {
        state.activeId = state.sessions[0].id;
      }
    },
    setActiveSession: (state, action) => {
      state.activeId = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCopiedIndex: (state, action) => {
      state.copiedIndex = action.payload;
    },
    setPendingDelete: (state, action) => {
      state.pendingDeleteId = action.payload; // id or null
    },
    createSession: (state, action) => {
      const newSession = {
        id: makeId(),
        title: action.payload?.title ?? '',
        model: MODELS[0].id,
        messages: []
      };
      state.sessions.unshift(newSession);
      state.activeId = newSession.id;
      state.input = '';
    },
    updateSession: (state, action) => {
      const { id, patch } = action.payload;
      const session = state.sessions.find(s => s.id === id);
      if (session) {
        Object.assign(session, patch);
      }
    },
    deleteSession: (state, action) => {
      const id = action.payload;
      if (state.sessions.length === 1) {
        // Reinicia la sesión
        const session = state.sessions.find(s => s.id === id);
        if (session) {
          session.messages = [];
          session.title = '';
          session.model = MODELS[0].id;
        }
        state.pendingDeleteId = null;
      } else {
        state.sessions = state.sessions.filter(s => s.id !== id);
        if (state.activeId === id) {
          state.activeId = state.sessions[0]?.id || null;
        }
        state.pendingDeleteId = null;
      }
    },
    addMessage: (state, action) => {
      const { sessionId, message } = action.payload;
      const session = state.sessions.find(s => s.id === sessionId);
      if (session) {
        session.messages.push(message);
      }
    },
    clearInput: (state) => {
      state.input = '';
    },
  },
});

export const {
  initializeSessions,
  setActiveSession,
  setInput,
  setLoading,
  setCopiedIndex,
  createSession,
  updateSession,
  deleteSession,
  addMessage,
  clearInput,
} = chatSlice.actions;

export default chatSlice.reducer;
