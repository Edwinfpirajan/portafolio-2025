FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# opcional: HOST si quieres
ENV HOST=0.0.0.0

EXPOSE 3000  # opcional, solo documental
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "./dist/server/entry.mjs"]
