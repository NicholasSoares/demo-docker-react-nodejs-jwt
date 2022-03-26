FROM node:16.14.2-alpine3.14

RUN apk add --no-cache libc6-compat

WORKDIR /var/www

RUN chown -R node:node /var/www

COPY --chown=node:node package.json .

COPY --chown=node:node package-lock.json .

RUN npm install

COPY --chown=node:node . .

USER node

RUN mkdir /home/node/.npm-global
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

CMD npm start
