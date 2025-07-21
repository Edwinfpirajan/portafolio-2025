import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import DesktopContent from "./desktop/DesktopContent";
import AnimatedBackground from "./desktop/Personalization/AnimateBackground";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      {/* <AnimatedBackground /> */}
      <DesktopContent />
    </Provider>
  );
}
