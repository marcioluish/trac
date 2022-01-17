FROM node:14

ENV ROOT /app

RUN mkdir -p $ROOT && chown -R node:node $ROOT

USER node:node

WORKDIR $ROOT

COPY --chown=node:node package.json .

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "start"]