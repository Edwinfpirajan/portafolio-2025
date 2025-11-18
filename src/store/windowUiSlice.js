import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewport: { w: 0, h: 0 },
  runtime: {}, // by window name: { animState, animateBounds, isOpening }
};

const windowUiSlice = createSlice({
  name: "windowUi",
  initialState,
  reducers: {
    setViewport(state, { payload }) {
      state.viewport = { w: payload?.w || 0, h: payload?.h || 0 };
    },
    initRuntime(state, { payload: name }) {
      if (!state.runtime[name]) {
        state.runtime[name] = { animState: "idle", animateBounds: false, isOpening: true };
      }
    },
    setAnimState(state, { payload }) {
      const { name, value } = payload;
      if (!state.runtime[name]) state.runtime[name] = { animState: "idle", animateBounds: false, isOpening: false };
      state.runtime[name].animState = value;
    },
    setAnimateBounds(state, { payload }) {
      const { name, value } = payload;
      if (!state.runtime[name]) state.runtime[name] = { animState: "idle", animateBounds: false, isOpening: false };
      state.runtime[name].animateBounds = !!value;
    },
    setIsOpening(state, { payload }) {
      const { name, value } = payload;
      if (!state.runtime[name]) state.runtime[name] = { animState: "idle", animateBounds: false, isOpening: false };
      state.runtime[name].isOpening = !!value;
    },
    clearRuntime(state, { payload: name }) {
      if (state.runtime[name]) delete state.runtime[name];
    },
  },
});

export const { setViewport, initRuntime, setAnimState, setAnimateBounds, setIsOpening, clearRuntime } = windowUiSlice.actions;
export default windowUiSlice.reducer;
