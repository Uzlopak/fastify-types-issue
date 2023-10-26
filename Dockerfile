FROM node:21-alpine as BUILD

ARG GITHUB_TOKEN

WORKDIR /app

RUN apk add build-base python3-dev

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN printf "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN\n@monitr:registry=https://npm.pkg.github.com" > .npmrc && \
  npm ci --ignore-scripts && \
  npm rebuild && \
  rm -f .npmrc

COPY . .

# Compile TS
RUN npm run build

# Remove all dependencies not needed for production
RUN npm prune --production

################################################

FROM node:21-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=BUILD /app/package.json .
COPY --from=BUILD /app/package-lock.json .
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/build .

ENTRYPOINT ["node", "--unhandled-rejections=strict", "./index.js"]
