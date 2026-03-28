# -------- base --------
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app


# -------- deps --------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


# -------- builder --------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm exec prisma generate
RUN pnpm exec prisma migrate deploy

RUN pnpm build


# -------- runner --------
FROM node:24-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

RUN corepack enable

# standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma


EXPOSE 3000

CMD ["node", "server.js"]