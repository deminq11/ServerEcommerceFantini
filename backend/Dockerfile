FROM node:23-slim

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --omit-dev

COPY backend/ .

EXPOSE 8080

CMD ["npm", "start"]