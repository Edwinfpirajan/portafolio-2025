# ===== Build =====
FROM node:20-bookworm-slim AS build
WORKDIR /app
ENV NODE_ENV=development
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ===== Runtime =====
FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0
# No fijes PORT aquí; que lo ponga Railway
EXPOSE 3000

# Solo lo necesario para run
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
# Con adapter node "standalone" normalmente NO hace falta node_modules,
# pero si tu build los requiere, descomenta la línea siguiente:
# COPY --from=build /app/node_modules ./node_modules

CMD ["node", "./dist/server/entry.mjs"]
