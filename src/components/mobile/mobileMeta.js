import AboutApp from "../../apps/about/AboutApp.jsx";
import ProjectsApp from "../../apps/projects/ProjectsApp.jsx";
import SectionsApp from "../../apps/sections/SectionsApp.jsx";

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
	sections: {
    	 titleKey: "windows.sections.title",
    	 icon: "/icons/generic.svg",
    	 component: SectionsApp,
  	},
};
