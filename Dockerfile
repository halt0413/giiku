FROM node:20-bullseye-slim AS builder
WORKDIR /build

RUN corepack enable && corepack prepare pnpm@8.10.0 --activate

COPY apps/backend/package*.json ./apps-backend-pkgs/
COPY apps/backend/pnpm-lock.yaml* ./apps-backend-pkgs/

WORKDIR /build/apps-backend-pkgs
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

RUN mkdir -p /build/node_modules && cp -r node_modules /build/node_modules || true

WORKDIR /build
COPY apps/backend ./apps/backend

FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /var/task

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps ./apps
COPY --from=builder /build/apps/backend/package.json ./package.json

RUN printf "const mod = require('./apps/backend/lambda-handler');\nexports.handler = mod.handler || (mod.default && mod.default.handler) || mod.default || mod;" > index.js

ENV NODE_ENV=production
