FROM node:18 as builder

COPY . /app
WORKDIR /app

RUN npm install && npm run build

FROM nginx:1.21.3-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY my_nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
