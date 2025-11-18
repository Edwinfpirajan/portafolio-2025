// src/apps/projects/projectsData.js
const projects = [
  {
    id: "portfolio-2025",
    title: "CRM Banco Agrario",
    subtitle: "Este mismo sitio, Astro + React + Tailwind",
    icon: "/icons/Banco-Agrario.webp",
    description:
      "Desarrollé un CRM institucional de alto rendimiento para el Banco Agrario de Colombia, orientado a optimizar la gestión de clientes, la trazabilidad de operaciones y la eficiencia operativa de sus agentes.\n\nEl sistema fue implementado con PHP (Laravel) y potenciado con Livewire, logrando una experiencia totalmente dinámica e interactiva sin sacrificar seguridad ni rendimiento. La plataforma utiliza MySQL como motor de base de datos, estructurada para manejar grandes volúmenes de información con consultas optimizadas y arquitectura escalable.\n\nUno de los componentes clave fue la integración con Genesys Cloud, permitiendo a los agentes gestionar interacciones en tiempo real (correos, casos, solicitudes), manejar tipificaciones, sincronizar estados, y responder comunicaciones directamente desde el CRM, todo bajo autenticación OAuth2 y consumo seguro de APIs.\n\nEl resultado:\n• Un CRM robusto, modular y rápido\n• Interfaz intuitiva para el equipo de atención\n• Procesos bancarios unificados en una sola plataforma\n• Integración completa con el ecosistema Genesys para mejorar tiempos de respuesta y calidad del servicio",
    tags: ["Php", "Laravel", "Livewire", "MySQL"],
    links: [
      { label: "Repo", href: "https://www.credibanco.com/wp-content/uploads/2022/01/Banco-Agrario.png" },
    ],
  },
  {
    id: "sample-app",
    title: "Aplicación de ejemplo",
    subtitle: "Proyecto de muestra para el listado",
    icon: "/icons/projects.png",
    description:
      "Proyecto placeholder. Reemplázalo con tus proyectos reales. Edita src/apps/projects/projectsData.js para añadir más.",
    tags: ["JS", "UI"],
    links: [],
  },
];

export default projects;
