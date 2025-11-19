// Aplicaciones exclusivas de desktop (cmd, personalization, etc.)
import TerminalWindow from "./cmd/Cmd.jsx";
import Personalization from "./Personalization/Personalization.jsx";
import GamesApp from "../../apps/games/GamesApp.jsx";

export const desktopOnlyMeta = {
  cmd: {
    titleKey: "windows.cmd.title",
    icon: "/icons/terminal.png",
    component: TerminalWindow,
    showInStartMenu: true,
    initial: { maximized: false, width: 900, height: 520 }
  },
  personalization: {
    titleKey: "windows.personalization.title",
    icon: "/icons/settings.png",
    component: Personalization,
    showInStartMenu: true,
    initial: { maximized: true }
  },
  games: {
    titleKey: "windows.games.title",
    icon: "/icons/games.png",
    component: GamesApp,
    showInStartMenu: true,
    initial: { maximized: true }
  },
};
