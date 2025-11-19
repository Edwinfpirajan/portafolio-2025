// src/apps/about/AboutApp.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function AboutApp() {
  const { t } = useTranslation(); 
  const theme = useSelector((s) => s.ui.theme); 

  const data = {
    fullName: "Edwin Fernando Pirajan Arevalo",
    birthDate: "16 de julio de 1998",
    birthPlace: "Bogotá, Colombia (Hospital Kennedy)",
    height: "1.76 cm",
    nationality: "Colombiana",
    religion: "Cristianismo",
    university: "Universidad Distrital Francisco José de Caldas",
    parents: ["Yeimi Alejandra Arévalo", "Edwin Hernán Pirajan Moreno"],
    role: "Desarrollador de Software",
    areas: "FullStack Developer",
    langs: "Go, PHP (Laravel), JS/TS",
    english: "B1 English (Intermediate)",
    frameworks: "NodeJS, AstroJS, React, Next, Vue3, Angular",
    dbs: "PostgreSQL, MongoDB, Oracle",
    infra: "Docker, Linux",
  };

  return (
    <div className={`w-full h-full overflow-auto font-serif p-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
      {/* Logo Wikipedia */}
      <div className="flex justify-start mb-4">
        <img
          src="/icons/wiki.png"
          alt={t("about.alt.wikiLogo")}
          className="h-12 w-auto"
        />
      </div>

      <div className="flex flex-col lg:flex-row-reverse max-w-6xl mx-auto">
        {/* Sidebar a la derecha */}
        <aside className="lg:w-1/3 w-full mb-6 lg:mb-0 lg:ml-6">
          <div className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className={`text-center py-2 font-bold ${theme === 'dark' ? 'bg-yellow-700 text-white' : 'bg-yellow-200'}`}>
              {data.fullName}
            </div>

            <img
              src="/images/yo.jpg"
              alt={t("about.alt.photoOf", { name: data.fullName })}
              className="w-full object-cover"
            />

            {/* Información personal */}
            <div className={`border-t p-3 ${theme === 'dark' ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-900'}`}>
              <h3 className={`font-bold text-sm px-2 py-1 mb-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                {t("about.sidebar.personal.title")}
              </h3>

              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.birthName")}:</strong>{" "}
                {data.fullName}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.birth")}:</strong>{" "}
                {data.birthDate}
                <br />
                {data.birthPlace}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.height")}:</strong>{" "}
                {data.height}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.nationality")}:</strong>{" "}
                {data.nationality}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.religion")}:</strong>{" "}
                {data.religion}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.education")}:</strong>
                <br />
                {data.university}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.personal.parents")}:</strong>
                <br />
                {data.parents[0]}
                <br />
                {data.parents[1]}
              </p>
            </div>

            {/* Información profesional */}
            <div className={`border-t p-3 ${theme === 'dark' ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-900'}`}>
              <h3 className={`font-bold text-sm px-2 py-1 mb-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                {t("about.sidebar.professional.title")}
              </h3>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.professional.occupation")}:</strong>
                <br />
                {data.role}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.professional.areas")}:</strong>
                <br />
                {data.areas}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.professional.languages")}:</strong>
                <br />
                {data.langs}
              </p>
              <p className="text-sm mb-1">
                <strong>English:</strong>
                <br />
                {data.english}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.professional.frameworks")}:</strong>
                <br />
                {data.frameworks}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.professional.databases")}:</strong>
                <br />
                {data.dbs}
              </p>
              <p className="text-sm mb-1">
                <strong>{t("about.sidebar.professional.infrastructure")}:</strong>
                <br />
                {data.infra}
              </p>
            </div>

            {/* Firma */}
            <div className={`border-t p-3 text-center ${theme === 'dark' ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-900'}`}>
              <h3 className={`font-bold text-sm px-2 py-1 mb-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                {t("about.sidebar.signature.title")}
              </h3>
              <img
                src="/images/firma.jpg"
                alt={t("about.alt.signatureOf", { name: "Edwin" })}
                className="mx-auto h-16 object-contain"
              />
            </div>
          </div>
        </aside>

        {/* Contenido principal actualizado */}
        <main className={`lg:w-2/3 w-full ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
          <h1 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Edwin Fernando Pirajan Arévalo
          </h1>
          <p className="mb-4 text-base">
            Edwin Fernando Pirajan Arévalo (Bogotá, 16 de julio de 1998) es un desarrollador de software colombiano especializado en desarrollo fullstack y arquitecturas modernas. Su trayectoria combina experiencia en backend, frontend, automatización, ciberseguridad, desarrollo de CRM y herramientas con Inteligencia Artificial. Ha participado en procesos formativos relevantes como el programa MincTIC 2022, y actualmente se destaca por construir soluciones escalables para empresas y entidades de alto impacto.
          </p>

          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>🧩 Inicios</h2>
          <p className="mb-3 text-base">
            Edwin inició su vida profesional en el ámbito creativo. En 2017 comenzó estudios como diseñador multimedial, los cuales finalizó en mayo de 2018. Trabajó como diseñador gráfico hasta el año 2021, etapa en la que descubrió su interés por el desarrollo web a través de JavaScript. Este acercamiento marcó el inicio de su transición hacia el mundo del software, integrando su visión creativa con habilidades de programación.
          </p>

          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>💻 Transición y consolidación como desarrollador</h2>
          <p className="mb-3 text-base">
            En agosto de 2022 ingresó como desarrollador a la empresa Cascoloco, donde trabajó en integraciones de ecommerce y conexiones con sistemas financieros como Sistecrédito. Esta experiencia reforzó su habilidad para trabajar con APIs, optimizar procesos y resolver problemas reales del entorno digital.
          </p>
          <p className="mb-3 text-base">
            En mayo de 2023 se vinculó a Smart Training como desarrollador fullstack, rol que desempeñó hasta febrero de 2024. Allí fortaleció su dominio de React, Go, PostgreSQL, Oracle Cloud y arquitectura cloud, desarrollando soluciones internas como módulos de control de asistencias para colaboradores.
          </p>
          <p className="mb-3 text-base">
            Actualmente es ingeniero desarrollador en Almacontact, donde ha participado en la construcción de CRM corporativos, integraciones con Genesys Cloud, automatización de procesos internos y desarrollo de sistemas avanzados de ciberseguridad.
          </p>

          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>🚀 Proyectos destacados (Portafolio real)</h2>
          <ul className="mb-4 list-disc pl-6">
            <li className="mb-2"><b>ScrapeBlocker – Sistema de Protección y Monitoreo Empresarial:</b> Solución de ciberseguridad que combina Go, WebSockets, Chrome DevTools Protocol y una extensión de navegador. Protege a empresas mediante bloqueo dinámico de URLs, detección de patrones web y control centralizado de procesos.</li>
            <li className="mb-2"><b>CRM Mail – Banco Agrario:</b> Sistema de gestión de correo corporativo construido con Laravel y Livewire. Optimiza la clasificación, tipificación y respuesta de correos internos con trazabilidad total.</li>
            <li className="mb-2"><b>CRM Institucional – Banco Agrario:</b> Plataforma robusta de gestión de clientes e interacciones, integrada con Genesys Cloud (OAuth2, APIs de mensajes, estados y agentes). Mejora los tiempos de respuesta y unifica la gestión comercial y operativa.</li>
            <li className="mb-2"><b>Módulo de Asistencias – Academia de Idiomas SMART:</b> Sistema para control de entrada, salida, reportes, horarios y métricas del personal. Arquitectura con React + Go + PostgreSQL + Oracle Cloud.</li>
            <li className="mb-2"><b>Sistema de Votaciones Electrónicas – Gobierno de México:</b> Plataforma digital con validación de identidad vía API oficial, cifrado de extremo a extremo, panel de auditoría y escalabilidad para jornadas nacionales.</li>
            <li className="mb-2"><b>DR1 Distrifábrica — Asistencias + Fanpage:</b> Control de asistencias y fanpage profesional con SEO para mejorar la presencia digital empresarial.</li>
            <li className="mb-2"><b>Integración Sistecrédito + Soporte Ecommerce — Cascoloco:</b> Implementación de financiación online, optimización de checkout, mejoras de UX y soporte técnico continuo.</li>
            <li className="mb-2"><b>Instalador Automático FortiClient — AlmaExperience:</b> Despliegue masivo automatizado de VPN corporativa en Windows, con configuración silenciosa y estándares IT.</li>
          </ul>

          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>🎯 Áreas de especialización</h2>
          <ul className="mb-4 list-disc pl-6">
            <li>Desarrollo fullstack (Go, PHP, Node.js, React, Next.js)</li>
            <li>Arquitectura backend y APIs de alto rendimiento</li>
            <li>Integraciones empresariales (Genesys Cloud, Sistecrédito, APIs gubernamentales)</li>
            <li>Ciberseguridad aplicada (extensiones, WebSockets, monitoreo)</li>
            <li>Automatización de procesos y sistemas corporativos</li>
            <li>Bases de datos SQL y NoSQL</li>
            <li>Despliegues cloud (Oracle, AWS, Railway, Docker)</li>
          </ul>

          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>🧭 Enfoque profesional</h2>
          <p className="mb-3 text-base">
            Edwin combina pensamiento crítico, diseño intuitivo y arquitectura escalable para crear soluciones que realmente impactan a los equipos y usuarios finales. Su objetivo es seguir construyendo plataformas modernas, seguras y de alto rendimiento para empresas en Colombia, Latinoamérica y el mundo.
          </p>
        </main>
      </div>
    </div>
  );
}
