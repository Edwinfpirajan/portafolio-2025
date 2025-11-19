// Aplicaciones exclusivas de mobile (si las hay en el futuro)
import PersonalizationMobile from "./apps/PersonalizationMobile.jsx";
import GamesMobile from "./apps/GamesMobile.jsx";

export const mobileOnlyMeta = {
  personalization: {
    titleKey: "windows.personalization.title",
    icon: "/icons/settings.png",
    component: PersonalizationMobile,
    showInStartMenu: true,
  },
  games: {
    titleKey: "windows.games.title",
    icon: "/icons/games.png",
    component: GamesMobile,
    showInStartMenu: true,
  },
};
