import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setGlobalTheme,
  setFontFamily,
} from "../../../redux/slices/uiSlice";
import { setLanguage } from "../../../redux/slices/i18nSlice";

// Componente de celda estilo iOS
function SettingRow({ icon, label, value, onClick, showArrow = true }) {
  const ui = useSelector((state) => state.ui);
  
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 border-b transition-colors active:bg-gray-100 dark:active:bg-gray-800 ${
        ui.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <span className={`text-base ${
          ui.theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
        }`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span className={`text-sm ${
            ui.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>{value}</span>
        )}
        {showArrow && (
          <svg className={`w-5 h-5 ${
            ui.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </button>
  );
}

// Componente de grupo de configuración
function SettingGroup({ title, children }) {
  const ui = useSelector((state) => state.ui);
  
  return (
    <div className="mb-6">
      {title && (
        <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
          ui.theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
        }`}>
          {title}
        </div>
      )}
      <div className={`rounded-xl overflow-hidden ${
        ui.theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
      }`}>
        {children}
      </div>
    </div>
  );
}

function ThemeSection({ ui, dispatch }) {
  const { t } = useTranslation();
  
  return (
    <SettingGroup>
      <SettingRow
        icon="🌓"
        label={t('personalization.theme.label')}
        value={ui.theme === 'dark' ? t('personalization.theme.dark') : t('personalization.theme.light')}
        onClick={() => dispatch(setGlobalTheme(ui.theme === 'dark' ? 'light' : 'dark'))}
      />
    </SettingGroup>
  );
}

function LanguageSection({ lang, dispatch }) {
  const { t } = useTranslation();
  const currentLang = lang === 'es' ? 'Español' : 'English';
  
  return (
    <SettingGroup>
      <SettingRow
        icon="🌐"
        label={t('common.language') || 'Idioma'}
        value={currentLang}
        onClick={() => dispatch(setLanguage(lang === 'es' ? 'en' : 'es'))}
      />
    </SettingGroup>
  );
}

function FontsSection({ ui, dispatch }) {
  const { t } = useTranslation();
  const fontOptions = [
    { label: t('personalization.fonts.options.system'), value: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
    { label: t('personalization.fonts.options.inter'), value: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
    { label: t('personalization.fonts.options.roboto'), value: "Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif" },
    { label: t('personalization.fonts.options.segoeui'), value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
    { label: t('personalization.fonts.options.arial'), value: "Arial, Helvetica, sans-serif" },
  ];

  const currentFont = fontOptions.find(f => f.value === ui.fonts.system)?.label || fontOptions[0].label;
  
  return (
    <SettingGroup>
      {fontOptions.map((opt) => (
        <SettingRow
          key={opt.value}
          icon="🔤"
          label={opt.label}
          onClick={() => dispatch(setFontFamily({ type: "system", value: opt.value }))}
          showArrow={false}
          value={ui.fonts.system === opt.value ? "✓" : ""}
        />
      ))}
    </SettingGroup>
  );
}

export default function PersonalizationMobile() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ui = useSelector((state) => state.ui);
  const lang = useSelector((state) => state.i18n.lang);
  const [searchQuery, setSearchQuery] = useState("");

  const allSettings = useMemo(() => [
    { 
      id: 'theme', 
      component: <ThemeSection ui={ui} dispatch={dispatch} />,
      searchTerms: ['theme', 'tema', 'dark', 'oscuro', 'light', 'claro']
    },
    { 
      id: 'language', 
      component: <LanguageSection lang={lang} dispatch={dispatch} />,
      searchTerms: ['language', 'idioma', 'español', 'english', 'lang']
    },
    { 
      id: 'fonts', 
      component: <FontsSection ui={ui} dispatch={dispatch} />,
      searchTerms: ['font', 'fuente', 'typography', 'tipografía', 'texto', 'text']
    },
  ], [ui, lang, dispatch]);

  const filteredSettings = useMemo(() => {
    if (!searchQuery.trim()) return allSettings;
    const query = searchQuery.toLowerCase();
    return allSettings.filter(setting => 
      setting.searchTerms.some(term => term.toLowerCase().includes(query))
    );
  }, [searchQuery, allSettings]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Search bar */}
      <div className={`sticky top-0 z-10 px-4 py-3 border-b ${
        ui.theme === 'dark' ? 'bg-[#18181b] border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="relative">
          <svg 
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              ui.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search') || 'Buscar'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              ui.theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center ${
                ui.theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className={`flex-1 overflow-auto px-4 py-4 ${
        ui.theme === 'dark' ? 'bg-[#18181b]' : 'bg-gray-50'
      }`}>
        {filteredSettings.length > 0 ? (
          filteredSettings.map(setting => (
            <div key={setting.id}>
              {setting.component}
            </div>
          ))
        ) : (
          <div className={`text-center py-12 ${
            ui.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {t('common.noResults') || 'No se encontraron resultados'}
          </div>
        )}
      </div>
    </div>
  );
}
