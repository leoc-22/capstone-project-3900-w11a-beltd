FROM node:17.6-alpine

WORKDIR /app/server

COPY . ./
COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
