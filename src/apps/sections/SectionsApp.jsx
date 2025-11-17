// src/apps/sections/SectionsApp.jsx
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AboutApp from "../about/AboutApp.jsx";
import ProjectsApp from "../projects/ProjectsApp.jsx";

function ContactSection() {
  return (
    <div className="w-full h-full bg-white text-black p-4">
      <h2 className="text-xl font-semibold mb-2">Contacto</h2>
      <p className="opacity-80 mb-2">Escríbeme a: <a className="text-blue-600 underline" href="mailto:edwinfpirajan@gmail.com">edwinfpirajan@gmail.com</a></p>
      <p className="opacity-80">LinkedIn: <a className="text-blue-600 underline" href="https://www.linkedin.com/in/edwinfpirajan" target="_blank" rel="noreferrer">/in/edwinfpirajan</a></p>
    </div>
  );
}

export default function SectionsApp() {
  const { t } = useTranslation();
  const items = useMemo(() => ([
    { key: "about", label: t("sections.list.about", "About"), component: <AboutApp /> },
    { key: "projects", label: t("sections.list.projects", "Projects"), component: <ProjectsApp /> },
    { key: "contact", label: t("sections.list.contact", "Contact"), component: <ContactSection /> },
  ]), [t]);

  const [active, setActive] = useState(items[0].key);
  const activeItem = items.find(i => i.key === active) || items[0];

  return (
    <div className="w-full h-full bg-white text-black">
      {/* Desktop/tablet: left menu + content */}
      <div className="hidden md:grid grid-cols-[240px_minmax(0,1fr)] h-full">
        <aside className="border-r border-gray-200 bg-gray-50 p-3 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 mb-2">{t("sections.title", "Sections")}</div>
          <nav className="flex flex-col gap-1">
            {items.map(i => (
              <button
                key={i.key}
                onClick={() => setActive(i.key)}
                className={`text-left px-3 py-2 rounded hover:bg-gray-200 transition ${active === i.key ? "bg-gray-200 font-medium" : ""}`}
              >
                {i.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="overflow-auto h-full">
          {activeItem.component}
        </main>
      </div>

      {/* Mobile: list view -> detail view */}
      <div className="md:hidden h-full">
        <MobileSections items={items} active={active} setActive={setActive} />
        <div className="h-[calc(100%-56px)] overflow-auto">
          {activeItem.component}
        </div>
      </div>
    </div>
  );
}

function MobileSections({ items, active, setActive }) {
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 p-3">
        <span className="text-sm text-gray-500">{t("sections.title", "Sections")}:</span>
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {items.map(i => (
              <button
                key={i.key}
                onClick={() => setActive(i.key)}
                className={`px-3 py-1.5 rounded-full border text-sm whitespace-nowrap ${active === i.key ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"}`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
