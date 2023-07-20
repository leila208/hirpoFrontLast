FROM node:18 as builder

COPY . /app
WORKDIR /app

RUN npm install && npm run build

FROM nginx:1.21.3-alpine

COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80
CMD nginx -g "daemon off;"
