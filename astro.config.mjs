import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [react(), tailwind()],
  output: "",
  adapter: node({ mode: "" }),
  server: {
    host: "",
    port: Number(process.env.PORT) || 4321
  }
});
