# Etapa 1: Construir la aplicación
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start"]




