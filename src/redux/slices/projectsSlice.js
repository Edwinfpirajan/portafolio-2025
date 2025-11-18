import { createSlice } from "@reduxjs/toolkit";
import projects from "../../apps/projects/projectsData.js";

const initialState = {
  activeId: projects?.[0]?.id || null,
  mobileDetail: false,
};

const projectsSlice = createSlice({
  name: "projectsState",
  initialState,
  reducers: {
    setActiveProject(state, { payload }) {
      state.activeId = payload;
    },
    setMobileDetail(state, { payload }) {
      state.mobileDetail = !!payload;
    },
  },
});

export const { setActiveProject, setMobileDetail } = projectsSlice.actions;
export default projectsSlice.reducer;
