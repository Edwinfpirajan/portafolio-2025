// src/components/desktop/windowsMeta.js
import TerminalWindow from "./cmd/Cmd.jsx";
import About from "./content/About.jsx";
import Personalization from "./Personalization/Personalization.jsx";

export const windowsMeta = {
  about: {
    titleKey: "windows.about.title",   
    icon: "/icons/about.png",
    component: About,
    showInStartMenu: true,
  },
  cmd: {
    titleKey: "windows.cmd.title",
    icon: "/icons/terminal.png",
    component: TerminalWindow,
    showInStartMenu: true,
  },
  personalization: {
    titleKey: "windows.personalization.title",
    icon: "/icons/settings.png",
    component: Personalization,
    showInStartMenu: true,
  },
};
