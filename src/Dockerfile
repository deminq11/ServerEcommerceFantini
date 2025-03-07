FROM node:23-slim

WORKDIR /ServerEcommerce

COPY src/package*.json ./

RUN npm ci --omit-dev

COPY src/ .

EXPOSE 8080

CMD ["npm", "start"]