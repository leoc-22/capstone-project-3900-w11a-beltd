FROM node:17.6-alpine as builder

WORKDIR /app

COPY . ./
COPY ./package*.json .

RUN npm install


FROM node:17.6-alpine as runner

ENV NODE_ENV=production

WORKDIR /app

COPY ./src ./src
COPY ./package*.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
