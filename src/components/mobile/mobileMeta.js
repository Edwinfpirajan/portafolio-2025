// Combina apps compartidas + específicas de mobile
import { sharedAppsMeta } from "../appsMeta.js";
import { mobileOnlyMeta } from "./mobileOnlyMeta.js";

export const mobileMeta = {
  ...sharedAppsMeta,
  ...mobileOnlyMeta,
};
