# Stage 1 - build
FROM node:22.12-alpine AS build-stage

WORKDIR /frontend

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build:start

# Stage 2 - prod
FROM nginx:1.25-alpine AS prod-stage

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=build-stage /frontend/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]