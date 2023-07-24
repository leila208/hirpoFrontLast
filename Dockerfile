FROM node:18 as builder

WORKDIR /app

# Proje bağımlılıklarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Uygulama kaynak kodunu kopyala ve uygulamayı derle
COPY . .
RUN npm run build

# İkinci aşama: Nginx ile uygulama yayınlama
FROM nginx:1.21.3-alpine



# Nginx yapılandırma dosyasını değiştir (isteğe bağlı)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY my_nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
