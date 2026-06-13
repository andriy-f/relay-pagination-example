FROM mcr.microsoft.com/devcontainers/javascript-node:24-trixie

USER root

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends caddy postgresql-client-common \
    && /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y \
    && apt-get -y install --no-install-recommends postgresql-client-18

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"

RUN npm uninstall -g pnpm \
	&& npm install -g corepack@latest

USER node

ARG PNPM_INSTALL_DIR=/home/node/.local/bin
RUN mkdir -p $PNPM_INSTALL_DIR

RUN corepack enable --install-directory $PNPM_INSTALL_DIR pnpm \
	&& corepack install -g pnpm@11.5.0+sha512.dbfcc4f81cf48597afd4bc391ffdf12c11f1a9fb83a395bfa6b0a2d9cc2fd8ffebafdb1ccbd529632153f793904c2615b7f09fe1a345473fd1c35845172a8eb1

ENV IS_DEV_CONTAINER=true