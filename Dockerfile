FROM node:18 as builder
COPY . /app
WORKDIR /app

RUN npm install && npm run build

# İkinci aşama: Nginx ile uygulama yayınlama
FROM nginx:1.21.3-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# COPY my_nginx.conf /etc/nginx/conf.d/default.conf

# COPY . /usr/share/nginx/html
#elave

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
