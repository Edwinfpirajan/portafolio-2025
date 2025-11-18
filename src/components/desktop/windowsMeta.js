// src/components/desktop/windowsMeta.js
// Combina apps compartidas + específicas de desktop
import { sharedAppsMeta } from "../appsMeta.js";
import { desktopOnlyMeta } from "./desktopOnlyMeta.js";

export const windowsMeta = {
  ...sharedAppsMeta,
  ...desktopOnlyMeta,
};
