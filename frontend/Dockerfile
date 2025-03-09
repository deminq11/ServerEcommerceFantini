FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_API_URL="https://serverecommercefantini-dev.up.railway.app"

RUN npm run build

FROM nginx:alpine


RUN echo "API URL: $VITE_API_URL"

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]