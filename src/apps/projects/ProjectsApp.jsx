import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import projects from "./projectsData.js";

function ProjectDetail({ project }) {
  if (!project) return null;
  return (
    <div className="w-full h-full bg-white text-black p-4">
      <div className="flex items-start gap-3 mb-3">
        {project.icon ? (
          <img src={project.icon} alt="" className="w-8 h-8 object-contain" />
        ) : null}
        <div>
          <h2 className="text-xl font-semibold leading-tight">{project.title}</h2>
          {project.subtitle ? (
            <div className="text-sm text-gray-600">{project.subtitle}</div>
          ) : null}
        </div>
      </div>
      {project.description ? (
        <p className="mb-4 text-sm leading-relaxed">{project.description}</p>
      ) : null}
      {Array.isArray(project.tags) && project.tags.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="px-2 py-1 text-xs rounded bg-gray-200">
              {t}
            </span>
          ))}
        </div>
      ) : null}
      {Array.isArray(project.links) && project.links.length > 0 ? (
        <div className="space-x-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm text-blue-600 underline"
            >
              {l.label || l.href}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectsApp() {
  const { t } = useTranslation();
  const items = useMemo(() => projects, []);
  const [active, setActive] = useState(items[0]?.id);
  const [mobileDetail, setMobileDetail] = useState(false);
  const activeItem = items.find((i) => i.id === active);

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-full bg-white text-black p-4">
        <h1 className="text-2xl font-bold mb-2">{t("projects.title", "Proyectos")}</h1>
        <p className="text-sm opacity-80">{t("projects.empty", "Sin proyectos aún")}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white text-black">
      <div className="hidden md:grid grid-cols-[260px_minmax(0,1fr)] h-full">
        <aside className="border-r border-gray-200 bg-gray-50 p-3 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 mb-2">{t("projects.title", "Proyectos")}</div>
          <nav className="flex flex-col gap-1">
            {items.map((i) => (
              <button
                key={i.id}
                onClick={() => setActive(i.id)}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded text-left hover:bg-gray-200 transition ${
                  active === i.id ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {i.icon ? (
                  <img src={i.icon} alt="" className="w-5 h-5 object-contain" />
                ) : null}
                <div className="truncate">
                  <div className="text-sm truncate">{i.title}</div>
                  {i.subtitle ? (
                    <div className="text-xs text-gray-600 truncate">{i.subtitle}</div>
                  ) : null}
                </div>
              </button>
            ))}
          </nav>
        </aside>
        <main className="overflow-auto h-full">
          <ProjectDetail project={activeItem} />
        </main>
      </div>

      <div className="md:hidden h-full">
        {!mobileDetail ? (
          <div className="h-full overflow-auto">
            <div className="p-4 pb-2">
              <h1 className="text-xl font-bold">{t("projects.title", "Proyectos")}</h1>
              <p className="text-sm opacity-80">
                {t("projects.subtitle", "Aquí verás una lista de proyectos. (placeholder)")}
              </p>
            </div>
            <div className="divide-y">
              {items.map((i) => (
                <button
                  key={i.id}
                  onClick={() => {
                    setActive(i.id);
                    setMobileDetail(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-100"
                >
                  {i.icon ? (
                    <img src={i.icon} alt="" className="w-6 h-6 object-contain" />
                  ) : null}
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium truncate">{i.title}</div>
                    {i.subtitle ? (
                      <div className="text-xs text-gray-600 truncate">{i.subtitle}</div>
                    ) : null}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center gap-2 p-3">
              <button
                onClick={() => setMobileDetail(false)}
                className="px-2 py-1 rounded border border-gray-300 text-sm"
              >
                {t("projects.back", "Atrás")}
              </button>
              <div className="text-sm text-gray-500">{activeItem?.title}</div>
            </div>
            <ProjectDetail project={activeItem} />
          </div>
        )}
      </div>
    </div>
  );
}
