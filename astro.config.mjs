import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";


export default defineConfig({
  integrations: [react(), tailwind()],
  output: "",
  server: {
    host: "",
    port: Number(process.env.PORT) || 4321,
  },
});
