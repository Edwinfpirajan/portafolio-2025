import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: "",
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setTime(state, { payload }) {
      state.time = payload || "";
    },
  },
});

export const { setTime } = systemSlice.actions;
export default systemSlice.reducer;
