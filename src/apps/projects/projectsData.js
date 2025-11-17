// src/apps/projects/projectsData.js
const projects = [
  {
    id: "portfolio-2025",
    title: "Portafolio 2025",
    subtitle: "Este mismo sitio, Astro + React + Tailwind",
    icon: "/icons/generic.svg",
    description:
      "Un portafolio que simula Windows en desktop y Android en mobile, con ventanas, barra de tareas, animaciones y estado persistente.",
    tags: ["Astro", "React", "Tailwind", "Redux"],
    links: [
      { label: "Repo", href: "https://github.com/Edwinfpirajan/portafolio-2025" },
    ],
  },
  {
    id: "sample-app",
    title: "Aplicación de ejemplo",
    subtitle: "Proyecto de muestra para el listado",
    icon: "/icons/generic.svg",
    description:
      "Proyecto placeholder. Reemplázalo con tus proyectos reales. Edita src/apps/projects/projectsData.js para añadir más.",
    tags: ["JS", "UI"],
    links: [],
  },
];

export default projects;
