FROM node:14

ENV ROOT /app

RUN mkdir -p $ROOT && chown -R node:node $ROOT

USER node:node

WORKDIR $ROOT

COPY --chown=node:node package.json .

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start"]