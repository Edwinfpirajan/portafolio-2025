import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  input: "",
};

const cmdSlice = createSlice({
  name: "cmd",
  initialState,
  reducers: {
    setHistory(state, { payload }) {
      state.history = Array.isArray(payload) ? payload : [];
    },
    appendHistory(state, { payload }) {
      if (Array.isArray(payload)) state.history.push(...payload);
      else if (payload != null) state.history.push(String(payload));
    },
    setInput(state, { payload }) {
      state.input = payload ?? "";
    },
    clearInput(state) {
      state.input = "";
    },
  },
});

export const { setHistory, appendHistory, setInput, clearInput } = cmdSlice.actions;
export default cmdSlice.reducer;
