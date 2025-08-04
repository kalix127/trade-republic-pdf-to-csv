FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy package files for dependency resolution
COPY package.json pnpm-lock.yaml* ./

# Production dependencies stage
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build dependencies and build stage
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Development stage
FROM base AS development
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
COPY . .
ENV NODE_ENV=development
EXPOSE 3000
EXPOSE 24678
CMD ["pnpm", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production

# Copy production dependencies
COPY --from=prod-deps /app/node_modules /app/node_modules

# Copy built application
COPY --from=build /app/.output /app/.output
COPY --from=build /app/package.json /app/package.json

# Create non-root user for security  
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nuxt

# Change ownership of the app directory
RUN chown -R nuxt:nodejs /app
USER nuxt

EXPOSE 3001

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3001



CMD ["node", ".output/server/index.mjs"]