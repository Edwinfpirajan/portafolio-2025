import About from "./content/About.jsx";
// import Contact from "../Content/Contact";
// import Projects from "../Content/Projects";
import Personalization from "./Personalization/Personalization";

export const windowsMeta = {
  about: {
    title: "Sobre mí",
    icon: "/icons/about.png",
    component: About
  },
//   contact: {
//     title: "Contacto",
//     icon: "/icons/contact.png",
//     component: Contact
//   },
//   projects: {
//     title: "Proyectos",
//     icon: "/icons/projects.png",
//     component: Projects
//   },
  personalization: {
    title: "Personalización",
    icon: "/icons/start_btn.png",
    component: Personalization
  }
};
