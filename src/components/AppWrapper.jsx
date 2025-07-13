import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import DesktopContent from "./desktop/DesktopContent";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <DesktopContent />
    </Provider>
  );
}
