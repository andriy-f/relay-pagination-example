FROM node:24-trixie-slim as base

USER root

# Additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y upgrade \
	&& apt-get -y install --no-install-recommends curl \
	&& rm -rf /var/lib/apt/lists/*

RUN npm uninstall -g pnpm \
	&& npm install -g corepack@latest

USER node

ARG PNPM_INSTALL_DIR=/home/node/.local/bin
RUN mkdir -p $PNPM_INSTALL_DIR

RUN corepack enable --install-directory $PNPM_INSTALL_DIR pnpm \
	&& corepack install -g pnpm@11.5.0+sha512.dbfcc4f81cf48597afd4bc391ffdf12c11f1a9fb83a395bfa6b0a2d9cc2fd8ffebafdb1ccbd529632153f793904c2615b7f09fe1a345473fd1c35845172a8eb1

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# ===========
# Development
# ===========
FROM base AS development

# Fetch packages
COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml ./
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch;
RUN pnpm fetch;

# Install packages
COPY --chown=node:node package.json ./
RUN corepack install
RUN pnpm install --offline --frozen-lockfile;

# Copy source code
COPY --chown=node:node eslint.config.ts relay.config.json schema.graphql tsconfig*.json vite.config.ts react-router.config.ts ./
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./src ./src

# Dev runtime config
USER node
EXPOSE 8080
ENV PORT=8080
ENV HOST=0.0.0.0
CMD ["pnpm", "run", "dev"]

# Build
# =====
FROM development AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store NODE_ENV=production pnpm run build
RUN NODE_ENV=production pnpm run build

# Version
# RUN jq .version package.json -r > ./public/version.txt

# ===========
# Prod image
# ===========
FROM nginx:alpine AS production

# Prepare app dir
WORKDIR /usr/share/nginx/html

# Copy runtime data
# COPY docker-entrypoint /docker-entrypoint
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist ./
# RUN mv ./index.html ./index.html.template

EXPOSE 8080
# Runtime config
# ENTRYPOINT ["/docker-entrypoint"]
CMD ["nginx", "-g", "daemon off;"]
