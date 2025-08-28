# ===== Build =====
FROM node:20-bookworm-slim AS build
WORKDIR /app

# pnpm (corepack)
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Instala deps con lockfile
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copia el resto y construye
COPY . .
RUN pnpm run build

# (opcional) dejar solo deps de producción para el runtime
RUN pnpm prune --prod

# ===== Runtime =====
FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Artefactos de la etapa "build"
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
