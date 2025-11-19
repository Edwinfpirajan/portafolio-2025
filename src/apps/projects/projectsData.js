// Project portfolio data. Each object represents a real-world project delivered for a client.

const projects = [
  {
    id: "asistencias-smart",
    title: "Módulo de Asistencias para Colaboradores – Academia de Idiomas SMART",
    subtitle: "Sistema de control de asistencias para personal institucional",
    icon: "/icons/smart.png",
    description:
      "Desarrollé un módulo completo de control de asistencias para colaboradores de la Academia de Idiomas SMART, orientado a optimizar la gestión del personal, automatizar registros y mejorar la trazabilidad de horarios y jornadas laborales.\n\nEl sistema fue construido con una arquitectura moderna, segura y escalable:\n• Frontend en React: interfaz fluida y responsiva, diseñada para que coordinadores y administradores gestionen asistencias de manera rápida y visual.\n• Backend en Go (Golang): APIs de alto rendimiento para procesamiento eficiente de registros de entrada, salida, ausencias y novedades de personal.\n• Base de datos PostgreSQL: almacenamiento confiable con modelos diseñados para auditoría, reportes y análisis histórico.\n• Despliegue en Oracle Cloud: infraestructura robusta con entornos productivos altamente disponibles y escalables.\n\nFunciones destacadas del módulo:\n• Registro de entrada y salida en tiempo real para todos los colaboradores.\n• Control de horarios, turnos, jornadas especiales y permisos.\n• Alertas y validaciones para retardos, ausencias y anomalías.\n• Panel administrativo para visualizar métricas por sede, colaborador o rango de fechas.\n• Reportes automáticos descargables en distintos formatos.\n• Historial completo para auditoría interna y cumplimiento laboral.\n• Integración con otros sistemas internos como nómina y recursos humanos.\n\nEste módulo permitió profesionalizar la gestión interna de la institución, mejorar la puntualidad, reducir inconsistencias en el registro y centralizar toda la información en una plataforma moderna y confiable.",
    tags: ["NextJS", "NestJS", "PostgreSQL", "Oracle Cloud", "Attendance System"],
    links: [],
  },
  {
    id: "votaciones-mexico",
    title: "Sistema de Votaciones Electrónicas – Gobierno de México",
    subtitle: "Plataforma segura de votación ciudadana con validación de identidad",
    icon: "/icons/prd.png",
    description:
      "Desarrollamos un sistema de votaciones electrónicas para el Gobierno de México, enfocado en garantizar procesos democráticos transparentes, seguros y accesibles para todos los ciudadanos.\n\nLa plataforma permite a los ciudadanos emitir su voto de manera digital, asegurando la integridad y autenticidad de cada sufragio mediante la integración con una API oficial de validación de identidad ciudadana.\n\nCaracterísticas principales:\n• Validación de identidad en tiempo real a través de API gubernamental, asegurando que solo ciudadanos habilitados puedan votar.\n• Interfaz web responsiva y accesible, optimizada para dispositivos móviles y de escritorio.\n• Cifrado de extremo a extremo para la transmisión y almacenamiento de votos.\n• Panel administrativo para monitoreo en tiempo real de la participación y resultados.\n• Auditoría completa de cada proceso, con registros inmutables y trazabilidad para garantizar la transparencia.\n• Escalabilidad para soportar jornadas electorales nacionales y locales.\n\nEste sistema contribuyó a modernizar los procesos electorales, facilitando la participación ciudadana y fortaleciendo la confianza en la democracia digital.",
    tags: ["NextJS", "NestJS", "DravenDB", "AWS", "API", "Identity Verification", "Voting System", "Cybersecurity"],
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
    links: [],
  },
  {
    id: "dr1-distrifabrica",
    title: "Módulo de Asistencias y Fanpage – Distrifabrica Ramirez SAS (DR1 Equipment)",
    subtitle: "Gestión de asistencias y presencia digital para DR1 Equipment",
    icon: "/icons/distri.png",
    description:
      "Desarrollamos para Distrifabrica Ramirez SAS un módulo de control de asistencias para su personal, optimizando la gestión de horarios, registros y reportes internos. Además, creamos la fanpage oficial de DR1 Equipment para fortalecer su presencia digital y comunicación con clientes.\n\nCaracterísticas principales:\n• Registro y control de asistencias para empleados.\n• Panel administrativo para visualización de métricas y reportes.\n• Integración con sistemas internos de la empresa.\n• Fanpage profesional para DR1 Equipment, con diseño moderno y optimizado para SEO.\n• Gestión de productos, noticias y contacto directo con clientes desde la fanpage.\n\nEste proyecto permitió a DR1 mejorar la eficiencia operativa y potenciar su imagen de marca en el sector industrial.",
    tags: ["NextJS", "NestJS", "PostgreSQL", "Attendance System", "Fanpage", "SEO"],
    links: [],
  },
  {
    id: "cascoloco-sistecredito",
    title: "Integración Sistecrédito y Soporte Ecommerce – Cascoloco",
    subtitle: "Integración financiera y soporte web para Cascoloco.com",
    icon: "/icons/cascoloco.png",
    description:
      "Implementamos la integración con Sistecrédito en la tienda online de Cascoloco, permitiendo a los clientes acceder a financiación directa desde el checkout. Además, brindamos soporte y mejoras continuas a la plataforma ecommerce, optimizando la experiencia de usuario y la gestión de productos.\n\nCaracterísticas principales:\n• Integración completa con la API de Sistecrédito para aprobación y simulación de créditos en tiempo real.\n• Mejoras en el flujo de compra y checkout.\n• Soporte técnico y evolutivo para la web de Cascoloco.\n• Optimización de catálogo, carga de productos y velocidad del sitio.\n• Asesoría en estrategias digitales y automatización de procesos ecommerce.\n\nEste proyecto facilitó el acceso a financiación para los clientes y potenció el crecimiento digital de Cascoloco.",
    tags: ["NextJS", "Node.js", "Ecommerce", "API", "Sistecrédito", "Fintech", "Soporte Web"],
    links: [],
  },
  {
    id: "almaexperience-forticlient",
    title: "Instalador Automático de FortiClient – AlmaExperience",
    subtitle: "Despliegue masivo y automatizado de VPN corporativa",
    icon: "/icons/forticlient.png",
    description:
      "Desarrollamos un instalador automático para toda la empresa AlmaExperience, facilitando el despliegue masivo y sin intervención manual del software FortiClient en los equipos de los colaboradores.\n\nCaracterísticas principales:\n• Instalación silenciosa y personalizada de FortiClient en Windows.\n• Configuración automática de perfiles VPN y políticas de seguridad.\n• Integración con scripts de inventario y monitoreo.\n• Manual de uso y soporte remoto para IT.\n\nEste proyecto permitió reducir tiempos de onboarding, asegurar la conectividad segura y estandarizar la infraestructura de acceso remoto en la organización.",
    tags: ["Windows", "Instalador", "Automatización", "VPN", "FortiClient", "IT"],
    links: [],
  },
];

export default projects;
