FROM node:lts-alpine
WORKDIR /app

ARG branding=tf2pickup.pl

COPY . .
RUN yarn install --immutable \
  && yarn cache clean \
  && yarn build:${branding}

USER node
CMD [ "node", "build/index.js" ]

EXPOSE 3000
