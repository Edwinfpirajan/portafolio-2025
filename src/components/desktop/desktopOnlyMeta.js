// Aplicaciones exclusivas de desktop (cmd, personalization, etc.)
import TerminalWindow from "./desktop/cmd/Cmd.jsx";
import Personalization from "./desktop/Personalization/Personalization.jsx";

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
};
