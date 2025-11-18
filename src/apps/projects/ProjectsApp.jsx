import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import projects from "./projectsData.js";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProject, setMobileDetail } from "../../redux/slices/projectsSlice";

function ProjectDetail({ project }) {
  const theme = useSelector((s) => s.ui.theme);
  if (!project) return null;
  return (
    <div className="w-full h-full p-4">
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
        <p className="mb-4 text-sm leading-relaxed whitespace-pre-wrap">{project.description}</p>
      ) : null}
      {Array.isArray(project.tags) && project.tags.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
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
