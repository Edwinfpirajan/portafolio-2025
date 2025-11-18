import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import projects from "./projectsData.js";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProject, setMobileDetail } from "../../redux/slices/projectsSlice";

function ProjectDetail({ project }) {
  const theme = useSelector((s) => s.ui.theme);
  if (!project) return null;
  return (
    <div className="w-full h-full p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        {project.icon ? (
          <img src={project.icon} alt="" className="w-12 h-12 object-contain flex-shrink-0" />
        ) : null}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-tight mb-1">{project.title}</h2>
          {project.subtitle ? (
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{project.subtitle}</div>
          ) : null}
        </div>
      </div>

      {/* Tags */}
      {Array.isArray(project.tags) && project.tags.length > 0 ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className={`px-3 py-1 text-xs font-medium rounded-full ${theme === 'dark' ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Description */}
      {project.description ? (
        <div className={`mb-6 text-sm leading-relaxed whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </div>
      ) : null}

      {/* Links */}
      {Array.isArray(project.links) && project.links.length > 0 ? (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Enlaces</h3>
          <div className="flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-blue-400 border border-gray-700' : 'bg-white hover:bg-gray-50 text-blue-600 border border-gray-300 shadow-sm'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                {l.label || 'Ver'}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectsApp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = useMemo(() => projects, []);
  const active = useSelector((s) => s.projectsState.activeId);
  const mobileDetail = useSelector((s) => s.projectsState.mobileDetail);
  const theme = useSelector((s) => s.ui.theme);
  const activeItem = items.find((i) => i.id === active);

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-full p-4">
        <h1 className="text-2xl font-bold mb-2">{t("projects.title", "Proyectos")}</h1>
        <p className="text-sm opacity-80">{t("projects.empty", "Sin proyectos aún")}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="hidden md:grid grid-cols-[260px_minmax(0,1fr)] h-full">
        <aside className={`border-r p-3 overflow-y-auto ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t("projects.title", "Proyectos")}</div>
          <nav className="flex flex-col gap-1">
            {items.map((i) => (
              <button
                key={i.id}
                onClick={() => dispatch(setActiveProject(i.id))}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded text-left transition ${
                  active === i.id 
                    ? theme === 'dark' ? 'bg-gray-700 font-medium' : 'bg-gray-200 font-medium'
                    : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                {i.icon ? (
                  <img src={i.icon} alt="" className="w-5 h-5 object-contain" />
                ) : null}
                <div className="truncate">
                  <div className="text-sm truncate">{i.title}</div>
                  {i.subtitle ? (
                    <div className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{i.subtitle}</div>
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
                    dispatch(setActiveProject(i.id));
                    dispatch(setMobileDetail(true));
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-100"
                >
                  {i.icon ? (
                    <img src={i.icon} alt="" className="w-6 h-6 object-contain" />
                  ) : null}
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium truncate">{i.title}</div>
                    {i.subtitle ? (
                      <div className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{i.subtitle}</div>
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
            <div className="sticky top-0 border-b border-gray-200 flex items-center gap-2 p-3" style={{ backgroundColor: 'inherit' }}>
              <button
                onClick={() => dispatch(setMobileDetail(false))}
                className={`px-2 py-1 rounded border text-sm ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              >
                {t("projects.back", "Atrás")}
              </button>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{activeItem?.title}</div>
            </div>
            <ProjectDetail project={activeItem} />
          </div>
        )}
      </div>
    </div>
  );
}
