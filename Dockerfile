FROM node:18 as builder

COPY . /app
WORKDIR /app

RUN npm install && npm run build

FROM nginx:1.21.3-alpine

# React uygulamasının build imajını alın


# Nginx yapılandırma dosyanızı kopyalayın
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# React uygulamanızın üretim build dosyalarını Nginx üzerinde yayınlayın
# COPY build /var/www/hirpoFrontLast

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
