FROM node:14 as builder

WORKDIR /app

# Proje bağımlılıklarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install --no-cache

# Uygulama kaynak kodunu kopyala ve uygulamayı derle
COPY . .
RUN npm run build

# İkinci aşama: Nginx ile uygulama yayınlama
FROM nginx:1.21.3-alpine


COPY my_nginx.conf /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html
#elave

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
