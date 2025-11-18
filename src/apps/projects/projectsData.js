// src/apps/projects/projectsData.js
const projects = [
  {
    id: "crm-mail-banco-agrario",
    title: "CRM Mail – Banco Agrario de Colombia",
    subtitle: "Sistema de gestión de correo corporativo",
    icon: "/icons/Banco-Agrario.webp",
    description:
      "Desarrollé un CRM especializado en gestión de correo corporativo para el Banco Agrario de Colombia, diseñado para centralizar, organizar y agilizar la atención de solicitudes enviadas por correo electrónico.\n\nEl sistema fue implementado con Laravel (PHP) y Livewire, logrando una interfaz dinámica, rápida y altamente interactiva sin depender de recargas de página. La arquitectura está optimizada para garantizar estabilidad, seguridad y facilidad de mantenimiento, cumpliendo los estándares requeridos para infraestructura bancaria.\n\nEntre sus principales funcionalidades se destacan:\n• Bandeja inteligente: lectura, filtrado y clasificación automática de correos entrantes.\n• Tipificación avanzada: categorización por tipo de caso, área responsable y nivel de prioridad.\n• Panel de gestión para agentes: visualización, asignación y respuesta directa de correos desde el CRM.\n• Historial y trazabilidad completa: seguimiento detallado por agente, caso y estado.\n• Flujos de trabajo optimizados para reducir tiempos de respuesta y mejorar la experiencia del usuario interno.\n\nEl resultado es una plataforma que transforma la gestión de correo en procesos estructurados, mejorando la productividad del equipo y proporcionando una visión clara y centralizada de todas las solicitudes recibidas por email.",
    tags: ["PHP", "Laravel", "Livewire", "MySQL", "Email Management"],
    links: [],
  },
  {
    id: "portfolio-2025",
    title: "CRM Banco Agrario",
    subtitle: "CRM Institucional para el Banco Agrario de Colombia",
    icon: "/icons/Banco-Agrario.webp",
    description:
      "Desarrollé un CRM institucional de alto rendimiento para el Banco Agrario de Colombia, orientado a optimizar la gestión de clientes, la trazabilidad de operaciones y la eficiencia operativa de sus agentes.\n\nEl sistema fue implementado con PHP (Laravel) y potenciado con Livewire, logrando una experiencia totalmente dinámica e interactiva sin sacrificar seguridad ni rendimiento. La plataforma utiliza MySQL como motor de base de datos, estructurada para manejar grandes volúmenes de información con consultas optimizadas y arquitectura escalable.\n\nUno de los componentes clave fue la integración con Genesys Cloud, permitiendo a los agentes gestionar interacciones en tiempo real (correos, casos, solicitudes), manejar tipificaciones, sincronizar estados, y responder comunicaciones directamente desde el CRM, todo bajo autenticación OAuth2 y consumo seguro de APIs.\n\nEl resultado:\n• Un CRM robusto, modular y rápido\n• Interfaz intuitiva para el equipo de atención\n• Procesos bancarios unificados en una sola plataforma\n• Integración completa con el ecosistema Genesys para mejorar tiempos de respuesta y calidad del servicio",
    tags: ["Php", "Laravel", "Livewire", "MySQL"],
    links: [
      { label: "Repo", href: "https://www.credibanco.com/wp-content/uploads/2022/01/Banco-Agrario.png" },
    ],
  },
];

export default projects;
