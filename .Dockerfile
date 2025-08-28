# ===== Build =====
FROM node:20-bookworm-slim AS build
WORKDIR /app

# Usa pnpm de corepack con versión fija
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Instala deps con lockfile (necesario para build)
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copia el resto y construye
COPY . .
# Si quieres más logs: astro build --verbose
RUN pnpm run build

# ===== Runtime =====
FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Habilita pnpm (opcional si no vas a instalar nada en runtime)
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copiamos artefactos de build y deps ya resueltas
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Railway inyecta PORT; Astro escucha en 0.0.0.0 vía tu astro.config
ENV PORT=3000
EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
