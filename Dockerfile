# MoetnaVSS Dockerfile for Coolify Deployment
# =============================================
# Multi-stage build for a production-ready MoetnaVSS image
#
# Build: docker build -t moetnavss .
# Run:   docker run -p 9000:9000 --env-file .env moetnavss

# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

# Install system deps needed by some native modules
RUN apk add --no-cache python3 make g++

RUN corepack enable && corepack prepare yarn@3.2.1 --activate

WORKDIR /app

# Copy Yarn config + lockfile first for layer caching
COPY .yarnrc.yml yarn.lock package.json turbo.json ./
COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarn/patches .yarn/patches

# Copy all workspace package.json files (for dependency resolution)
COPY packages packages
COPY integration-tests/package.json integration-tests/package.json

# Copy project-root config files needed by the build & runtime
COPY medusa-config.ts medusa-config.js tsconfig.json ./
COPY src src

# Install all dependencies (including devDeps needed for build)
RUN yarn install --immutable 2>/dev/null || yarn install

# Build all packages (turbo run build)
RUN yarn build

# Build the production admin + backend (yarn medusa build)
# Needs a DATABASE_URL to load config, but won't actually connect during build
RUN DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder \
    JWT_SECRET=build-placeholder \
    COOKIE_SECRET=build-placeholder \
    yarn medusa build || true

# ---- Stage 2: Production ----
FROM node:20-alpine AS production

RUN corepack enable && corepack prepare yarn@3.2.1 --activate

WORKDIR /app

# Copy entire built workspace from builder
COPY --from=builder /app /app

# Slim down: remove test files, source maps, integration tests
RUN find /app/packages -name "__tests__" -type d -exec rm -rf {} + 2>/dev/null; \
    find /app/packages \( -name "*.spec.ts" -o -name "*.test.ts" -o -name "*.spec.js" -o -name "*.test.js" \) -delete 2>/dev/null; \
    rm -rf /app/integration-tests /app/www /app/thoughts /app/scripts 2>/dev/null; \
    true

# Expose the Medusa server port
EXPOSE 9000

# Health check — generous start period for DB migrations + module init
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9000/health || exit 1

# Default environment variables (override via Coolify env vars)
ENV NODE_ENV=production
ENV PORT=9000

# Start: run DB migrations then start the server
CMD ["sh", "-c", "yarn medusa db:migrate && yarn medusa start"]
