FROM node:23-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit-dev

COPY . .

EXPOSE 8080

CMD ["npm", "start"]