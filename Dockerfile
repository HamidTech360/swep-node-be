FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

EXPOSE 6000

CMD [ "npm", "start" ]