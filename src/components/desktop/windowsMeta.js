// src/components/desktop/windowsMeta.js
import TerminalWindow from "./cmd/Cmd.jsx";
import About from "./content/About.jsx";
import Personalization from "./Personalization/Personalization.jsx";
import ProjectsApp from "../../apps/projects/ProjectsApp.jsx";

export const windowsMeta = {
  about: {
    titleKey: "windows.about.title",   
    icon: "/icons/about.png",
    component: About,
    showInStartMenu: true,
    initial: { maximized: true }
  },
  cmd: {
    titleKey: "windows.cmd.title",
    icon: "/icons/terminal.png",
    component: TerminalWindow,
    showInStartMenu: true,
    initial: { maximized: false, width: 900, height: 520 }
  },
  personalization: {
    titleKey: "windows.personalization.title",
    icon: "/icons/settings.png",
    component: Personalization,
    showInStartMenu: true,
    initial: { maximized: true }
  },
  projects: {
    titleKey: "windows.projects.title",
    icon: "/icons/generic.svg",
    component: ProjectsApp,
    showInStartMenu: true,
    initial: { maximized: true }
  },
};
