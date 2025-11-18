import AboutApp from "../../apps/about/AboutApp.jsx";
import ProjectsApp from "../../apps/projects/ProjectsApp.jsx";
import ChatApp from "../../apps/chat/ChatApp.jsx";

export const mobileMeta = {
	about: {
		titleKey: "windows.about.title",
		icon: "/icons/about.png",
		component: AboutApp,
	},
	projects: {
		titleKey: "windows.projects.title",
		icon: "/icons/generic.svg",
		component: ProjectsApp,
	},
  chat: {
    titleKey: "windows.chat.title",
    icon: "/icons/generic.svg",
    component: ChatApp,
  },
};
