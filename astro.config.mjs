import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";


export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server",
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4321,
  },
});
