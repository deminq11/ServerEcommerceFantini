FROM node:23-slim

WORKDIR /ServerEcommerce

COPY package*.json ./

RUN npm ci --omit-dev

COPY . .

EXPOSE 8080

CMD ["npm", "start"]