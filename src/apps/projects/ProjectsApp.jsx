// src/apps/projects/ProjectsApp.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProjectsApp() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full bg-white text-black p-4">
      <h1 className="text-2xl font-bold mb-2">{t("projects.title", "Proyectos")}</h1>
      <p className="text-sm opacity-80 mb-4">
        {t("projects.subtitle", "Aquí verás una lista de proyectos. (placeholder)")}
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Proyecto demo 1</li>
        <li>Proyecto demo 2</li>
        <li>Proyecto demo 3</li>
      </ul>
    </div>
  );
}
