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

FROM base AS development

COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch

COPY --chown=node:node package.json ./
RUN corepack install
RUN pnpm install --offline --frozen-lockfile
COPY --chown=node:node tsconfig.json nodemon.json eslint.config.js ./

ENV NODE_ENV=development
ENV GRAPHILE_ENV=development
ENV PORT=8080

CMD ["pnpm", "run", "dev"]

FROM development AS build
COPY --chown=node:node src ./src
RUN pnpm run build

FROM base AS prod-deps
ENV NODE_ENV=production
COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch

COPY --chown=node:node package.json ./
RUN corepack install
RUN pnpm install --offline --frozen-lockfile --prod

FROM base AS production

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN corepack install
COPY --chown=node:node --from=prod-deps /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/build ./build

ENV NODE_ENV=production
ENV GRAPHILE_ENV=production
ENV PORT=8080

CMD ["node", "./build/index.js"]
