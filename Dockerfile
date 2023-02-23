FROM node:16.17.1

WORKDIR /express-project

COPY package.json .
COPY package-lock.json .
RUN npm ci 
# для сохранения зависимостей 

COPY backend/server.js .
COPY backend/model/querys.js .
COPY backend/migrations .

COPY . .


