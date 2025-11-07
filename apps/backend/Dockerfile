# ビルドステージ
FROM node:20-bullseye-slim AS builder
WORKDIR /build

RUN corepack enable && corepack prepare pnpm@8.10.0 --activate

# 依存関係をまとめてコピー
COPY apps/backend/package*.json ./apps-backend-pkgs/
COPY apps/backend/pnpm-lock.yaml* ./apps-backend-pkgs/

WORKDIR /build/apps-backend-pkgs
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# node_modules をまとめてコピー
RUN mkdir -p /build/node_modules && cp -r node_modules /build/node_modules || true

WORKDIR /build
COPY apps/backend ./apps/backend

# Lambda 実行用ステージ
FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /var/task

# ビルド済みファイルをコピー
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps ./apps
COPY --from=builder /build/apps/backend/package.json ./package.json

# Lambda handler を CMD で直接指定
CMD ["apps/backend/lambda-handler.handler"]

ENV NODE_ENV=production
