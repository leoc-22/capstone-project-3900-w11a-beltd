FROM node:17.6-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm ci --production

COPY ./src ./src

CMD [ "npm", "start" ]
