// Aplicaciones exclusivas de mobile (si las hay en el futuro)
import PersonalizationMobile from "./apps/PersonalizationMobile.jsx";

export const mobileOnlyMeta = {
  personalization: {
    titleKey: "windows.personalization.title",
    icon: "/icons/settings.png",
    component: PersonalizationMobile,
    showInStartMenu: true,
  },
};
