FROM node:17.6-alpine

WORKDIR /app/ui

COPY . ./
COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

CMD [ "npm", "start"]
