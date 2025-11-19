// src/apps/projects/projectsData.js
const projects = [
  {
    id: "asistencias-smart",
    title: "Módulo de Asistencias para Colaboradores – Academia de Idiomas SMART",
    subtitle: "Sistema de control de asistencias para personal institucional",
    icon: "/icons/smart.png",
    description:
      "Desarrollé un módulo completo de control de asistencias para colaboradores de la Academia de Idiomas SMART, orientado a optimizar la gestión del personal, automatizar registros y mejorar la trazabilidad de horarios y jornadas laborales.\n\nEl sistema fue construido con una arquitectura moderna, segura y escalable:\n• Frontend en React: interfaz fluida y responsiva, diseñada para que coordinadores y administradores gestionen asistencias de manera rápida y visual.\n• Backend en Go (Golang): APIs de alto rendimiento para procesamiento eficiente de registros de entrada, salida, ausencias y novedades de personal.\n• Base de datos PostgreSQL: almacenamiento confiable con modelos diseñados para auditoría, reportes y análisis histórico.\n• Despliegue en Oracle Cloud: infraestructura robusta con entornos productivos altamente disponibles y escalables.\n\nFunciones destacadas del módulo:\n• Registro de entrada y salida en tiempo real para todos los colaboradores.\n• Control de horarios, turnos, jornadas especiales y permisos.\n• Alertas y validaciones para retardos, ausencias y anomalías.\n• Panel administrativo para visualizar métricas por sede, colaborador o rango de fechas.\n• Reportes automáticos descargables en distintos formatos.\n• Historial completo para auditoría interna y cumplimiento laboral.\n• Integración con otros sistemas internos como nómina y recursos humanos.\n\nEste módulo permitió profesionalizar la gestión interna de la institución, mejorar la puntualidad, reducir inconsistencias en el registro y centralizar toda la información en una plataforma moderna y confiable.",
    tags: ["React", "Go", "PostgreSQL", "Oracle Cloud", "Attendance System"],
    links: [],
  },
  {
    id: "scrapeblocker",
    title: "ScrapeBlocker – Sistema Inteligente de Protección y Monitoreo Web",
    subtitle: "Solución antifraude y de ciberseguridad empresarial",
    icon: "/icons/scrape.png",
    description:
      "ScrapeBlocker es una solución antifraude y de ciberseguridad diseñada para empresas que necesitan proteger información sensible, monitorear procesos en tiempo real y bloquear accesos no autorizados provenientes de navegadores o aplicaciones.\n\nDesarrollado con una arquitectura moderna que integra Go (Golang), WebSockets, Chrome DevTools Protocol, y una extensión de navegador con reglas de protección inteligentes, ScrapeBlocker analiza el comportamiento del usuario, detecta patrones sospechosos y aplica políticas de bloqueo o desbloqueo de forma instantánea.\n\nEntre sus principales capacidades:\n• Monitoreo en tiempo real de procesos, páginas abiertas y actividad del usuario.\n• Bloqueo dinámico de URLs mediante reglas declarativas (declarativeNetRequest) y comunicación WebSocket.\n• Detección de selectores y contenido web para validar acceso o cerrar rutas críticas.\n• Control centralizado desde un backend en Go, con políticas administrables por cliente.\n• Extensión de Chrome personalizada que ejecuta bloqueo local y sincroniza estados.\n• Módulo de actualización automática del agente en Windows.\n• Integración con APIs corporativas para obtener procesos, URLs y configuraciones en tiempo real.\n\nScrapeBlocker se diseñó como una plataforma escalable, robusta y multiplataforma, capaz de integrarse fácilmente en entornos empresariales y call centers, permitiendo a las organizaciones blindar su operación y evitar fugas, capturas o manipulación de datos.\n\nEl resultado es un sistema que combina seguridad, automatización y velocidad, protegiendo activamente la infraestructura digital de cada cliente.",
    tags: ["Go", "WebSockets", "Chrome Extension", "DevTools Protocol", "Cybersecurity"],
    links: [],
  },
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
    id: "CRM-banco-agrario",
    title: "CRM Banco Agrario",
    subtitle: "CRM Institucional para el Banco Agrario de Colombia",
    icon: "/icons/Banco-Agrario.webp",
    description:
      "Desarrollé un CRM institucional de alto rendimiento para el Banco Agrario de Colombia, orientado a optimizar la gestión de clientes, la trazabilidad de operaciones y la eficiencia operativa de sus agentes.\n\nEl sistema fue implementado con PHP (Laravel) y potenciado con Livewire, logrando una experiencia totalmente dinámica e interactiva sin sacrificar seguridad ni rendimiento. La plataforma utiliza MySQL como motor de base de datos, estructurada para manejar grandes volúmenes de información con consultas optimizadas y arquitectura escalable.\n\nUno de los componentes clave fue la integración con Genesys Cloud, permitiendo a los agentes gestionar interacciones en tiempo real (correos, casos, solicitudes), manejar tipificaciones, sincronizar estados, y responder comunicaciones directamente desde el CRM, todo bajo autenticación OAuth2 y consumo seguro de APIs.\n\nEl resultado:\n• Un CRM robusto, modular y rápido\n• Interfaz intuitiva para el equipo de atención\n• Procesos bancarios unificados en una sola plataforma\n• Integración completa con el ecosistema Genesys para mejorar tiempos de respuesta y calidad del servicio",
    tags: ["Php", "Laravel", "Livewire", "MySQL"],
    links: [
      // { label: "Repo", href: "https://www.credibanco.com/wp-content/uploads/2022/01/Banco-Agrario.png" },
    ],
  },
];

export default projects;
