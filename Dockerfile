FROM node:18 as builder

COPY . /app
WORKDIR /app

RUN npm install && npm run build

FROM nginx:1.21.3-alpine

COPY my_nginx.conf /etc/nginx/conf.d/default.conf


CMD ["nginx", "-g", "daemon off;"]
