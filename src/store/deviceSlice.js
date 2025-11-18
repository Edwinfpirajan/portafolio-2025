import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setIsMobile(state, { payload }) {
      state.isMobile = !!payload;
    },
  },
});

export const { setIsMobile } = deviceSlice.actions;
export default deviceSlice.reducer;
