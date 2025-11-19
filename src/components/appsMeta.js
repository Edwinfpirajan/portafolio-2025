// Configuración compartida de aplicaciones visibles en desktop y mobile
import AboutApp from "../apps/about/AboutApp.jsx";
import ProjectsApp from "../apps/projects/ProjectsApp.jsx";
import ChatApp from "../apps/chat/ChatApp.jsx";

export const sharedAppsMeta = {
  about: {
    titleKey: "windows.about.title",
    icon: "/icons/about.png",
    component: AboutApp,
    showInStartMenu: true,
    initial: { maximized: true }
  },
  projects: {
    titleKey: "windows.projects.title",
    icon: "/icons/projects.png",
    component: ProjectsApp,
    showInStartMenu: true,
    initial: { maximized: true }
  },
  chat: {
    titleKey: "windows.chat.title",
    icon: "/icons/kikeGPT.png",
    component: ChatApp,
    showInStartMenu: true,
    initial: { maximized: true }
  },
};
