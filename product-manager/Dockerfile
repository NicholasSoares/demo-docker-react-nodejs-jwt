FROM node:16.2.0-alpine3.13

RUN apk add --no-cache libc6-compat

RUN npm i -g npm && npm -v

RUN mkdir -p /var/www
WORKDIR /var/www

RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001

COPY package*.json ./

RUN chown -R reactjs:nodejs /var/www

USER reactjs

RUN npm install

RUN mkdir /home/reactjs/.npm-global
ENV NPM_CONFIG_PREFIX=/home/reactjs/.npm-global
ENV PATH=$PATH:/home/reactjs/.npm-global/bin

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
