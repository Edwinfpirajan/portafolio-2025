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

        {/* Contenido principal */}
        <main className={`lg:w-2/3 w-full ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
          <h1 className={`text-3xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data.fullName}
          </h1>

          <p className="mb-4 text-base">
            <strong>{data.fullName}</strong>{" "}
            {t("about.summary", {
              city: "Bogotá",
              birth: "16 de julio de 1998",
            })}
          </p>

          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t("about.bio.title")}</h2>

          <h3 className={`font-semibold mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{t("about.bio.starts.title")}</h3>
          <p className="mb-3 text-base">{t("about.bio.starts.body")}</p>

          <h3 className={`font-semibold mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            {t("about.bio.devCareer.title")}
          </h3>
          <p className="mb-3 text-base">{t("about.bio.devCareer.body")}</p>
        </main>
      </div>
    </div>
  );
}
