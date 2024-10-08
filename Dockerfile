FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

RUN npm update

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
