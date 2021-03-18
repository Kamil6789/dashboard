FROM node:10-alpine as builder
WORKDIR /home/container
COPY package*.json ./
RUN npm install
COPY . .

COPY /frontend/package*.json ./
RUN cd frontend && npm install && npm run build

EXPOSE 3000

CMD ["node", "server.js"]