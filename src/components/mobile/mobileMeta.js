import AboutApp from "../../apps/about/AboutApp.jsx";
import ProjectsApp from "../../apps/projects/ProjectsApp.jsx";

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
};
